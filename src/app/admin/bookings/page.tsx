'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://knwyfoqmlwbxtfhvkbmc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3lmb3FtbHdieHRmaHZrYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjMzMTUsImV4cCI6MjA4OTA5OTMxNX0.er5XEya3170rW6hHyuhCNEKlg2SEk9_YPSOi4nWHb7Y'
);

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  people_count: number;
  session_duration: number;
  session_price: number;
  slot_date: string;
  slot_time: string;
  status: string;
  voucher_code: string | null;
  notes: string | null;
  created_at: string;
}

interface Slot {
  id: number;
  day_of_week: string;
  slot_time: string;
  is_active: boolean;
  is_blocked: boolean;
  specific_date: string | null;
  blocked_reason: string | null;
}

interface Voucher {
  id: number;
  code: string;
  occasion: string;
  session_type: string;
  buyer_name: string;
  buyer_email: string;
  recipient_name: string;
  recipient_email: string;
  status: string;
  expires_at: string;
  created_at: string;
  session_price: number;
}

function getWeekDays(startDate: Date) {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    days.push(d);
  }
  return days;
}

function getMondayOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatTime(time: string) {
  const [h, m] = time.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'pm' : 'am';
  const displayHour = hour > 12 ? hour - 12 : hour;
  return `${displayHour}${m !== '00' ? ':' + m : ''}${ampm}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

const SERVICE_COLOURS: Record<string, string> = {
  couple: '#1B3A5C',
  maternity: '#4a3c50',
  newborn: '#4a3830',
  family: '#3a4828',
  headshots: '#2c2820',
};

const DAYS = ['tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

type Tab = 'calendar' | 'bookings' | 'slots' | 'vouchers';

export default function AdminBookingsPage() {
  const [tab, setTab] = useState<Tab>('calendar');
  const [weekStart, setWeekStart] = useState(() => getMondayOfWeek(new Date()));
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [blockingDate, setBlockingDate] = useState('');
  const [blockingReason, setBlockingReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState('');
  const [newSlotDay, setNewSlotDay] = useState('tuesday');
  const [newSlotTime, setNewSlotTime] = useState('');

  const weekDays = getWeekDays(weekStart);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [{ data: b }, { data: s }, { data: v }] = await Promise.all([
      supabase.from('bookings').select('*').order('slot_date', { ascending: true }),
      supabase.from('availability_slots').select('*').order('slot_time'),
      supabase.from('vouchers').select('*').order('created_at', { ascending: false }),
    ]);
    setBookings(b || []);
    setSlots(s || []);
    setVouchers(v || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const getBookingsForDateAndTime = (date: Date, time: string) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookings.filter(b => b.slot_date === dateStr && b.slot_time === time);
  };

  const getSlotsForDay = (date: Date) => {
    const dow = date.toLocaleDateString('en-GB', { weekday: 'long' }).toLowerCase();
    const dateStr = date.toISOString().split('T')[0];
    const recurringSlots = slots.filter(s => s.day_of_week === dow && !s.specific_date);
    const specificSlots = slots.filter(s => s.specific_date === dateStr);
    const specificTimes = specificSlots.map(s => s.slot_time);
    const merged = recurringSlots.filter(s => !specificTimes.includes(s.slot_time));
    return [...merged, ...specificSlots].sort((a, b) => a.slot_time.localeCompare(b.slot_time));
  };

  const allTimes = [...new Set(slots.filter(s => !s.specific_date).map(s => s.slot_time))].sort();

  async function toggleSlotActive(slot: Slot) {
    const newValue = !slot.is_active;
    // Optimistic update
    setSlots(prev => prev.map(s => s.id === slot.id ? { ...s, is_active: newValue } : s));
    const { error } = await supabase
      .from('availability_slots')
      .update({ is_active: newValue })
      .eq('id', slot.id);
    if (error) {
      // Revert on error
      setSlots(prev => prev.map(s => s.id === slot.id ? { ...s, is_active: slot.is_active } : s));
      setActionMsg('Error updating slot');
    } else {
      setActionMsg(`${formatTime(slot.slot_time)} on ${slot.day_of_week} ${newValue ? 'enabled' : 'disabled'}`);
    }
    setTimeout(() => setActionMsg(''), 2500);
  }

  async function addSlot() {
    if (!newSlotTime) return;
    const formatted = newSlotTime.length === 5 ? newSlotTime : newSlotTime + ':00';
    const { error } = await supabase.from('availability_slots').insert({
      day_of_week: newSlotDay,
      slot_time: formatted,
      is_active: true,
      is_blocked: false,
    });
    if (error) {
      setActionMsg('Error — slot may already exist');
    } else {
      setActionMsg(`Added ${formatTime(formatted)} on ${newSlotDay}`);
      setNewSlotTime('');
      fetchAll();
    }
    setTimeout(() => setActionMsg(''), 2500);
  }

  async function deleteSlot(slot: Slot) {
    if (!confirm(`Delete ${formatTime(slot.slot_time)} on ${slot.day_of_week}?`)) return;
    await supabase.from('availability_slots').delete().eq('id', slot.id);
    setSlots(prev => prev.filter(s => s.id !== slot.id));
    setActionMsg('Slot deleted');
    setTimeout(() => setActionMsg(''), 2000);
  }

  async function blockDate() {
    if (!blockingDate) return;
    const d = new Date(blockingDate);
    const dow = d.toLocaleDateString('en-GB', { weekday: 'long' }).toLowerCase();
    const daySlots = slots.filter(s => s.day_of_week === dow && !s.specific_date && s.is_active);
    for (const slot of daySlots) {
      await supabase.from('availability_slots').insert({
        day_of_week: dow,
        slot_time: slot.slot_time,
        specific_date: blockingDate,
        is_active: false,
        is_blocked: true,
        blocked_reason: blockingReason || 'Unavailable',
      });
    }
    setActionMsg(`${blockingDate} blocked`);
    setBlockingDate('');
    setBlockingReason('');
    fetchAll();
    setTimeout(() => setActionMsg(''), 3000);
  }

  async function cancelBooking(id: number) {
    if (!confirm('Cancel this booking?')) return;
    await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', id);
    setSelectedBooking(null);
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
    setActionMsg('Booking cancelled');
    setTimeout(() => setActionMsg(''), 2000);
  }

  async function revokeVoucher(id: number) {
    if (!confirm('Revoke this voucher?')) return;
    await supabase.from('vouchers').update({ status: 'revoked' }).eq('id', id);
    setVouchers(prev => prev.map(v => v.id === id ? { ...v, status: 'revoked' } : v));
    setActionMsg('Voucher revoked');
    setTimeout(() => setActionMsg(''), 2000);
  }

  const upcomingBookings = bookings.filter(b => {
    const d = new Date(b.slot_date);
    const today = new Date(); today.setHours(0,0,0,0);
    return d >= today && b.status === 'confirmed';
  });

  const weekRevenue = upcomingBookings
    .filter(b => weekDays.some(d => d.toISOString().split('T')[0] === b.slot_date))
    .reduce((sum, b) => sum + b.session_price, 0);

  return (
    <>
      <style>{`
        .adm { min-height: 100vh; background: #0d1b2a; font-family: 'Inter', sans-serif; padding-top: 80px; }
        .adm-header { background: #0d1b2a; border-bottom: 1px solid rgba(168,202,236,0.1); padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between; }
        .adm-tabs { display: flex; gap: 2px; padding: 1rem 2rem 0; overflow-x: auto; }
        .adm-tab { font-family: 'Carose', sans-serif; font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase; padding: 0.6rem 1.2rem; background: transparent; border: 1px solid rgba(168,202,236,0.15); color: rgba(245,240,232,0.4); cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .adm-tab.active { background: #1B3A5C; border-color: #1B3A5C; color: #E8DDB5; }
        .adm-tab:hover:not(.active) { border-color: rgba(168,202,236,0.3); color: rgba(245,240,232,0.7); }
        .adm-body { padding: 1.5rem 2rem 4rem; }
        .adm-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(168,202,236,0.08); padding: 1.5rem; margin-bottom: 2px; }
        .adm-btn { font-family: 'Carose', sans-serif; font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.5rem 1rem; border: none; cursor: pointer; transition: opacity 0.2s; }
        .adm-btn-primary { background: #1B3A5C; color: #E8DDB5; }
        .adm-btn-danger { background: #7f1d1d; color: #fca5a5; }
        .adm-btn-ghost { background: rgba(168,202,236,0.08); color: #A8CAEC; border: 1px solid rgba(168,202,236,0.15); }
        .adm-btn:hover { opacity: 0.8; }
        .adm-input { background: rgba(255,255,255,0.06); border: 1px solid rgba(168,202,236,0.15); color: #E8DDB5; padding: 0.6rem 0.85rem; font-family: 'Inter', sans-serif; font-size: 0.82rem; outline: none; width: 100%; box-sizing: border-box; }
        .adm-input:focus { border-color: #A8CAEC; }
        .adm-select { background: rgba(255,255,255,0.06); border: 1px solid rgba(168,202,236,0.15); color: #E8DDB5; padding: 0.6rem 0.85rem; font-family: 'Inter', sans-serif; font-size: 0.82rem; outline: none; cursor: pointer; }
        .adm-label { font-family: 'Carose', sans-serif; font-size: 0.58rem; letter-spacing: 0.15em; text-transform: uppercase; color: #A8CAEC; display: block; margin-bottom: 0.4rem; }
        .cal-grid { display: grid; grid-template-columns: 60px repeat(7, 1fr); gap: 1px; background: rgba(168,202,236,0.06); }
        .cal-header { background: #0d1b2a; padding: 0.75rem 0.5rem; text-align: center; }
        .cal-time { background: #0d1b2a; padding: 0.5rem; display: flex; align-items: center; justify-content: flex-end; padding-right: 0.75rem; }
        .cal-cell { background: rgba(255,255,255,0.02); padding: 0.35rem; min-height: 44px; position: relative; transition: background 0.15s; }
        .cal-cell.blocked { background: rgba(127,29,29,0.15); }
        .cal-cell.inactive { background: rgba(0,0,0,0.2); }
        .booking-chip { background: #1B3A5C; padding: 0.25rem 0.5rem; margin-bottom: 2px; cursor: pointer; }
        .booking-chip:hover { opacity: 0.85; }
        .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; margin-bottom: 1.5rem; }
        .stat-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(168,202,236,0.08); padding: 1.2rem 1.5rem; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 50; display: flex; align-items: center; justify-content: center; padding: 1rem; }
        .modal { background: #0d2440; border: 1px solid rgba(168,202,236,0.15); padding: 2rem; max-width: 480px; width: 100%; max-height: 90vh; overflow-y: auto; }
        .badge { display: inline-block; font-family: 'Carose', sans-serif; font-size: 0.55rem; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.2rem 0.5rem; }
        .badge-confirmed { background: rgba(34,197,94,0.15); color: #86efac; }
        .badge-cancelled { background: rgba(239,68,68,0.15); color: #fca5a5; }
        .badge-unused { background: rgba(168,202,236,0.15); color: #A8CAEC; }
        .badge-used { background: rgba(34,197,94,0.15); color: #86efac; }
        .badge-revoked { background: rgba(239,68,68,0.15); color: #fca5a5; }
        .action-msg { position: fixed; bottom: 2rem; right: 2rem; background: #1B3A5C; color: #E8DDB5; padding: 0.75rem 1.5rem; font-family: 'Carose', sans-serif; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; z-index: 100; }
        .slot-btn { font-family: 'Carose', sans-serif; font-size: 0.65rem; letter-spacing: 0.1em; padding: 0.5rem 0.85rem; border: 1px solid; cursor: pointer; transition: all 0.15s; display: inline-flex; align-items: center; gap: 0.4rem; }
        .slot-btn.active { background: #1B3A5C; border-color: #1B3A5C; color: #E8DDB5; }
        .slot-btn.inactive { background: rgba(255,255,255,0.03); border-color: rgba(168,202,236,0.1); color: rgba(245,240,232,0.3); }
        .slot-btn:hover { opacity: 0.8; }
        @media (max-width: 900px) {
          .stat-grid { grid-template-columns: 1fr 1fr; }
          .adm-body { padding: 1rem; }
          .adm-header { padding: 0.75rem 1rem; }
        }
      `}</style>

      <div className="adm">
        <div className="adm-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="/admin" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(168,202,236,0.4)', textDecoration: 'none' }}>← Admin</a>
            <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1rem', color: '#E8DDB5', textTransform: 'none' }}>Bookings & Calendar</h1>
          </div>
          <a href="/" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(168,202,236,0.4)', textDecoration: 'none' }}>← Site</a>
        </div>

        <div className="adm-tabs">
          {(['calendar', 'bookings', 'slots', 'vouchers'] as Tab[]).map(t => (
            <button key={t} className={`adm-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>

        <div className="adm-body">
          {loading && <p style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.82rem' }}>Loading...</p>}

          {/* ── CALENDAR ── */}
          {!loading && tab === 'calendar' && (
            <>
              <div className="stat-grid">
                {[
                  { label: 'This week', value: upcomingBookings.filter(b => weekDays.some(d => d.toISOString().split('T')[0] === b.slot_date)).length, sub: 'bookings' },
                  { label: 'Week revenue', value: `£${weekRevenue}`, sub: 'confirmed' },
                  { label: 'Upcoming', value: upcomingBookings.length, sub: 'total sessions' },
                  { label: 'Vouchers', value: vouchers.filter(v => v.status === 'unused').length, sub: 'unredeemed' },
                ].map(s => (
                  <div key={s.label} className="stat-card">
                    <p className="adm-label">{s.label}</p>
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '1.8rem', color: '#E8DDB5', fontWeight: 300 }}>{s.value}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(245,240,232,0.4)' }}>{s.sub}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <button className="adm-btn adm-btn-ghost" onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate() - 7); setWeekStart(d); }}>← Prev</button>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A8CAEC' }}>
                  {weekStart.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} — {weekDays[6].toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                <button className="adm-btn adm-btn-ghost" onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate() + 7); setWeekStart(d); }}>Next →</button>
                <button className="adm-btn adm-btn-ghost" onClick={() => setWeekStart(getMondayOfWeek(new Date()))}>Today</button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <div className="cal-grid" style={{ minWidth: '700px' }}>
                  <div className="cal-header" />
                  {weekDays.map(d => (
                    <div key={d.toISOString()} className="cal-header">
                      <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A8CAEC' }}>{d.toLocaleDateString('en-GB', { weekday: 'short' })}</p>
                      <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '1rem', color: d.toDateString() === new Date().toDateString() ? '#A8CAEC' : '#E8DDB5', fontWeight: 300 }}>{d.getDate()}</p>
                    </div>
                  ))}
                  {allTimes.map(time => (
                    <>
                      <div key={`t-${time}`} className="cal-time">
                        <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', color: 'rgba(245,240,232,0.35)' }}>{formatTime(time)}</p>
                      </div>
                      {weekDays.map(d => {
                        const daySlots = getSlotsForDay(d);
                        const slot = daySlots.find(s => s.slot_time === time);
                        const dayBookings = getBookingsForDateAndTime(d, time);
                        const isBlocked = slot?.is_blocked;
                        const isInactive = !slot || !slot.is_active;
                        const isPast = d < new Date(new Date().setHours(0,0,0,0));
                        return (
                          <div key={`${d.toISOString()}-${time}`} className={`cal-cell ${isBlocked ? 'blocked' : isInactive ? 'inactive' : ''}`} style={{ opacity: isPast ? 0.4 : 1 }}>
                            {dayBookings.map(b => (
                              <div key={b.id} className="booking-chip" style={{ background: SERVICE_COLOURS[b.service_type] || '#1B3A5C' }} onClick={() => setSelectedBooking(b)}>
                                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(232,221,181,0.9)', lineHeight: 1.3 }}>{b.name.split(' ')[0]}</p>
                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.55rem', color: 'rgba(232,221,181,0.55)' }}>{b.service_type} · {b.session_duration}m</p>
                              </div>
                            ))}
                            {isBlocked && !dayBookings.length && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.55rem', color: 'rgba(252,165,165,0.5)', padding: '0.2rem' }}>blocked</p>}
                            {isInactive && !isBlocked && !dayBookings.length && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.55rem', color: 'rgba(245,240,232,0.1)', padding: '0.2rem' }}>—</p>}
                          </div>
                        );
                      })}
                    </>
                  ))}
                </div>
              </div>

              <div className="adm-card" style={{ marginTop: '1.5rem' }}>
                <p className="adm-label" style={{ marginBottom: '1rem' }}>Block a date</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                  <div style={{ flex: '1', minWidth: '140px' }}>
                    <label className="adm-label">Date</label>
                    <input type="date" className="adm-input" value={blockingDate} onChange={e => setBlockingDate(e.target.value)} />
                  </div>
                  <div style={{ flex: '2', minWidth: '200px' }}>
                    <label className="adm-label">Reason (optional)</label>
                    <input type="text" className="adm-input" placeholder="Holiday, personal, etc." value={blockingReason} onChange={e => setBlockingReason(e.target.value)} />
                  </div>
                  <button className="adm-btn adm-btn-danger" onClick={blockDate}>Block all slots</button>
                </div>
              </div>
            </>
          )}

          {/* ── BOOKINGS ── */}
          {!loading && tab === 'bookings' && (
            <>
              <p className="adm-label" style={{ marginBottom: '1rem' }}>All bookings — {bookings.length} total</p>
              {bookings.map(b => (
                <div key={b.id} className="adm-card" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }} onClick={() => setSelectedBooking(b)}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem' }}>
                      <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.85rem', color: '#E8DDB5', textTransform: 'none' }}>{b.name}</p>
                      <span className={`badge badge-${b.status}`}>{b.status}</span>
                    </div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.4)' }}>
                      {formatDate(b.slot_date)} · {formatTime(b.slot_time)} · {b.service_type} · {b.session_duration}min
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '1rem', color: '#E8DDB5', fontWeight: 300 }}>£{b.session_price}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: 'rgba(245,240,232,0.3)' }}>{b.email}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* ── SLOTS ── */}
          {!loading && tab === 'slots' && (
            <>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'rgba(245,240,232,0.45)', marginBottom: '1.5rem', lineHeight: 1.65 }}>
                Click a slot to toggle it on or off for all future bookings on that day. Blue = available. Add new time slots using the form below.
              </p>

              {DAYS.map(day => {
                const daySlots = slots.filter(s => s.day_of_week === day && !s.specific_date);
                return (
                  <div key={day} className="adm-card" style={{ marginBottom: '2px' }}>
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'capitalize', color: '#A8CAEC', marginBottom: '0.75rem' }}>{day}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {daySlots.length === 0 && (
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.25)' }}>No slots — add one below</p>
                      )}
                      {daySlots.map(slot => (
                        <div key={slot.id} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <button
                            className={`slot-btn ${slot.is_active ? 'active' : 'inactive'}`}
                            onClick={() => toggleSlotActive(slot)}
                            title={slot.is_active ? 'Click to disable' : 'Click to enable'}
                          >
                            {formatTime(slot.slot_time)}
                            <span style={{ fontSize: '0.6rem', opacity: 0.6 }}>{slot.is_active ? '●' : '○'}</span>
                          </button>
                          <button
                            style={{ background: 'rgba(127,29,29,0.3)', border: 'none', color: '#fca5a5', cursor: 'pointer', padding: '0.5rem 0.4rem', fontSize: '0.65rem', lineHeight: 1 }}
                            onClick={() => deleteSlot(slot)}
                            title="Delete slot"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Add new slot */}
              <div className="adm-card" style={{ marginTop: '1rem' }}>
                <p className="adm-label" style={{ marginBottom: '1rem' }}>Add a new slot</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                  <div>
                    <label className="adm-label">Day</label>
                    <select className="adm-select" value={newSlotDay} onChange={e => setNewSlotDay(e.target.value)}>
                      {DAYS.map(d => <option key={d} value={d} style={{ textTransform: 'capitalize' }}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="adm-label">Time (24hr)</label>
                    <input type="time" className="adm-input" style={{ width: '140px' }} value={newSlotTime} onChange={e => setNewSlotTime(e.target.value)} />
                  </div>
                  <button className="adm-btn adm-btn-primary" onClick={addSlot}>Add slot</button>
                </div>
              </div>
            </>
          )}

          {/* ── VOUCHERS ── */}
          {!loading && tab === 'vouchers' && (
            <>
              <p className="adm-label" style={{ marginBottom: '1rem' }}>
                Gift vouchers — {vouchers.length} total · {vouchers.filter(v => v.status === 'unused').length} unredeemed
              </p>
              {vouchers.map(v => (
                <div key={v.id} className="adm-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem' }}>
                      <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#E8DDB5', letterSpacing: '0.05em' }}>{v.code}</p>
                      <span className={`badge badge-${v.status}`}>{v.status}</span>
                    </div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,240,232,0.4)' }}>
                      {v.occasion} · {v.session_type} · From {v.buyer_name}{v.recipient_name ? ` → ${v.recipient_name}` : ''}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: 'rgba(245,240,232,0.25)', marginTop: '0.2rem' }}>
                      Expires {new Date(v.expires_at).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '1rem', color: '#E8DDB5', fontWeight: 300 }}>£{v.session_price}</p>
                    {v.status === 'unused' && <button className="adm-btn adm-btn-danger" onClick={() => revokeVoucher(v.id)}>Revoke</button>}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Booking modal */}
      {selectedBooking && (
        <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <p className="adm-label" style={{ marginBottom: '0.3rem' }}>Booking details</p>
                <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.2rem', color: '#E8DDB5', textTransform: 'none' }}>{selectedBooking.name}</h2>
              </div>
              <span className={`badge badge-${selectedBooking.status}`}>{selectedBooking.status}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                ['Date', formatDate(selectedBooking.slot_date)],
                ['Time', formatTime(selectedBooking.slot_time)],
                ['Service', selectedBooking.service_type],
                ['Duration', `${selectedBooking.session_duration} minutes`],
                ['People', String(selectedBooking.people_count)],
                ['Price', `£${selectedBooking.session_price}`],
                ['Email', selectedBooking.email],
                ['Phone', selectedBooking.phone],
                ['Voucher', selectedBooking.voucher_code || 'None — paid by card'],
                ['Notes', selectedBooking.notes || 'None'],
                ['Booked', new Date(selectedBooking.created_at).toLocaleDateString('en-GB')],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(168,202,236,0.06)', paddingBottom: '0.5rem' }}>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A8CAEC', width: '80px', flexShrink: 0 }}>{label}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(245,240,232,0.7)' }}>{value}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <a href={`mailto:${selectedBooking.email}`} className="adm-btn adm-btn-ghost" style={{ textDecoration: 'none' }}>Email</a>
              <a href={`tel:${selectedBooking.phone}`} className="adm-btn adm-btn-ghost" style={{ textDecoration: 'none' }}>Call</a>
              {selectedBooking.status === 'confirmed' && <button className="adm-btn adm-btn-danger" onClick={() => cancelBooking(selectedBooking.id)}>Cancel booking</button>}
              <button className="adm-btn adm-btn-ghost" onClick={() => setSelectedBooking(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {actionMsg && <div className="action-msg">{actionMsg}</div>}
    </>
  );
}