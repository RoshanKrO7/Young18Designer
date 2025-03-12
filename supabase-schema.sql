-- Create profiles table to store user profile information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  avatar_url TEXT
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration TEXT NOT NULL,
  features TEXT[] NOT NULL,
  gender_specific TEXT NOT NULL CHECK (gender_specific IN ('male', 'female', 'any')),
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tailors table
CREATE TABLE IF NOT EXISTS tailors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  rating DECIMAL(2, 1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  location TEXT NOT NULL,
  specialties TEXT[] NOT NULL,
  experience INTEGER NOT NULL,
  gender_preference TEXT CHECK (gender_preference IN ('male', 'female', 'any')),
  bio TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  service_id UUID REFERENCES services(id) NOT NULL,
  tailor_id UUID REFERENCES tailors(id) NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  address TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
  gender TEXT CHECK (gender IN ('male', 'female')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  tailor_id UUID REFERENCES tailors(id) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_roles table for role-based access control
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'admin', 'tailor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Create contact_messages table for contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tailor_applications table for tailor applications
CREATE TABLE IF NOT EXISTS tailor_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  experience INTEGER NOT NULL,
  specialties TEXT[] NOT NULL,
  location TEXT NOT NULL,
  gender_preference TEXT CHECK (gender_preference IN ('male', 'female', 'any')),
  resume_url TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  type TEXT NOT NULL CHECK (type IN ('booking', 'review', 'system', 'promotion')),
  related_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a trigger to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (new.id, '', '');
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user');
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Set up Row Level Security (RLS) policies

-- Profiles table policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Bookings table policies
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookings" 
  ON bookings FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookings" 
  ON bookings FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" 
  ON bookings FOR UPDATE 
  USING (auth.uid() = user_id AND status != 'completed');

-- Reviews table policies
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews" 
  ON reviews FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Users can insert their own reviews" 
  ON reviews FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" 
  ON reviews FOR UPDATE 
  USING (auth.uid() = user_id);

-- Services table policies
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active services" 
  ON services FOR SELECT 
  USING (is_active = true);

-- Tailors table policies
ALTER TABLE tailors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available tailors" 
  ON tailors FOR SELECT 
  USING (is_available = true);

-- Contact messages table policies
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact messages" 
  ON contact_messages FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Notifications table policies
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications" 
  ON notifications FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
  ON notifications FOR UPDATE 
  USING (auth.uid() = user_id);

-- Admin policies (using a function to check if user is admin)
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  admin_exists BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = $1 AND role = 'admin'
  ) INTO admin_exists;
  
  RETURN admin_exists;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin can do everything
CREATE POLICY "Admins have full access to profiles" 
  ON profiles 
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins have full access to bookings" 
  ON bookings 
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins have full access to services" 
  ON services 
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins have full access to tailors" 
  ON tailors 
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins have full access to reviews" 
  ON reviews 
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins have full access to contact messages" 
  ON contact_messages 
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins have full access to tailor applications" 
  ON tailor_applications 
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins have full access to notifications" 
  ON notifications 
  USING (is_admin(auth.uid()));

-- Insert sample data for services
INSERT INTO services (name, description, price, duration, features, gender_specific, image_url)
VALUES
  ('Basic Alterations', 'Simple alterations for any garment including hemming, taking in/out, and sleeve adjustments.', 30, '1-2 days', ARRAY['Hemming', 'Sleeve adjustments', 'Simple repairs'], 'any', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'),
  ('Suit Tailoring', 'Complete tailoring service for men''s suits, including jacket and pants alterations for the perfect fit.', 150, '3-5 days', ARRAY['Jacket alterations', 'Pants hemming', 'Waist adjustments', 'Sleeve adjustments'], 'male', 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80'),
  ('Dress Alterations', 'Specialized alterations for women''s dresses, including formal, casual, and wedding dresses.', 80, '2-4 days', ARRAY['Hemming', 'Taking in/out', 'Strap adjustments', 'Zipper replacement'], 'female', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1483&q=80'),
  ('Custom Shirt Stitching', 'Made-to-measure shirts tailored to your exact specifications and style preferences.', 90, '5-7 days', ARRAY['Custom measurements', 'Fabric selection', 'Style customization', 'Perfect fit guarantee'], 'male', 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1525&q=80'),
  ('Blouse Customization', 'Custom-designed blouses with your choice of fabric, style, and embellishments.', 85, '5-7 days', ARRAY['Custom measurements', 'Fabric selection', 'Style customization', 'Perfect fit guarantee'], 'female', 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'),
  ('Express Repairs', 'Quick repair service for minor issues like tears, loose buttons, and small holes.', 25, 'Same day', ARRAY['Button replacement', 'Seam repair', 'Patch application', 'Quick turnaround'], 'any', 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80');

-- Insert sample data for tailors
INSERT INTO tailors (name, image, rating, reviews, location, specialties, experience, gender_preference, bio)
VALUES
  ('John Smith', 'https://randomuser.me/api/portraits/men/32.jpg', 4.8, 124, 'Manhattan, NY', ARRAY['Men''s Suits', 'Formal Wear', 'Alterations'], 12, 'male', 'John has over 12 years of experience specializing in men''s formal wear and suits. He trained in London before moving to New York.'),
  ('Sarah Johnson', 'https://randomuser.me/api/portraits/women/44.jpg', 4.9, 89, 'Brooklyn, NY', ARRAY['Women''s Dresses', 'Bridal Wear', 'Custom Stitching'], 8, 'female', 'Sarah specializes in women''s fashion with particular expertise in bridal and evening wear. She has worked with several fashion houses in New York.'),
  ('Alex Wong', 'https://randomuser.me/api/portraits/men/75.jpg', 4.7, 56, 'Queens, NY', ARRAY['Alterations', 'Repairs', 'Traditional Wear'], 15, 'any', 'Alex is a versatile tailor with 15 years of experience across various styles. He specializes in both modern and traditional garments.'); 