'use client';

import { useState, useEffect } from 'react';

interface Enquiry {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  read: boolean;
  spam_status?: 'genuine' | 'suspected_spam' | 'blocked_obvious_bot' | string;
  notification_status?: 'pending' | 'sent' | 'partial' | 'failed' | 'skipped_spam' | string;
  source_page?: string | null;
}

function notifyLabel(s?: string) {
  switch (s) {
    case 'sent': return { text: 'alert sent', color: '#2C7A4B' };
    case 'partial': return { text: 'alert partial', color: '#C8572A' };
    case 'failed': return { text: 'alert FAILED', color: '#C8572A' };
    case 'skipped_spam': return { text: 'no alert (spam)', color: '#9E9282' };
    case 'pending': return { text: 'alert pending', color: '#9E9282' };
    default: return null;
  }
}

function spamLabel(s?: string) {
  switch (s) {
    case 'suspected_spam': return { text: 'suspected spam', color: '#C8572A' };
    case 'blocked_obvious_bot': return { text: 'blocked bot', color: '#9E9282' };
    default: return null;
  }
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => { fetchEnquiries(); }, []);

  async function fetchEnquiries() {
    const res = await fetch('/api/admin/enquiries', { cache: 'no-store' });
    const j = await res.json().catch(() => ({}));
    setEnquiries(j.enquiries || []);
    setLoading(false);
  }

  async function markAsRead(id: number) {
    await fetch('/api/admin/enquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, read: true }),
    });
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, read: true } : e));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, read: true } : null);
  }

  async function markAllRead() {
    await fetch('/api/admin/enquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: true }),
    });
    setEnquiries(prev => prev.map(e => ({ ...e, read: true })));
  }

  const filtered = filter === 'unread' ? enquiries.filter(e => !e.read) : enquiries;
  const unreadCount = enquiries.filter(e => !e.read).length;

  return (
    <>
      <style>{`
        .enq { min-height: 100vh; background: #0d1b2a; font-family: 'Inter', sans-serif; padding-top: 80px; }
        .enq-header { padding: 1.5rem 2rem; border-bottom: 1px solid rgba(168,202,236,0.08); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; }
        .enq-body { display: grid; grid-template-columns: 1fr; }
        .enq-list { border-right: 1px solid rgba(168,202,236,0.06); max-height: calc(100vh - 145px); overflow-y: auto; }
        .enq-item { padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(168,202,236,0.06); cursor: pointer; transition: background 0.15s; }
        .enq-item:hover { background: rgba(255,255,255,0.03); }
        .enq-item.selected { background: rgba(27,58,92,0.3); }
        .enq-detail { padding: 2rem; max-height: calc(100vh - 145px); overflow-y: auto; }
        .enq-btn { font-family: 'Carose', sans-serif; font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.5rem 1rem; border: none; cursor: pointer; transition: opacity 0.2s; }
        .enq-btn-primary { background: #1B3A5C; color: #E8DDB5; }
        .enq-btn-ghost { background: rgba(168,202,236,0.08); color: #A8CAEC; border: 1px solid rgba(168,202,236,0.15); }
        .enq-btn:hover { opacity: 0.8; }
        .filter-btn { font-family: 'Carose', sans-serif; font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.4rem 0.9rem; border: 1px solid rgba(168,202,236,0.15); background: transparent; color: rgba(245,240,232,0.4); cursor: pointer; transition: all 0.2s; }
        .filter-btn.active { background: #1B3A5C; border-color: #1B3A5C; color: #E8DDB5; }
        .unread-dot { width: 7px; height: 7px; border-radius: 50%; background: #C8572A; display: inline-block; flex-shrink: 0; }
        @media (min-width: 768px) {
          .enq-body { grid-template-columns: 360px 1fr; min-height: calc(100vh - 145px); }
        }
      `}</style>

      <div className="enq">
        <div className="enq-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="/admin" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(168,202,236,0.4)', textDecoration: 'none' }}>← Admin</a>
            <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1rem', color: '#E8DDB5', textTransform: 'none' }}>Enquiries</h1>
            {unreadCount > 0 && (
              <span style={{ background: '#C8572A', color: '#fff', fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.1em', padding: '0.15rem 0.5rem' }}>{unreadCount} unread</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All ({enquiries.length})</button>
            <button className={`filter-btn ${filter === 'unread' ? 'active' : ''}`} onClick={() => setFilter('unread')}>Unread ({unreadCount})</button>
            {unreadCount > 0 && <button className="enq-btn enq-btn-ghost" onClick={markAllRead}>Mark all read</button>}
          </div>
        </div>

        <div className="enq-body">
          <div className="enq-list">
            {loading && <p style={{ padding: '1.5rem', color: 'rgba(245,240,232,0.3)', fontSize: '0.82rem' }}>Loading...</p>}
            {!loading && filtered.length === 0 && (
              <p style={{ padding: '1.5rem', color: 'rgba(245,240,232,0.3)', fontSize: '0.82rem' }}>No enquiries yet.</p>
            )}
            {filtered.map(e => (
              <div
                key={e.id}
                className={`enq-item ${selected?.id === e.id ? 'selected' : ''}`}
                style={{ borderLeft: `3px solid ${e.read ? 'transparent' : '#C8572A'}` }}
                onClick={() => { setSelected(e); if (!e.read) markAsRead(e.id); }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {!e.read && <span className="unread-dot" />}
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.85rem', color: e.read ? 'rgba(232,221,181,0.55)' : '#E8DDB5', textTransform: 'none' }}>{e.name}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    {!e.read && (
                      <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8572A', background: 'rgba(200,87,42,0.1)', padding: '0.1rem 0.4rem' }}>New</span>
                    )}
                    {e.read && (
                      <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.2)', background: 'rgba(255,255,255,0.04)', padding: '0.1rem 0.4rem' }}>Read</span>
                    )}
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', color: 'rgba(245,240,232,0.25)' }}>
                      {new Date(e.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </div>
                {e.service && (
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A8CAEC', marginBottom: '0.3rem' }}>{e.service}</p>
                )}
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.35)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.message}</p>
                {(() => {
                  const spam = spamLabel(e.spam_status);
                  const notif = notifyLabel(e.notification_status);
                  if (!spam && !notif) return null;
                  return (
                    <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.3rem', flexWrap: 'wrap' }}>
                      {spam && <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: spam.color, border: `1px solid ${spam.color}`, padding: '0.05rem 0.35rem' }}>{spam.text}</span>}
                      {notif && <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: notif.color, border: `1px solid ${notif.color}`, padding: '0.05rem 0.35rem' }}>{notif.text}</span>}
                    </div>
                  );
                })()}
              </div>
            ))}
          </div>

          <div className="enq-detail">
            {!selected && (
              <p style={{ color: 'rgba(245,240,232,0.2)', fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', marginTop: '2rem' }}>Select an enquiry to read it.</p>
            )}
            {selected && (
              <>
                <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(168,202,236,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.2rem', color: '#E8DDB5', textTransform: 'none' }}>{selected.name}</h2>
                    <span style={{
                      fontFamily: "'Carose', sans-serif", fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: selected.read ? 'rgba(245,240,232,0.2)' : '#C8572A',
                      background: selected.read ? 'rgba(255,255,255,0.04)' : 'rgba(200,87,42,0.1)',
                      padding: '0.15rem 0.5rem',
                    }}>
                      {selected.read ? 'Read' : 'Unread'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    <a href={`mailto:${selected.email}`} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#A8CAEC', textDecoration: 'none', borderBottom: '1px solid rgba(168,202,236,0.3)' }}>{selected.email}</a>
                    {selected.phone && <a href={`tel:${selected.phone}`} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#A8CAEC', textDecoration: 'none', borderBottom: '1px solid rgba(168,202,236,0.3)' }}>{selected.phone}</a>}
                  </div>
                  {selected.service && (
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.3rem' }}>{selected.service}</p>
                  )}
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(245,240,232,0.25)' }}>
                    {new Date(selected.created_at).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} at {new Date(selected.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    {selected.source_page ? ` · ${selected.source_page}` : ''}
                  </p>
                  {(() => {
                    const spam = spamLabel(selected.spam_status);
                    const notif = notifyLabel(selected.notification_status);
                    if (!spam && !notif) return null;
                    return (
                      <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                        {spam && <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: spam.color, border: `1px solid ${spam.color}`, padding: '0.15rem 0.5rem' }}>{spam.text}</span>}
                        {notif && <span style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: notif.color, border: `1px solid ${notif.color}`, padding: '0.15rem 0.5rem' }}>{notif.text}</span>}
                      </div>
                    );
                  })()}
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'rgba(245,240,232,0.7)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{selected.message}</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <a href={`mailto:${selected.email}?subject=Re: Your enquiry — Something Blue Productions`} className="enq-btn enq-btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                    Reply by email →
                  </a>
                  {selected.phone && (
                    <a href={`tel:${selected.phone}`} className="enq-btn enq-btn-ghost" style={{ textDecoration: 'none', display: 'inline-block' }}>
                      Call {selected.name.split(' ')[0]}
                    </a>
                  )}
                  {!selected.read && (
                    <button className="enq-btn enq-btn-ghost" onClick={() => markAsRead(selected.id)}>Mark as read</button>
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