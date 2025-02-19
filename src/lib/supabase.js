import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin role check
export const isAdmin = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  
  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
    
  return data?.role === 'admin';
};

// Booking status updates
export const updateBookingStatus = async (bookingId, status) => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', bookingId);
    
  if (error) throw error;
  return data;
};

// Get all bookings for admin
export const getAdminBookings = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      profiles:user_id (full_name, phone_number),
      services:service_id (name),
      tailors:tailor_id (full_name)
    `)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};