"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  published_at: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-700 border-t-transparent"></div>
          <p className="text-gray-600 mt-4">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-orange-700 hover:underline">
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.jpg" alt="MC Smart Bytes" width={150} height={40} className="h-10 w-auto" />
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-orange-700 transition font-medium">Home</Link>
              <Link href="/blog" className="text-gray-600 hover:text-orange-700 transition font-medium">Blog</Link>
              <Link href="/book" className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:shadow-lg transition font-semibold">
                Book Consultation
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="h-96 bg-gradient-to-br from-orange-600 to-orange-700"></div>

      {/* Article Content */}
      <article className="container mx-auto px-6 -mt-32 relative z-10 pb-20">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/blog" className="hover:text-orange-700 transition">Blog</Link>
            <i className="fas fa-chevron-right text-xs"></i>
            <span className="text-gray-700">{post.title}</span>
          </div>

          {/* Category & Date */}
          <div className="flex items-center gap-3 mb-4 text-sm">
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
              {post.category}
            </span>
            <span className="text-gray-500">
              <i className="fas fa-calendar mr-2"></i>
              {formatDate(post.published_at)}
            </span>
            <span className="text-gray-500">
              <i className="fas fa-user mr-2"></i>
              {post.author}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap mb-8 pb-8 border-b border-gray-200">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                #{tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />

          {/* Share & CTA */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Need Help with Your Business?</h3>
              <p className="text-gray-100 mb-6">
                Let's discuss how I can help streamline your operations and save you time.
              </p>
              <Link
                href="/book"
                className="inline-block px-8 py-3 bg-white text-orange-700 rounded-lg hover:shadow-lg transition font-bold"
              >
                Book a Free Consultation
              </Link>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-8 text-center">
            <Link href="/blog" className="text-orange-700 hover:underline font-medium">
              <i className="fas fa-arrow-left mr-2"></i>
              Back to All Posts
            </Link>
          </div>
        </div>
      </article>

      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}
