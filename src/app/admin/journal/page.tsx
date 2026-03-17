'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const supabaseUrl = 'https://knwyfoqmlwbxtfhvkbmc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3lmb3FtbHdieHRmaHZrYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjMzMTUsImV4cCI6MjA4OTA5OTMxNX0.er5XEya3170rW6hHyuhCNEKlg2SEk9_YPSOi4nWHb7Y';

const CATEGORIES = ['Weddings', 'Families', 'Newborn', 'Maternity', 'Studio', 'Commercial', 'Locations'];

type Post = {
  id: number;
  slug: string;
  title: string;
  category: string;
  published: boolean;
  published_at: string;
  excerpt: string;
  image_url: string | null;
};

export default function AdminJournalPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [customBrief, setCustomBrief] = useState('');
  const [customCategory, setCustomCategory] = useState('Families');
  const [lastGenerated, setLastGenerated] = useState<Post | null>(null);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'auto' | 'custom'>('auto');
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    setLoading(true);
    const res = await fetch(`${supabaseUrl}/rest/v1/posts?select=*&order=published_at.desc`, {
      headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` },
    });
    const data = await res.json();
    setPosts(data || []);
    setLoading(false);
  }

  async function generatePost() {
    setGenerating(true);
    setError('');
    setLastGenerated(null);
    try {
      const body = mode === 'custom'
        ? { brief: customBrief, category: customCategory, publish: true }
        : { publish: true };
      const res = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setLastGenerated(data.post);
      await fetchPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setGenerating(false);
    }
  }

  async function uploadImage(post: Post, file: File) {
    setUploadingId(post.id);
    try {
      const ext = file.name.split('.').pop();
      const filename = `${post.slug}-${Date.now()}.${ext}`;

      // Upload to Supabase storage
      const uploadRes = await fetch(
        `${supabaseUrl}/storage/v1/object/journal-images/${filename}`,
        {
          method: 'POST',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': file.type,
            'x-upsert': 'true',
          },
          body: file,
        }
      );

      if (!uploadRes.ok) throw new Error('Upload failed');

      const imageUrl = `${supabaseUrl}/storage/v1/object/public/journal-images/${filename}`;

      // Save URL to post
      const updateRes = await fetch(`${supabaseUrl}/rest/v1/posts?id=eq.${post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ image_url: imageUrl }),
      });

      if (!updateRes.ok) throw new Error('Failed to save image URL');
      await fetchPosts();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploadingId(null);
    }
  }

  async function togglePublished(post: Post) {
    await fetch(`${supabaseUrl}/rest/v1/posts?id=eq.${post.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ published: !post.published }),
    });
    await fetchPosts();
  }

  async function deletePost(post: Post) {
    if (!confirm(`Delete "${post.title}"?`)) return;
    await fetch(`${supabaseUrl}/rest/v1/posts?id=eq.${post.id}`, {
      method: 'DELETE',
      headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` },
    });
    await fetchPosts();
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F0E8', padding: '2rem 1.5rem' }}>
      <style>{`
        .admin-btn {
          font-family: 'Carose', sans-serif; font-size: 0.65rem;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 0.7rem 1.5rem; border: none; cursor: pointer;
          transition: all 0.2s;
        }
        .admin-btn-primary { background: #1B3A5C; color: #F5F0E8; }
        .admin-btn-primary:hover { background: #0d1b2a; }
        .admin-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
        .admin-btn-danger { background: transparent; color: #C8572A; border: 1px solid #C8572A; padding: 0.4rem 0.8rem; font-size: 0.6rem; }
        .admin-btn-danger:hover { background: #C8572A; color: white; }
        .admin-btn-ghost { background: transparent; color: #1B3A5C; border: 1px solid #DDD5C0; padding: 0.4rem 0.8rem; font-size: 0.6rem; }
        .admin-btn-ghost:hover { border-color: #1B3A5C; }
        .admin-btn-upload { background: transparent; color: #9E9282; border: 1px solid #DDD5C0; padding: 0.4rem 0.8rem; font-size: 0.6rem; cursor: pointer; }
        .admin-btn-upload:hover { border-color: #1B3A5C; color: #1B3A5C; }
        .admin-btn-upload.has-image { border-color: #2C7A4B; color: #2C7A4B; }
        .admin-input {
          width: 100%; padding: 0.75rem 1rem;
          font-family: 'Inter', sans-serif; font-size: 0.88rem;
          border: 1px solid #DDD5C0; background: #FAF8F2;
          color: #2C2820; outline: none; box-sizing: border-box;
        }
        .admin-input:focus { border-color: #1B3A5C; }
        .admin-label {
          font-family: 'Carose', sans-serif; font-size: 0.62rem;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #9E9282; display: block; margin-bottom: 0.4rem;
        }
        .post-row {
          display: flex; align-items: center; gap: 1rem;
          padding: 1rem 1.5rem; background: #FAF8F2;
          border: 1px solid #DDD5C0; margin-bottom: 2px;
          flex-wrap: wrap;
        }
        .post-thumb {
          width: 56px; height: 42px; flex-shrink: 0;
          object-fit: cover; border: 1px solid #DDD5C0;
        }
        .post-thumb-placeholder {
          width: 56px; height: 42px; flex-shrink: 0;
          background: #DDD5C0; border: 1px solid #DDD5C0;
          display: flex; align-items: center; justify-content: center;
        }
        .mode-tab {
          font-family: 'Carose', sans-serif; font-size: 0.62rem;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 0.5rem 1.2rem; cursor: pointer;
          border: 1px solid #DDD5C0; background: transparent;
          color: #9E9282; transition: all 0.2s;
        }
        .mode-tab.active { background: #1B3A5C; color: #F5F0E8; border-color: #1B3A5C; }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.3rem' }}>Admin</p>
            <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.8rem', color: '#1B3A5C', textTransform: 'none' }}>Journal Manager</h1>
          </div>
          <Link href="/journal" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none', borderBottom: '1px solid #DDD5C0', paddingBottom: '2px' }}>
            View journal →
          </Link>
        </div>

        {/* Generate section */}
        <div style={{ backgroundColor: '#FAF8F2', border: '1px solid #DDD5C0', padding: '2rem', marginBottom: '2rem' }}>
          <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1.5rem' }}>Generate new post</p>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <button className={`mode-tab ${mode === 'auto' ? 'active' : ''}`} onClick={() => setMode('auto')}>Auto select topic</button>
            <button className={`mode-tab ${mode === 'custom' ? 'active' : ''}`} onClick={() => setMode('custom')}>Custom brief</button>
          </div>

          {mode === 'custom' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', marginBottom: '1.2rem' }}>
              <div>
                <label className="admin-label">Category</label>
                <select className="admin-input" value={customCategory} onChange={e => setCustomCategory(e.target.value)}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="admin-label">Brief</label>
                <input className="admin-input" type="text" value={customBrief}
                  onChange={e => setCustomBrief(e.target.value)}
                  placeholder="e.g. Write about autumn family sessions in Cambridge, mention Grantchester..." />
              </div>
            </div>
          )}

          {mode === 'auto' && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#9E9282', lineHeight: 1.65, marginBottom: '1.2rem' }}>
              Claude will automatically select a topic from the content calendar. The post will be generated, saved to Supabase, and published instantly.
            </p>
          )}

          {error && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#C8572A', marginBottom: '1rem' }}>{error}</p>
          )}

          <button className="admin-btn admin-btn-primary" onClick={generatePost}
            disabled={generating || (mode === 'custom' && !customBrief.trim())}>
            {generating ? 'Generating post...' : 'Generate & publish post →'}
          </button>

          {lastGenerated && (
            <div style={{ marginTop: '1.5rem', padding: '1.2rem', backgroundColor: '#E8DDB5', borderLeft: '3px solid #1B3A5C' }}>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1B3A5C', marginBottom: '0.3rem' }}>Post generated successfully</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#2C2820', textTransform: 'none', marginBottom: '0.5rem' }}>{lastGenerated.title}</p>
              <Link href={`/journal/${lastGenerated.slug}`} target="_blank"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#1B3A5C', textDecoration: 'none', borderBottom: '1px solid rgba(27,58,92,0.3)', paddingBottom: '1px' }}>
                View post →
              </Link>
            </div>
          )}
        </div>

        {/* Posts list */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9E9282' }}>
              All posts ({posts.length})
            </p>
            <button className="admin-btn admin-btn-ghost" onClick={fetchPosts} style={{ padding: '0.4rem 1rem', fontSize: '0.62rem' }}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#9E9282', padding: '2rem 0' }}>Loading posts...</p>
          ) : (
            posts.map(post => (
              <div key={post.id} className="post-row">

                {/* Thumbnail */}
                {post.image_url ? (
                  <img src={post.image_url} alt="" className="post-thumb" />
                ) : (
                  <div className="post-thumb-placeholder">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9E9282" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
                    </svg>
                  </div>
                )}

                {/* Post info */}
                <div style={{ flex: 1, minWidth: '180px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: post.published ? '#2C7A4B' : '#9E9282', border: `1px solid ${post.published ? '#2C7A4B' : '#DDD5C0'}`, padding: '0.12rem 0.45rem' }}>
                      {post.published ? 'Live' : 'Draft'}
                    </span>
                    <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9E9282' }}>{post.category}</span>
                  </div>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.85rem', color: '#2C2820', textTransform: 'none', marginBottom: '0.15rem', lineHeight: 1.3 }}>{post.title}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: '#9E9282' }}>
                    {new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, flexWrap: 'wrap', alignItems: 'center' }}>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={el => { fileInputRefs.current[post.id] = el; }}
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) uploadImage(post, file);
                      e.target.value = '';
                    }}
                  />

                  {/* Upload button */}
                  <button
                    className={`admin-btn admin-btn-upload ${post.image_url ? 'has-image' : ''}`}
                    onClick={() => fileInputRefs.current[post.id]?.click()}
                    disabled={uploadingId === post.id}
                    title={post.image_url ? 'Replace image' : 'Upload image'}
                  >
                    {uploadingId === post.id ? 'Uploading...' : post.image_url ? '✓ Image' : '+ Image'}
                  </button>

                  <Link href={`/journal/${post.slug}`} target="_blank"
                    style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1B3A5C', textDecoration: 'none', border: '1px solid #DDD5C0', padding: '0.4rem 0.8rem' }}>
                    View
                  </Link>

                  <button className="admin-btn admin-btn-ghost" onClick={() => togglePublished(post)}>
                    {post.published ? 'Unpublish' : 'Publish'}
                  </button>

                  <button className="admin-btn admin-btn-danger" onClick={() => deletePost(post)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}