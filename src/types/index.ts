export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  gender_specific: 'male' | 'female' | 'any';
  image_url?: string;
  created_at: string;
}

export interface Tailor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  experience_years: number;
  rating?: number;
  status: 'active' | 'inactive';
  gender_preference: 'male' | 'female' | 'any';
  image_url?: string;
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  service_id: string;
  tailor_id: string | null;
  booking_date: string;
  booking_time: string;
  address: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  userName?: string;
  serviceName?: string;
  userPhone?: string;
  userAddress?: string;
  service?: Service;
  tailor?: Tailor;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  role?: 'user' | 'admin';
  created_at: string;
} 