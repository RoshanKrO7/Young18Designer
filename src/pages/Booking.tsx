import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../providers/CartProvider';
import { BadgeIndianRupee,Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Tailor {
  id: string;
  name: string;
}

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM'
];

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem, clearCart } = useCart();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: '',
    notes: '',
    tailorId: ''
  });
  const [tailors, setTailors] = useState<Tailor[]>([]);

  useEffect(() => {
    const fetchTailors = async () => {
      const { data, error } = await supabase.from('tailors').select('id, name');
      if (error) {
        console.error('Error fetching tailors:', error);
      } else {
        setTailors(data as Tailor[]);
      }
    };
    fetchTailors();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''));
      return total + (price * (item.quantity || 1));
    }, 0);
  };

  const saveBooking = async () => {
    const { date, time, address, notes, tailorId } = formData;
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) throw new Error('User not authenticated');

    const { data, error } = await supabase.from('bookings').insert({
        user_id: userData.user.id,
        service_name: items[0].title,
        tailor_id: tailorId || null,
        booking_date: date,
        booking_time: time,
        address,
        notes,
        status: 'Pending'
    });

    if (error) throw error;
    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveBooking();
      alert('Booking successful!');
      clearCart();
      navigate('/');
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('There was an error processing your booking. Please try again.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Please select services before booking.</p>
        <button
          onClick={() => navigate('/services')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Browse Services
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Selected Services</h2>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <BadgeIndianRupee className="w-4 h-4 mr-1" />
                      <span>{item.price}</span>
                      {item.quantity && item.quantity > 1 && (
                        <span className="ml-2">x{item.quantity}</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount:</span>
              <span>₹{calculateTotal()}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Time
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select a time slot</option>
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows={3}
              required
              placeholder="Enter your complete address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="Any special instructions or requirements"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Tailor (Optional)
            </label>
            <select
              name="tailorId"
              value={formData.tailorId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">No preference</option>
              {tailors.map(tailor => (
                <option key={tailor.id} value={tailor.id}>{tailor.name}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage; 