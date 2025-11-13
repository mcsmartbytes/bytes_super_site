"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Business Tips',
    tags: '',
    published: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const postData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        published: formData.published,
        published_at: formData.published ? new Date().toISOString() : null
      };

      if (editingPost) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);

        if (error) throw error;
      } else {
        // Create new post
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);

        if (error) throw error;
      }

      // Reset form and refresh posts
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'Business Tips',
        tags: '',
        published: false
      });
      setEditingPost(null);
      setShowForm(false);
      fetchPosts();
    } catch (error: any) {
      console.error('Error saving post:', error);
      alert('Error saving post: ' + (error.message || 'Unknown error'));
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags.join(', '),
      published: post.published
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await supabase.from('blog_posts').delete().eq('id', id);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      await supabase
        .from('blog_posts')
        .update({
          published: !post.published,
          published_at: !post.published ? new Date().toISOString() : null
        })
        .eq('id', post.id);

      fetchPosts();
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600 mt-2">Create and manage blog posts and resources</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingPost(null);
            setFormData({
              title: '',
              slug: '',
              excerpt: '',
              content: '',
              category: 'Business Tips',
              tags: '',
              published: false
            });
          }}
          className="px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-800 transition font-semibold"
        >
          <i className={`fas fa-${showForm ? 'times' : 'plus'} mr-2`}></i>
          {showForm ? 'Cancel' : 'New Post'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {editingPost ? 'Edit Post' : 'Create New Post'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition"
                placeholder="How to Streamline Your Bookkeeping"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">Slug (URL) *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition"
                placeholder="how-to-streamline-your-bookkeeping"
              />
              <p className="text-sm text-gray-500 mt-1">URL: /blog/{formData.slug}</p>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">Excerpt *</label>
              <textarea
                required
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition resize-none"
                placeholder="A brief summary of your post (shown in listings)"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">Content *</label>
              <textarea
                required
                rows={12}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition resize-none font-mono text-sm"
                placeholder="Write your blog post content here... (Supports plain text and basic HTML)"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition"
                >
                  <option>Business Tips</option>
                  <option>Bookkeeping</option>
                  <option>Excel Tips</option>
                  <option>Technology</option>
                  <option>Case Studies</option>
                  <option>Industry News</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-700 focus:ring-2 focus:ring-orange-100 outline-none transition"
                  placeholder="bookkeeping, tips, automation (comma separated)"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 text-orange-700 border-gray-300 rounded focus:ring-orange-700"
              />
              <label htmlFor="published" className="font-semibold text-gray-700">
                Publish immediately
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:shadow-lg transition font-semibold"
              >
                <i className="fas fa-save mr-2"></i>
                {editingPost ? 'Update Post' : 'Create Post'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingPost(null);
                }}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-700 border-t-transparent"></div>
          <p className="text-gray-600 mt-4">Loading posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <i className="fas fa-newspaper text-6xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No blog posts yet</h3>
          <p className="text-gray-600">Create your first blog post to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
                <span className="px-2 py-1 bg-gray-100 rounded">{post.category}</span>
                {post.tags.slice(0, 2).map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="flex-1 px-3 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-800 transition text-sm font-semibold"
                >
                  <i className="fas fa-edit mr-1"></i> Edit
                </button>
                <button
                  onClick={() => togglePublish(post)}
                  className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-semibold"
                >
                  <i className={`fas fa-${post.published ? 'eye-slash' : 'eye'} mr-1`}></i>
                  {post.published ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition text-sm"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
