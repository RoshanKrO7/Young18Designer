/*
  # Initial Schema for Tailoring Service

  1. New Tables
    - `profiles`
      - User profiles with contact information
    - `tailors`
      - Tailor profiles with expertise and availability
    - `services`
      - Available tailoring services
    - `bookings`
      - Customer bookings
    - `measurements`
      - Customer measurements for orders

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  phone_number text,
  address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tailors table
CREATE TABLE IF NOT EXISTS tailors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  full_name text NOT NULL,
  expertise text[] NOT NULL,
  experience_years integer NOT NULL DEFAULT 0,
  rating decimal(3,2) DEFAULT 0,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  base_price decimal(10,2) NOT NULL,
  estimated_days integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  tailor_id uuid REFERENCES tailors(id),
  service_id uuid REFERENCES services(id),
  status text NOT NULL DEFAULT 'pending',
  appointment_date timestamptz NOT NULL,
  total_amount decimal(10,2) NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create measurements table
CREATE TABLE IF NOT EXISTS measurements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id),
  measurement_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tailors ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE measurements ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Tailors policies
CREATE POLICY "Anyone can view tailors"
  ON tailors FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Tailors can update their own profile"
  ON tailors FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Services policies
CREATE POLICY "Anyone can view services"
  ON services FOR SELECT
  TO authenticated
  USING (true);

-- Bookings policies
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Measurements policies
CREATE POLICY "Users can view their own measurements"
  ON measurements FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM bookings 
    WHERE bookings.id = measurements.booking_id 
    AND bookings.user_id = auth.uid()
  ));

-- Insert sample services
INSERT INTO services (name, description, category, base_price, estimated_days) VALUES
('Suit Tailoring', 'Custom tailored suit including jacket and trousers', 'men', 299.99, 14),
('Dress Tailoring', 'Custom tailored dress to your specifications', 'women', 199.99, 10),
('Shirt Tailoring', 'Custom tailored shirt', 'men', 89.99, 7),
('Blouse Tailoring', 'Custom tailored blouse', 'women', 89.99, 7),
('Trousers Alteration', 'Alter existing trousers to fit perfectly', 'unisex', 49.99, 3),
('Dress Alteration', 'Alter existing dress to fit perfectly', 'women', 69.99, 4);