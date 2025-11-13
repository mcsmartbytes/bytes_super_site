-- Create inquiries table for contact form submissions
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    service VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (contact form submissions)
CREATE POLICY "Allow public insert" ON public.inquiries
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Create policy to allow authenticated users to view all inquiries (for admin)
CREATE POLICY "Allow authenticated select" ON public.inquiries
    FOR SELECT
    TO authenticated
    USING (true);

-- Create policy to allow authenticated users to update inquiries (for admin)
CREATE POLICY "Allow authenticated update" ON public.inquiries
    FOR UPDATE
    TO authenticated
    USING (true);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE
    ON public.inquiries FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
