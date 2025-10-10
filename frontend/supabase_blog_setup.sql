-- Create blog_posts table for blog/resources section
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_url TEXT,
    category VARCHAR(100),
    tags TEXT[], -- Array of tags
    author VARCHAR(255) DEFAULT 'MC Smart Bytes',
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING GIN(tags);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to view published posts (public blog)
CREATE POLICY "Allow anonymous read published blog posts"
ON public.blog_posts
FOR SELECT
TO anon, public
USING (published = true);

-- Only authenticated users (admins) can view all posts including drafts
CREATE POLICY "Allow authenticated read all blog posts"
ON public.blog_posts
FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can create posts
CREATE POLICY "Allow authenticated insert blog posts"
ON public.blog_posts
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Only authenticated users can update posts
CREATE POLICY "Allow authenticated update blog posts"
ON public.blog_posts
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Only authenticated users can delete posts
CREATE POLICY "Allow authenticated delete blog posts"
ON public.blog_posts
FOR DELETE
TO authenticated
USING (true);

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE
    ON public.blog_posts FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Create a storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for blog images
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Everyone can view blog images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can delete blog images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images');
