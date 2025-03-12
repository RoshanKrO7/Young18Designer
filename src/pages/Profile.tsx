import React, { useState, useEffect } from 'react';
import { Calendar,MapPin, User, X, Settings, FileText } from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import toast from 'react-hot-toast';

interface Booking {
  id: string;
  service: string;
  tailor: string;
  booking_date: string;
  booking_time: string;
  address: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  gender: 'male' | 'female' | 'unisex';
  userPhone: string;
  userName: string;
  userAddress: string;
  serviceName: string;
}

// Mock data - would be fetched from Supabase in a real app


const Profile: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'settings'>('bookings');
  // const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [phone, setPhone] = useState(user?.user_metadata?.phone || '');
  // const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (user) {
          // Fetch bookings for the logged-in user
          const { data: bookingsData, error: bookingsError } = await supabase
            .from('bookings')
            .select('*')
            .eq('user_id', user.id); // Use user.id to fetch bookings

          if (bookingsError) {
            console.error('Error fetching bookings:', bookingsError);
            setError('Failed to load bookings');
            return;
          }

          // Fetch user profiles for each booking to get phone numbers
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

          console.log('Bookings Data:', bookingsData);
          console.log('Profiles Data:', profilesData);

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
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load your bookings';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  const handleCancelBooking = async (bookingId: string) => {
    try {
        setLoading(true);
        const { error } = await supabase
            .from('bookings')
            .update({ status: 'cancelled' }) // Update to 'cancelled'
            .eq('id', bookingId);

        if (error) throw error;

        // Update local state to reflect the change
        setBookings(prevBookings => 
            prevBookings.map(booking => 
                booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
            )
        );

        toast.success('Booking cancelled successfully');
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to cancel booking';
        setError(errorMessage);
        toast.error(errorMessage);
    } finally {
        setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) {
        setError('User is not logged in');
        return;
    }

    try {
        setLoading(true);
        const { error } = await supabase
            .from('user_profiles')
            .update({ full_name: fullName, phone: phone })
            .eq('user_id', user.id); // Ensure user is not null

        if (error) throw error;

        // Update the user metadata in the auth provider
        const { error: authError } = await supabase.auth.updateUser({
            data: { full_name: fullName, phone: phone }
        });

        if (authError) throw authError;

        toast.success('Profile updated successfully');
        setIsEditing(false); // Exit editing mode
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
        setError(errorMessage);
        toast.error(errorMessage);
    } finally {
        setLoading(false);
    }
  };

  // const handleChangePassword = async () => {
  //   if (!user) {
  //       setError('User is not logged in');
  //       return;
  //   }

  //   try {
  //       setLoading(true);
  //       const { error } = await supabase.auth.updateUser({ password: newPassword });

  //       if (error) throw error;

  //       toast.success('Password changed successfully');
  //       setNewPassword(''); // Clear the password input
  //   } catch (err) {
  //       const errorMessage = err instanceof Error ? err.message : 'Failed to change password';
  //       setError(errorMessage);
  //       toast.error(errorMessage);
  //   } finally {
  //       setLoading(false);
  //   }
  // };

  if (loading && bookings.length === 0) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="bg-blue-600 text-white p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white text-blue-600 rounded-full p-3">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.user_metadata?.full_name || 'User'}</h1>
              <p className="opacity-90">{user?.email}</p>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'bookings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                My Bookings
              </div>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Account Settings
              </div>
            </button>
          </nav>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {error && <ErrorMessage message={error} className="mb-6" />}
          
          {activeTab === 'bookings' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
              
              {bookings.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-4">You don&apos;t have any bookings yet.</p>
                  <a
                    href="/services"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700"
                  >
                    Book a Service
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-b">
                        <div className="font-medium">{booking.serviceName}</div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start">
                            <User className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                            <div>
                              <div className="text-sm font-medium text-gray-700">User Name</div>
                              <div>{booking.userName}</div>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Calendar className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                            <div>
                              <div className="text-sm font-medium text-gray-700">Date & Time</div>
                              <div>{new Date(booking.booking_date).toLocaleDateString()} {booking.booking_time}</div>
                            </div>
                          </div>
                          <div className="flex items-start md:col-span-2">
                            <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                            <div>
                              <div className="text-sm font-medium text-gray-700">Address</div>
                              <div>{booking.userAddress}</div>
                            </div>
                          </div>
                          <div className="flex items-start md:col-span-2">
                            <User className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                            <div>
                              <div className="text-sm font-medium text-gray-700">Phone</div>
                              <div>{booking.userPhone}</div>
                            </div>
                          </div>
                        </div>
                        
                        {(booking.status === 'pending' || booking.status === 'confirmed') && (
                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              disabled={loading}
                              className="flex items-center text-red-600 hover:text-red-800 disabled:opacity-50"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel Booking
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          readOnly
                          className="block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      {isEditing ? (
                        <button
                          type="button"
                          onClick={handleUpdateProfile}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Save Changes
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsEditing(true)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Edit Profile
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Password</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Preferences</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <input
                        id="email-notifications"
                        name="email-notifications"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-900">
                        Receive email notifications for booking updates
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 