'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://knwyfoqmlwbxtfhvkbmc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3lmb3FtbHdieHRmaHZrYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjMzMTUsImV4cCI6MjA4OTA5OTMxNX0.er5XEya3170rW6hHyuhCNEKlg2SEk9_YPSOi4nWHb7Y'
);

interface Stats {
  upcomingBookings: number;
  unredeemedVouchers: number;
  newEnquiries: number;
  publishedPosts: number;
}

export default function AdminHubPage() {
  const [stats, setStats] = useState<Stats>({
    upcomingBookings: 0,
    unredeemedVouchers: 0,
    newEnquiries: 0,
    publishedPosts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const today = new Date().toISOString().split('T')[0];
      const [
        { count: bookingCount },
        { count: voucherCount },
        { count: enquiryCount },
        { count: postCount },
      ] = await Promise.all([
        supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'confirmed').gte('slot_date', today),
        supabase.from('vouchers').select('*', { count: 'exact', head: true }).eq('status', 'unused'),
        supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('read', false),
        supabase.from('posts').select('*', { count: 'exact', head: true }).eq('published', true),
      ]);
      setStats({
        upcomingBookings: bookingCount || 0,
        unredeemedVouchers: voucherCount || 0,
        newEnquiries: enquiryCount || 0,
        publishedPosts: postCount || 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const sections = [
    {
      href: '/admin/bookings',
      title: 'Bookings & Calendar',
      desc: 'View upcoming sessions, manage availability, block dates, handle gift vouchers.',
      stat: stats.upcomingBookings,
      statLabel: 'upcoming sessions',
      statAlert: false,
      accent: '#1B3A5C',
      icon: '◈',
    },
    {
      href: '/admin/enquiries',
      title: 'Enquiries',
      desc: 'Messages from the contact form. Reply directly from here or via email.',
      stat: stats.newEnquiries,
      statLabel: 'unread messages',
      statAlert: stats.newEnquiries > 0,
      accent: '#C8572A',
      icon: '◉',
    },
    {
      href: '/admin/journal',
      title: 'Journal',
      desc: 'Write, generate and publish journal posts. Manage existing articles.',
      stat: stats.publishedPosts,
      statLabel: 'published posts',
      statAlert: false,
      accent: '#3a4828',
      icon: '◎',
    },
  ];

  return (
    <>
      <style>{`
        .hub { min-height: 100vh; background: #0d1b2a; display: flex; flex-direction: column; }
        .hub-header { padding: 2rem 2.5rem; border-bottom: 1px solid rgba(168,202,236,0.08); display: flex; justify-content: space-between; align-items: center; }
        .hub-body { flex: 1; padding: 2.5rem; max-width: 900px; margin: 0 auto; width: 100%; }
        .hub-card { display: block; text-decoration: none; padding: 2rem; border: 1px solid rgba(168,202,236,0.08); background: rgba(255,255,255,0.03); margin-bottom: 2px; transition: all 0.2s; position: relative; overflow: hidden; }
        .hub-card:hover { background: rgba(255,255,255,0.06); border-color: rgba(168,202,236,0.2); }
        .hub-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
        .alert-dot { width: 8px; height: 8px; border-radius: 50%; background: #C8572A; display: inline-block; margin-left: 0.5rem; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 640px) {
          .hub-header { padding: 1.5rem; }
          .hub-body { padding: 1.5rem; }
        }
      `}</style>

      <div className="hub">
        <div className="hub-header">
          <div>
            <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.3rem' }}>Something Blue Productions</p>
            <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.4rem', color: '#E8DDB5', textTransform: 'none' }}>
              Admin <span style={{ fontFamily: "'Stay Humble', cursive", fontSize: '1.7rem' }}>hub.</span>
            </h1>
          </div>
          <a href="/" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(168,202,236,0.35)', textDecoration: 'none' }}>← View site</a>
        </div>

        <div className="hub-body">

          {/* Date / time */}
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'rgba(245,240,232,0.25)', marginBottom: '2rem' }}>
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          {/* Section cards */}
          {sections.map(s => (
            <Link key={s.href} href={s.href} className="hub-card" style={{ ['--accent' as string]: s.accent }}>
              <style>{`.hub-card[href="${s.href}"]::before { background: ${s.accent}; }`}</style>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.7rem', color: s.accent }}>{s.icon}</span>
                    <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.1rem', color: '#E8DDB5', textTransform: 'none' }}>{s.title}</h2>
                    {s.statAlert && <span className="alert-dot" />}
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.65 }}>{s.desc}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  {!loading && (
                    <>
                      <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '2rem', color: s.statAlert ? '#C8572A' : '#E8DDB5', fontWeight: 300, lineHeight: 1 }}>{s.stat}</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', color: 'rgba(245,240,232,0.3)', marginTop: '0.2rem' }}>{s.statLabel}</p>
                    </>
                  )}
                </div>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(168,202,236,0.35)' }}>Open →</span>
              </div>
            </Link>
          ))}

          {/* Quick stats footer */}
          <div style={{ marginTop: '1.5rem', padding: '1.2rem 1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(168,202,236,0.06)', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.2rem' }}>Vouchers unredeemed</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '1.2rem', color: '#E8DDB5', fontWeight: 300 }}>{loading ? '—' : stats.unredeemedVouchers}</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.2rem' }}>Published posts</p>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '1.2rem', color: '#E8DDB5', fontWeight: 300 }}>{loading ? '—' : stats.publishedPosts}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}