'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://knwyfoqmlwbxtfhvkbmc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3lmb3FtbHdieHRmaHZrYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjMzMTUsImV4cCI6MjA4OTA5OTMxNX0.er5XEya3170rW6hHyuhCNEKlg2SEk9_YPSOi4nWHb7Y'
);

interface Enquiry {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  read: boolean;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('unread');

  useEffect(() => {
    fetchEnquiries();
  }, []);

  async function fetchEnquiries() {
    const { data } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });
    setEnquiries(data || []);
    setLoading(false);
  }

  async function markAsRead(id: number) {
    await supabase.from('enquiries').update({ read: true }).eq('id', id);
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, read: true } : e));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, read: true } : null);
  }

  async function markAllRead() {
    await supabase.from('enquiries').update({ read: true }).eq('read', false);
    setEnquiries(prev => prev.map(e => ({ ...e, read: true })));
  }

  const filtered = filter === 'unread' ? enquiries.filter(e => !e.read) : enquiries;
  const unreadCount = enquiries.filter(e => !e.read).length;

  return (
    <>
      <style>{`
        .enq { min-height: 100vh; background: #0d1b2a; font-family: 'Inter', sans-serif; }
        .enq-header { padding: 1.5rem 2rem; border-bottom: 1px solid rgba(168,202,236,0.08); display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; background: #0d1b2a; z-index: 10; }
        .enq-body { display: grid; grid-template-columns: 1fr; max-width: 1100px; margin: 0 auto; }
        .enq-list { border-right: 1px solid rgba(168,202,236,0.06); }
        .enq-item { padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(168,202,236,0.06); cursor: pointer; transition: background 0.15s; }
        .enq-item:hover { background: rgba(255,255,255,0.03); }
        .enq-item.selected { background: rgba(27,58,92,0.3); }
        .enq-item.unread { border-left: 3px solid #C8572A; }
        .enq-item.read { border-left: 3px solid transparent; }
        .enq-detail { padding: 2rem; }
        .enq-btn { font-family: 'Carose', sans-serif; font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.5rem 1rem; border: none; cursor: pointer; transition: opacity 0.2s; }
        .enq-btn-primary { background: #1B3A5C; color: #E8DDB5; }
        .enq-btn-ghost { background: rgba(168,202,236,0.08); color: #A8CAEC; border: 1px solid rgba(168,202,236,0.15); }
        .enq-btn:hover { opacity: 0.8; }
        .filter-btn { font-family: 'Carose', sans-serif; font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.4rem 0.9rem; border: 1px solid rgba(168,202,236,0.15); background: transparent; color: rgba(245,240,232,0.4); cursor: pointer; transition: all 0.2s; }
        .filter-btn.active { background: #1B3A5C; border-color: #1B3A5C; color: #E8DDB5; }
        @media (min-width: 768px) {
          .enq-body { grid-template-columns: 360px 1fr; min-height: calc(100vh - 65px); }
        }
      `}</style>

      <div className="enq">
        <div className="enq-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="/admin" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(168,202,236,0.4)', textDecoration: 'none' }}>← Admin</a>
            <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1rem', color: '#E8DDB5', textTransform: 'none' }}>Enquiries</h1>
            {unreadCount > 0 && (
              <span style={{ background: '#C8572A', color: '#fff', fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.1em', padding: '0.15rem 0.5rem', borderRadius: '0' }}>{unreadCount} new</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button className={`filter-btn ${filter === 'unread' ? 'active' : ''}`} onClick={() => setFilter('unread')}>Unread</button>
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
            {unreadCount > 0 && <button className="enq-btn enq-btn-ghost" onClick={markAllRead}>Mark all read</button>}
          </div>
        </div>

        <div className="enq-body">
          {/* List */}
          <div className="enq-list">
            {loading && <p style={{ padding: '1.5rem', color: 'rgba(245,240,232,0.3)', fontSize: '0.82rem' }}>Loading...</p>}
            {!loading && filtered.length === 0 && (
              <p style={{ padding: '1.5rem', color: 'rgba(245,240,232,0.3)', fontSize: '0.82rem' }}>
                {filter === 'unread' ? 'No unread enquiries.' : 'No enquiries yet.'}
              </p>
            )}
            {filtered.map(e => (
              <div
                key={e.id}
                className={`enq-item ${selected?.id === e.id ? 'selected' : ''} ${e.read ? 'read' : 'unread'}`}
                onClick={() => { setSelected(e); if (!e.read) markAsRead(e.id); }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.85rem', color: e.read ? 'rgba(232,221,181,0.6)' : '#E8DDB5', textTransform: 'none' }}>{e.name}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', color: 'rgba(245,240,232,0.25)', flexShrink: 0 }}>
                    {new Date(e.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
                {e.service && <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.3rem' }}>{e.service}</p>}
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.35)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.message}</p>
              </div>
            ))}
          </div>

          {/* Detail */}
          <div className="enq-detail">
            {!selected && (
              <p style={{ color: 'rgba(245,240,232,0.2)', fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', marginTop: '2rem' }}>Select an enquiry to read it.</p>
            )}
            {selected && (
              <>
                <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(168,202,236,0.08)' }}>
                  <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.2rem', color: '#E8DDB5', textTransform: 'none', marginBottom: '0.5rem' }}>{selected.name}</h2>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <a href={`mailto:${selected.email}`} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#A8CAEC', textDecoration: 'none', borderBottom: '1px solid rgba(168,202,236,0.3)' }}>{selected.email}</a>
                    {selected.phone && <a href={`tel:${selected.phone}`} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#A8CAEC', textDecoration: 'none', borderBottom: '1px solid rgba(168,202,236,0.3)' }}>{selected.phone}</a>}
                  </div>
                  {selected.service && (
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282', marginTop: '0.5rem' }}>{selected.service}</p>
                  )}
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(245,240,232,0.25)', marginTop: '0.4rem' }}>
                    {new Date(selected.created_at).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'rgba(245,240,232,0.7)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{selected.message}</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <a
                    href={`mailto:${selected.email}?subject=Re: Your enquiry — Something Blue Productions`}
                    className="enq-btn enq-btn-primary"
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                  >
                    Reply by email →
                  </a>
                  {selected.phone && (
                    <a href={`tel:${selected.phone}`} className="enq-btn enq-btn-ghost" style={{ textDecoration: 'none', display: 'inline-block' }}>
                      Call {selected.name.split(' ')[0]}
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}