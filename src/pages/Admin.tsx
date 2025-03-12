import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase';
import { Tailor, Booking } from '../types';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import toast from 'react-hot-toast';

const Admin: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [tailors, setTailors] = useState<Tailor[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tailors' | 'bookings'>('tailors');
  const [newTailor, setNewTailor] = useState<Partial<Tailor>>({
    name: '',
    email: '',
    phone: '',
    specialties: [],
    experience_years: 0,
    status: 'active',
    gender_preference: 'any',
    image_url: ''
  });

  useEffect(() => {
    if (isAdmin) {
      fetchTailors();
      fetchBookings();
    }
  }, [isAdmin]);

  const fetchTailors = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tailors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTailors(data || []);
      toast.success('Tailors loaded successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error fetching tailors';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*');

      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError);
        setError('Failed to load bookings');
        return;
      }

      // Fetch user profiles for each booking to get phone numbers and names
      const userIds = bookingsData.map(booking => booking.user_id);
      const { data: profilesData, error: profilesError } = await supabase
        .from('user_profiles')
        .select('user_id, full_name, phone')
        .in('user_id', userIds);

      if (profilesError) {
        console.error('Error fetching user profiles:', profilesError);
        setError('Failed to load user profiles');
        return;
      }

      // Combine bookings with user profile details
      const combinedBookings = bookingsData.map(booking => {
        const profile = profilesData.find(profile => profile.user_id === booking.user_id);

        return {
          ...booking,
          userPhone: profile ? profile.phone : 'Unknown Phone',
          userName: profile ? profile.full_name : 'Unknown User',
          userAddress: booking.address || 'Unknown Address',
          serviceName: booking.service_name || 'Unknown Service',
        };
      });

      setBookings(combinedBookings);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load bookings';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `tailors/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleAddTailor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const imageInput = document.getElementById('tailor-image') as HTMLInputElement;
      let imageUrl = '';
      
      if (imageInput.files && imageInput.files[0]) {
        imageUrl = await uploadImage(imageInput.files[0]);
      }

      const { data, error } = await supabase
        .from('tailors')
        .insert([{ ...newTailor, image_url: imageUrl }])
        .select();

      if (error) throw error;
      toast.success('Tailor added successfully');
      setTailors([...(data || []), ...tailors]);
      setNewTailor({
        name: '',
        email: '',
        phone: '',
        specialties: [],
        experience_years: 0,
        status: 'active',
        gender_preference: 'any',
        image_url: ''
      });
      if (imageInput) imageInput.value = '';
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error adding tailor';
      toast.error(message);
    }
  };

  const handleUpdateTailor = async (id: string, updates: Partial<Tailor>) => {
    try {
      const { error } = await supabase
        .from('tailors')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      toast.success('Tailor updated successfully');
      fetchTailors();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error updating tailor';
      toast.error(message);
    }
  };

  const handleDeleteTailor = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this tailor?')) return;

    try {
      const { error } = await supabase
        .from('tailors')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Tailor deleted successfully');
      fetchTailors();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error deleting tailor';
      toast.error(message);
    }
  };

  const handleUpdateBookingStatus = async (bookingId: string, newStatus: Booking['status']) => {
    try {
      setLoading(true);
      console.log('Updating booking:', bookingId, 'to status:', newStatus);
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) throw error;

      // Update local state
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );

      toast.success('Booking status updated successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update booking status';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (!user || !isAdmin) return <ErrorMessage message="Access denied. Admin privileges required." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('tailors')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'tailors' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
        >
          Manage Tailors
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
        >
          Manage Bookings
        </button>
      </div>

      {activeTab === 'tailors' && (
        <div>
          {/* Add Tailor Form */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Add New Tailor</h2>
            <form onSubmit={handleAddTailor} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newTailor.name}
                  onChange={(e) => setNewTailor({ ...newTailor, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newTailor.email}
                  onChange={(e) => setNewTailor({ ...newTailor, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={newTailor.phone}
                  onChange={(e) => setNewTailor({ ...newTailor, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Specialties</label>
                <input
                  type="text"
                  value={newTailor.specialties?.join(', ')}
                  onChange={(e) => setNewTailor({ ...newTailor, specialties: e.target.value.split(',').map(s => s.trim()) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter specialties separated by commas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
                <input
                  type="number"
                  value={newTailor.experience_years}
                  onChange={(e) => setNewTailor({ ...newTailor, experience_years: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender Preference</label>
                <select
                  value={newTailor.gender_preference}
                  onChange={(e) => setNewTailor({ ...newTailor, gender_preference: e.target.value as Tailor['gender_preference'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="any">Any</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={newTailor.status}
                  onChange={(e) => setNewTailor({ ...newTailor, status: e.target.value as Tailor['status'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                <input
                  type="file"
                  id="tailor-image"
                  accept="image/*"
                  className="mt-1 block w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add Tailor
              </button>
            </form>
          </div>

          {/* Tailors List */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialties</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tailors.map((tailor) => (
                  <tr key={tailor.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{tailor.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{tailor.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{tailor.specialties.join(', ')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tailor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {tailor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleUpdateTailor(tailor.id, { status: tailor.status === 'active' ? 'inactive' : 'active' })}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Toggle Status
                      </button>
                      <button
                        onClick={() => handleDeleteTailor(tailor.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tailor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.userPhone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.userAddress}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.serviceName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.tailor?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(booking.booking_date).toLocaleDateString()} {booking.booking_time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={booking.status}
                      onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value as Booking['status'])}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin; 