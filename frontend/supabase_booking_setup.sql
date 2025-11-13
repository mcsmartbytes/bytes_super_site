-- Create bookings table for appointment scheduling
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    service VARCHAR(255) NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON public.bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to create bookings (public booking form)
CREATE POLICY "Allow anonymous insert bookings"
ON public.bookings
FOR INSERT
TO anon, public
WITH CHECK (true);

-- Only authenticated users (admins) can view all bookings
CREATE POLICY "Allow authenticated read bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can update bookings
CREATE POLICY "Allow authenticated update bookings"
ON public.bookings
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Only authenticated users can delete bookings
CREATE POLICY "Allow authenticated delete bookings"
ON public.bookings
FOR DELETE
TO authenticated
USING (true);

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE
    ON public.bookings FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
