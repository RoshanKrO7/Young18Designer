import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Truck,
  RefreshCcw,
  Calendar
} from 'lucide-react';
import { getAdminBookings, updateBookingStatus } from '../lib/supabase';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  'out-for-pickup': 'bg-blue-100 text-blue-800',
  rescheduled: 'bg-purple-100 text-purple-800',
  delayed: 'bg-orange-100 text-orange-800',
  pickedup: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
};

const statusIcons = {
  pending: Clock,
  'out-for-pickup': Truck,
  rescheduled: Calendar,
  delayed: RefreshCcw,
  pickedup: Package,
  delivered: CheckCircle,
};

function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await getAdminBookings();
      setBookings(data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      toast.success(`Booking status updated to ${newStatus}`);
      loadBookings();
    } catch (error) {
      toast.error('Failed to update booking status');
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  const StatusBadge = ({ status }) => {
    const Icon = statusIcons[status];
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
        <Icon className="w-4 h-4 mr-1" />
        {status.replace('-', ' ').toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Bookings</option>
            <option value="pending">Pending</option>
            <option value="out-for-pickup">Out for Pickup</option>
            <option value="rescheduled">Rescheduled</option>
            <option value="delayed">Delayed</option>
            <option value="pickedup">Picked Up</option>
            <option value="delivered">Delivered</option>
          </select>
          <button
            onClick={loadBookings}
            className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tailor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.profiles.full_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.profiles.phone_number}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.services.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.tailors.full_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(booking.appointment_date), 'PPp')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {booking.status !== 'out-for-pickup' && (
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'out-for-pickup')}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Pickup
                        </button>
                      )}
                      {booking.status !== 'delayed' && (
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'delayed')}
                          className="text-orange-600 hover:text-orange-900"
                        >
                          Delay
                        </button>
                      )}
                      {booking.status !== 'rescheduled' && (
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'rescheduled')}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          Reschedule
                        </button>
                      )}
                      {booking.status === 'out-for-pickup' && (
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'pickedup')}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Mark Picked Up
                        </button>
                      )}
                      {booking.status === 'pickedup' && (
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'delivered')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Mark Delivered
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;