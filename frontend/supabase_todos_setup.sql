-- Create todos table with all requested features
CREATE TABLE IF NOT EXISTS public.todos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    notes TEXT,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    due_date TIMESTAMP WITH TIME ZONE,
    reminder_date TIMESTAMP WITH TIME ZONE,
    customer_id UUID REFERENCES public.inquiries(id),
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    file_url TEXT,
    file_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_todos_status ON public.todos(status);
CREATE INDEX IF NOT EXISTS idx_todos_priority ON public.todos(priority);
CREATE INDEX IF NOT EXISTS idx_todos_due_date ON public.todos(due_date);
CREATE INDEX IF NOT EXISTS idx_todos_customer_id ON public.todos(customer_id);
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON public.todos(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can access todos
CREATE POLICY "Allow authenticated select todos"
ON public.todos
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated insert todos"
ON public.todos
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update todos"
ON public.todos
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated delete todos"
ON public.todos
FOR DELETE
TO authenticated
USING (true);

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_todos_updated_at BEFORE UPDATE
    ON public.todos FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Create a storage bucket for todo attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('todo-attachments', 'todo-attachments', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for todo attachments
CREATE POLICY "Authenticated users can upload todo attachments"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'todo-attachments');

CREATE POLICY "Authenticated users can view todo attachments"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'todo-attachments');

CREATE POLICY "Authenticated users can delete todo attachments"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'todo-attachments');
