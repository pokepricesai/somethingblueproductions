'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://knwyfoqmlwbxtfhvkbmc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3lmb3FtbHdieHRmaHZrYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjMzMTUsImV4cCI6MjA4OTA5OTMxNX0.er5XEya3170rW6hHyuhCNEKlg2SEk9_YPSOi4nWHb7Y'
);

// ── Helpers ──────────────────────────────────────────────────────────────────

function toLocalDateStr(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

function formatTime(time: string) {
  const [h, m] = time.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'pm' : 'am';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}${m !== '00' ? ':' + m : ''}${ampm}`;
}

function getMondayOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekDays(startDate: Date) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    return d;
  });
}

// Generate every 30-min slot from 09:00 to 21:00
const ALL_TIMES: string[] = [];
for (let h = 9; h <= 21; h++) {
  ALL_TIMES.push(`${String(h).padStart(2, '0')}:00`);
  if (h < 21) ALL_TIMES.push(`${String(h).padStart(2, '0')}:30`);
}

const DAYS_OF_WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const SERVICE_COLOURS: Record<string, string> = {
  couple: '#1B3A5C',
  maternity: '#5c3a5c',
  newborn: '#5c3a2c',
  family: '#2c5c2c',
  headshots: '#2c2c5c',
};

// ── Types ─────────────────────────────────────────────────────────────────────

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

interface DefaultSlot {
  id: number;
  day_of_week: string;
  slot_time: string;
  is_active: boolean;
}

// An override is a specific date+time that is either added or blocked
interface SlotOverride {
  id: number;
  slot_date: string;
  slot_time: string;
  type: 'added' | 'blocked'; // added = made available, blocked = removed
}

interface Voucher {
  id: number;
  code: string;
  occasion: string;
  session_type: string;
  buyer_name: string;
  buyer_email: string;
  recipient_name: string;
  status: string;
  expires_at: string;
  created_at: string;
  session_price: number;
}

type Tab = 'calendar' | 'bookings' | 'slots' | 'vouchers';

// ── Slot status for a given date+time ────────────────────────────────────────
type SlotStatus = 'available' | 'blocked' | 'booked' | 'empty';

// ── Component ─────────────────────────────────────────────────────────────────

export default function AdminBookingsPage() {
  const [tab, setTab] = useState<Tab>('calendar');
  const [weekStart, setWeekStart] = useState(() => getMondayOfWeek(new Date()));
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [defaultSlots, setDefaultSlots] = useState<DefaultSlot[]>([]);
  const [overrides, setOverrides] = useState<SlotOverride[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState('');
  const [newSlotDay, setNewSlotDay] = useState('tuesday');
  const [newSlotTime, setNewSlotTime] = useState('');

  const weekDays = getWeekDays(weekStart);

  // ── Fetch ──────────────────────────────────────────────────────────────────

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [{ data: b }, { data: ds }, { data: ov }, { data: v }] = await Promise.all([
      supabase.from('bookings').select('*').order('slot_date'),
      supabase.from('availability_slots').select('*').is('specific_date', null),
      supabase.from('slot_overrides').select('*'),
      supabase.from('vouchers').select('*').order('created_at', { ascending: false }),
    ]);
    setBookings(b || []);
    setDefaultSlots((ds || []).map(s => ({ id: s.id, day_of_week: s.day_of_week, slot_time: s.slot_time, is_active: s.is_active })));
    setOverrides(ov || []);
    setVouchers(v || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Slot status logic ──────────────────────────────────────────────────────

  function getSlotStatus(date: Date, time: string): SlotStatus {
    const dateStr = toLocalDateStr(date);
    const dow = date.toLocaleDateString('en-GB', { weekday: 'long' }).toLowerCase();

    // Check for booking
    const hasBooking = bookings.some(b => b.slot_date === dateStr && b.slot_time === time && b.status === 'confirmed');
    if (hasBooking) return 'booked';

    // Check for override
    const override = overrides.find(o => o.slot_date === dateStr && o.slot_time === time);
    if (override) return override.type === 'blocked' ? 'blocked' : 'available';

    // Check default
    const defaultSlot = defaultSlots.find(s => s.day_of_week === dow && s.slot_time === time && s.is_active);
    if (defaultSlot) return 'available';

    return 'empty';
  }

  function getBookingForSlot(date: Date, time: string): Booking | undefined {
    const dateStr = toLocalDateStr(date);
    return bookings.find(b => b.slot_date === dateStr && b.slot_time === time && b.status === 'confirmed');
  }

  // ── Actions ────────────────────────────────────────────────────────────────

  function showMsg(msg: string) {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(''), 2500);
  }

  async function toggleCalendarSlot(date: Date, time: string) {
    const dateStr = toLocalDateStr(date);
    const status = getSlotStatus(date, time);
    if (status === 'booked') return;

    const existing = overrides.find(o => o.slot_date === dateStr && o.slot_time === time);

    if (status === 'available') {
      // Block it
      if (existing) {
        // Update override to blocked
        await supabase.from('slot_overrides').update({ type: 'blocked' }).eq('id', existing.id);
      } else {
        // Insert blocked override
        await supabase.from('slot_overrides').insert({ slot_date: dateStr, slot_time: time, type: 'blocked' });
      }
      showMsg(`${formatTime(time)} on ${dateStr} blocked`);
    } else {
      // Make available (empty or blocked)
      if (existing) {
        // Update to added
        await supabase.from('slot_overrides').update({ type: 'added' }).eq('id', existing.id);
      } else {
        // Insert added override
        await supabase.from('slot_overrides').insert({ slot_date: dateStr, slot_time: time, type: 'added' });
      }
      showMsg(`${formatTime(time)} on ${dateStr} added`);
    }

    await fetchAll();
  }

  async function blockWholeDay(date: Date) {
    const dateStr = toLocalDateStr(date);
    const dow = date.toLocaleDateString('en-GB', { weekday: 'long' }).toLowerCase();

    // Get all times that are currently available on this day
    const timesToBlock = ALL_TIMES.filter(time => {
      const status = getSlotStatus(date, time);
      return status === 'available';
    });

    for (const time of timesToBlock) {
      const existing = overrides.find(o => o.slot_date === dateStr && o.slot_time === time);
      if (existing) {
        await supabase.from('slot_overrides').update({ type: 'blocked' }).eq('id', existing.id);
      } else {
        await supabase.from('slot_overrides').insert({ slot_date: dateStr, slot_time: time, type: 'blocked' });
      }
    }

    showMsg(`${dateStr} blocked (${timesToBlock.length} slots)`);
    await fetchAll();
  }

  async function toggleDefaultSlot(slot: DefaultSlot) {
    const newVal = !slot.is_active;
    await supabase.from('availability_slots').update({ is_active: newVal }).eq('id', slot.id);
    setDefaultSlots(prev => prev.map(s => s.id === slot.id ? { ...s, is_active: newVal } : s));
    showMsg(`${slot.day_of_week} ${formatTime(slot.slot_time)} ${newVal ? 'enabled' : 'disabled'}`);
  }

  async function addDefaultSlot() {
    if (!newSlotTime) return;
    const time = newSlotTime.length === 5 ? newSlotTime : newSlotTime + ':00';
    const { error } = await supabase.from('availability_slots').insert({
      day_of_week: newSlotDay,
      slot_time: time,
      is_active: true,
    });
    if (error) { showMsg('Error — slot may already exist'); return; }
    showMsg(`Added ${formatTime(time)} on ${newSlotDay}`);
    setNewSlotTime('');
    fetchAll();
  }

  async function deleteDefaultSlot(id: number) {
    if (!confirm('Delete this default slot?')) return;
    await supabase.from('availability_slots').delete().eq('id', id);
    setDefaultSlots(prev => prev.filter(s => s.id !== id));
    showMsg('Slot deleted');
  }

  async function cancelBooking(id: number) {
    if (!confirm('Cancel this booking?')) return;
    await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', id);
    setSelectedBooking(null);
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
    showMsg('Booking cancelled');
  }

  async function revokeVoucher(id: number) {
    if (!confirm('Revoke this voucher?')) return;
    await supabase.from('vouchers').update({ status: 'revoked' }).eq('id', id);
    setVouchers(prev => prev.map(v => v.id === id ? { ...v, status: 'revoked' } : v));
    showMsg('Voucher revoked');
  }

  // ── Stats ──────────────────────────────────────────────────────────────────

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const upcomingBookings = bookings.filter(b => new Date(b.slot_date + 'T12:00:00') >= today && b.status === 'confirmed');
  const weekRevenue = upcomingBookings
    .filter(b => weekDays.some(d => toLocalDateStr(d) === b.slot_date))
    .reduce((sum, b) => sum + b.session_price, 0);

  // Only show times that have at least one available/booked slot across the visible week
  const visibleTimes = ALL_TIMES.filter(time =>
    weekDays.some(d => getSlotStatus(d, time) !== 'empty')
  );

  // ── Cell colours ───────────────────────────────────────────────────────────

  function cellStyle(status: SlotStatus, isPast: boolean) {
    const base: React.CSSProperties = {
      padding: '0.3rem',
      minHeight: '40px',
      cursor: isPast || status === 'booked' ? 'default' : 'pointer',
      opacity: isPast ? 0.45 : 1,
      transition: 'background 0.12s',
      position: 'relative',
    };
    if (status === 'booked') return { ...base, background: '#dbeafe' };
    if (status === 'available') return { ...base, background: '#dcfce7' };
    if (status === 'blocked') return { ...base, background: '#fee2e2' };
    return { ...base, background: '#F5F0E8', cursor: isPast ? 'default' : 'pointer' };
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        .adm { min-height: 100vh; background: #F5F0E8; font-family: 'Inter', sans-serif; padding-top: 80px; }
        .adm-header { background: #fff; border-bottom: 1px solid #DDD5C0; padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between; }
        .adm-tabs { display: flex; gap: 2px; padding: 1rem 2rem 0; background: #F5F0E8; overflow-x: auto; }
        .adm-tab { font-family: 'Carose', sans-serif; font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase; padding: 0.6rem 1.2rem; background: transparent; border: 1px solid #DDD5C0; color: #9E9282; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .adm-tab.active { background: #1B3A5C; border-color: #1B3A5C; color: #F5F0E8; }
        .adm-tab:hover:not(.active) { border-color: #1B3A5C; color: #1B3A5C; }
        .adm-body { padding: 1.5rem 2rem 4rem; }
        .adm-card { background: #fff; border: 1px solid #DDD5C0; padding: 1.5rem; margin-bottom: 2px; }
        .adm-btn { font-family: 'Carose', sans-serif; font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.5rem 1rem; border: none; cursor: pointer; transition: opacity 0.2s; }
        .adm-btn-primary { background: #1B3A5C; color: #F5F0E8; }
        .adm-btn-danger { background: #991b1b; color: #fff; }
        .adm-btn-ghost { background: #fff; color: #1B3A5C; border: 1px solid #DDD5C0; }
        .adm-btn:hover { opacity: 0.8; }
        .adm-input { background: #FAF8F2; border: 1px solid #DDD5C0; color: #2C2820; padding: 0.6rem 0.85rem; font-family: 'Inter', sans-serif; font-size: 0.82rem; outline: none; width: 100%; box-sizing: border-box; }
        .adm-input:focus { border-color: #1B3A5C; }
        .adm-select { background: #FAF8F2; border: 1px solid #DDD5C0; color: #2C2820; padding: 0.6rem 0.85rem; font-family: 'Inter', sans-serif; font-size: 0.82rem; outline: none; cursor: pointer; }
        .adm-label { font-family: 'Carose', sans-serif; font-size: 0.58rem; letter-spacing: 0.15em; text-transform: uppercase; color: #9E9282; display: block; margin-bottom: 0.4rem; }
        .cal-wrap { overflow-x: auto; border: 1px solid #DDD5C0; }
        .cal-grid { display: grid; gap: 1px; background: #DDD5C0; }
        .cal-header-cell { background: #1B3A5C; padding: 0.6rem 0.4rem; text-align: center; }
        .cal-time-cell { background: #E8DDB5; padding: 0.3rem 0.5rem; display: flex; align-items: center; justify-content: flex-end; border-right: 1px solid #DDD5C0; }
        .cal-cell-available:hover { background: #bbf7d0 !important; }
        .cal-cell-empty:hover { background: #e0f2fe !important; outline: 2px dashed #0284c7; }
        .cal-cell-blocked:hover { background: #fecaca !important; }
        .booking-chip { padding: 0.25rem 0.4rem; cursor: pointer; }
        .booking-chip:hover { opacity: 0.8; }
        .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; margin-bottom: 1.5rem; }
        .stat-card { background: #fff; border: 1px solid #DDD5C0; padding: 1.2rem 1.5rem; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 50; display: flex; align-items: center; justify-content: center; padding: 1rem; }
        .modal { background: #fff; border: 1px solid #DDD5C0; padding: 2rem; max-width: 480px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
        .badge { display: inline-block; font-family: 'Carose', sans-serif; font-size: 0.55rem; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.2rem 0.5rem; }
        .badge-confirmed { background: #dcfce7; color: #166534; }
        .badge-cancelled { background: #fee2e2; color: #991b1b; }
        .badge-unused { background: #dbeafe; color: #1e40af; }
        .badge-used { background: #dcfce7; color: #166534; }
        .badge-revoked { background: #fee2e2; color: #991b1b; }
        .slot-btn { font-family: 'Carose', sans-serif; font-size: 0.62rem; letter-spacing: 0.1em; padding: 0.45rem 0.8rem; border: 1px solid; cursor: pointer; transition: all 0.15s; display: inline-flex; align-items: center; gap: 0.35rem; }
        .slot-btn-on { background: #1B3A5C; border-color: #1B3A5C; color: #F5F0E8; }
        .slot-btn-off { background: #F5F0E8; border-color: #DDD5C0; color: #9E9282; }
        .action-msg { position: fixed; bottom: 2rem; right: 2rem; background: #1B3A5C; color: #F5F0E8; padding: 0.75rem 1.5rem; font-family: 'Carose', sans-serif; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; z-index: 100; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        @media (max-width: 900px) {
          .stat-grid { grid-template-columns: 1fr 1fr; }
          .adm-body { padding: 1rem; }
        }
      `}</style>

      <div className="adm">

        {/* Header */}
        <div className="adm-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="/admin" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none' }}>← Admin</a>
            <h1 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1rem', color: '#1B3A5C', textTransform: 'none' }}>Bookings & Calendar</h1>
          </div>
          <a href="/" style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282', textDecoration: 'none' }}>← Site</a>
        </div>

        {/* Tabs */}
        <div className="adm-tabs">
          {(['calendar', 'bookings', 'slots', 'vouchers'] as Tab[]).map(t => (
            <button key={t} className={`adm-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>

        <div className="adm-body">
          {loading && <p style={{ color: '#9E9282', fontSize: '0.82rem' }}>Loading...</p>}

          {/* ── CALENDAR ── */}
          {!loading && tab === 'calendar' && (
            <>
              {/* Stats */}
              <div className="stat-grid">
                {[
                  { label: 'This week', value: upcomingBookings.filter(b => weekDays.some(d => toLocalDateStr(d) === b.slot_date)).length, sub: 'bookings' },
                  { label: 'Week revenue', value: `£${weekRevenue}`, sub: 'confirmed' },
                  { label: 'Upcoming total', value: upcomingBookings.length, sub: 'sessions' },
                  { label: 'Vouchers', value: vouchers.filter(v => v.status === 'unused').length, sub: 'unredeemed' },
                ].map(s => (
                  <div key={s.label} className="stat-card">
                    <p className="adm-label">{s.label}</p>
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '1.8rem', color: '#1B3A5C', fontWeight: 300 }}>{s.value}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#9E9282' }}>{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Week nav */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <button className="adm-btn adm-btn-ghost" onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate() - 7); setWeekStart(d); }}>← Prev</button>
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1B3A5C' }}>
                  {toLocalDateStr(weekStart)} — {toLocalDateStr(weekDays[6])}
                </p>
                <button className="adm-btn adm-btn-ghost" onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate() + 7); setWeekStart(d); }}>Next →</button>
                <button className="adm-btn adm-btn-ghost" onClick={() => setWeekStart(getMondayOfWeek(new Date()))}>Today</button>
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {[
                  { bg: '#dcfce7', label: 'Available — click to block' },
                  { bg: '#fee2e2', label: 'Blocked — click to unblock' },
                  { bg: '#dbeafe', label: 'Booked' },
                  { bg: '#F5F0E8', border: '2px dashed #0284c7', label: 'Empty — click to add' },
                ].map(l => (
                  <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '14px', height: '14px', background: l.bg, border: l.border || '1px solid #DDD5C0', display: 'inline-block', flexShrink: 0 }} />
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: '#9E9282' }}>{l.label}</p>
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="cal-wrap">
                <div
                  className="cal-grid"
                  style={{ gridTemplateColumns: `64px repeat(7, minmax(90px, 1fr))`, minWidth: '730px' }}
                >
                  {/* Header row */}
                  <div style={{ background: '#E8DDB5' }} />
                  {weekDays.map(d => {
                    const isPast = d < today;
                    const dateStr = toLocalDateStr(d);
                    const isToday = dateStr === toLocalDateStr(new Date());
                    return (
                      <div key={dateStr} className="cal-header-cell" style={{ background: isToday ? '#C8572A' : '#1B3A5C' }}>
                        <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,221,181,0.7)' }}>
                          {d.toLocaleDateString('en-GB', { weekday: 'short' })}
                        </p>
                        <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '1rem', color: '#E8DDB5', fontWeight: 300, opacity: isPast ? 0.5 : 1 }}>
                          {d.getDate()}
                        </p>
                        {!isPast && (
                          <button
                            onClick={() => blockWholeDay(d)}
                            style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.48rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.12)', border: 'none', color: 'rgba(232,221,181,0.6)', cursor: 'pointer', padding: '0.15rem 0.4rem', marginTop: '0.3rem' }}
                            title="Block all slots this day"
                          >
                            Block day
                          </button>
                        )}
                      </div>
                    );
                  })}

                  {/* Time rows — only show times with at least one non-empty slot */}
                  {(visibleTimes.length > 0 ? visibleTimes : ALL_TIMES.slice(0, 10)).map(time => (
                    <div key={`row-${time}`} style={{ display: 'contents' }}>
                      {/* Time label */}
                      <div className="cal-time-cell">
                        <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.58rem', color: '#5c5550', fontWeight: 600, whiteSpace: 'nowrap' }}>
                          {formatTime(time)}
                        </p>
                      </div>
                      {/* Day cells */}
                      {weekDays.map(d => {
                        const isPast = d < today;
                        const status = getSlotStatus(d, time);
                        const booking = status === 'booked' ? getBookingForSlot(d, time) : undefined;
                        const className = `cal-cell-${status}`;
                        return (
                          <div
                            key={`${toLocalDateStr(d)}-${time}`}
                            className={className}
                            style={cellStyle(status, isPast)}
                            onClick={() => !isPast && toggleCalendarSlot(d, time)}
                            title={
                              isPast ? '' :
                              status === 'booked' ? `${booking?.name} — ${booking?.service_type}` :
                              status === 'available' ? 'Click to block this slot' :
                              status === 'blocked' ? 'Click to unblock' :
                              'Click to add this slot'
                            }
                          >
                            {booking && (
                              <div
                                className="booking-chip"
                                style={{ background: SERVICE_COLOURS[booking.service_type] || '#1B3A5C' }}
                                onClick={e => { e.stopPropagation(); setSelectedBooking(booking); }}
                              >
                                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.55rem', color: '#E8DDB5', lineHeight: 1.3 }}>{booking.name.split(' ')[0]}</p>
                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.52rem', color: 'rgba(232,221,181,0.7)' }}>{booking.service_type}</p>
                              </div>
                            )}
                            {status === 'blocked' && !booking && (
                              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.55rem', color: '#dc2626', padding: '0.1rem 0.2rem' }}>✕</p>
                            )}
                            {status === 'available' && !booking && (
                              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.55rem', color: '#16a34a', padding: '0.1rem 0.2rem' }}>✓</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#9E9282', marginTop: '0.75rem' }}>
                Click any cell to toggle availability for that specific slot. Use "Block day" in the column header to remove all slots on a given day.
              </p>
            </>
          )}

          {/* ── BOOKINGS ── */}
          {!loading && tab === 'bookings' && (
            <>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1rem' }}>
                All bookings — {bookings.length} total
              </p>
              {bookings.length === 0 && <p style={{ color: '#9E9282', fontSize: '0.82rem' }}>No bookings yet.</p>}
              {bookings.map(b => (
                <div key={b.id} className="adm-card" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }} onClick={() => setSelectedBooking(b)}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem' }}>
                      <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.85rem', color: '#1B3A5C', textTransform: 'none' }}>{b.name}</p>
                      <span className={`badge badge-${b.status}`}>{b.status}</span>
                    </div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#9E9282' }}>
                      {formatDate(b.slot_date)} · {formatTime(b.slot_time)} · {b.service_type} · {b.session_duration}min
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '1rem', color: '#1B3A5C', fontWeight: 300 }}>£{b.session_price}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: '#9E9282' }}>{b.email}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* ── SLOTS ── */}
          {!loading && tab === 'slots' && (
            <>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#5c5550', marginBottom: '1.5rem', lineHeight: 1.65 }}>
                This is the default weekly template. Changes here affect all future weeks. To change a specific date, use the Calendar tab.
              </p>
              {DAYS_OF_WEEK.map(day => {
                const daySlots = defaultSlots.filter(s => s.day_of_week === day).sort((a, b) => a.slot_time.localeCompare(b.slot_time));
                return (
                  <div key={day} className="adm-card" style={{ marginBottom: '2px' }}>
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'capitalize', color: '#1B3A5C', marginBottom: '0.75rem', fontWeight: 600 }}>{day}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {daySlots.length === 0 && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#9E9282' }}>No default slots</p>}
                      {daySlots.map(slot => (
                        <div key={slot.id} style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
                          <button
                            className={`slot-btn ${slot.is_active ? 'slot-btn-on' : 'slot-btn-off'}`}
                            onClick={() => toggleDefaultSlot(slot)}
                            title={slot.is_active ? 'Click to disable' : 'Click to enable'}
                          >
                            {formatTime(slot.slot_time)}
                            <span style={{ fontSize: '0.55rem' }}>{slot.is_active ? '●' : '○'}</span>
                          </button>
                          <button
                            onClick={() => deleteDefaultSlot(slot.id)}
                            style={{ background: '#fee2e2', border: 'none', color: '#991b1b', cursor: 'pointer', padding: '0.45rem 0.4rem', fontSize: '0.7rem', lineHeight: 1 }}
                            title="Delete slot"
                          >×</button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className="adm-card" style={{ marginTop: '1rem' }}>
                <p className="adm-label" style={{ marginBottom: '1rem' }}>Add default slot</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                  <div>
                    <label className="adm-label">Day</label>
                    <select className="adm-select" value={newSlotDay} onChange={e => setNewSlotDay(e.target.value)}>
                      {DAYS_OF_WEEK.map(d => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="adm-label">Time (24hr)</label>
                    <input type="time" className="adm-input" style={{ width: '140px' }} value={newSlotTime} onChange={e => setNewSlotTime(e.target.value)} />
                  </div>
                  <button className="adm-btn adm-btn-primary" onClick={addDefaultSlot}>Add slot</button>
                </div>
              </div>
            </>
          )}

          {/* ── VOUCHERS ── */}
          {!loading && tab === 'vouchers' && (
            <>
              <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '1rem' }}>
                Gift vouchers — {vouchers.length} total · {vouchers.filter(v => v.status === 'unused').length} unredeemed
              </p>
              {vouchers.length === 0 && <p style={{ color: '#9E9282', fontSize: '0.82rem' }}>No vouchers yet.</p>}
              {vouchers.map(v => (
                <div key={v.id} className="adm-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem' }}>
                      <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.9rem', color: '#1B3A5C', letterSpacing: '0.05em' }}>{v.code}</p>
                      <span className={`badge badge-${v.status}`}>{v.status}</span>
                    </div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#9E9282' }}>
                      {v.occasion} · {v.session_type} · From {v.buyer_name}{v.recipient_name ? ` → ${v.recipient_name}` : ''}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: '#9E9282', marginTop: '0.2rem' }}>
                      Expires {new Date(v.expires_at).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '1rem', color: '#1B3A5C', fontWeight: 300 }}>£{v.session_price}</p>
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
                <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E9282', marginBottom: '0.3rem' }}>Booking details</p>
                <h2 style={{ fontFamily: "'Carose', sans-serif", fontWeight: 300, fontSize: '1.2rem', color: '#1B3A5C', textTransform: 'none' }}>{selectedBooking.name}</h2>
              </div>
              <span className={`badge badge-${selectedBooking.status}`}>{selectedBooking.status}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {[
                ['Date', formatDate(selectedBooking.slot_date)],
                ['Time', formatTime(selectedBooking.slot_time)],
                ['Service', selectedBooking.service_type],
                ['Duration', `${selectedBooking.session_duration} min`],
                ['People', String(selectedBooking.people_count)],
                ['Price', `£${selectedBooking.session_price}`],
                ['Email', selectedBooking.email],
                ['Phone', selectedBooking.phone],
                ['Voucher', selectedBooking.voucher_code || 'Paid by card'],
                ['Notes', selectedBooking.notes || 'None'],
                ['Booked on', new Date(selectedBooking.created_at).toLocaleDateString('en-GB')],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #DDD5C0', paddingBottom: '0.5rem' }}>
                  <p style={{ fontFamily: "'Carose', sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9E9282', width: '80px', flexShrink: 0 }}>{label}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#2C2820' }}>{value}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <a href={`mailto:${selectedBooking.email}`} className="adm-btn adm-btn-ghost" style={{ textDecoration: 'none' }}>Email</a>
              <a href={`tel:${selectedBooking.phone}`} className="adm-btn adm-btn-ghost" style={{ textDecoration: 'none' }}>Call</a>
              {selectedBooking.status === 'confirmed' && (
                <button className="adm-btn adm-btn-danger" onClick={() => cancelBooking(selectedBooking.id)}>Cancel booking</button>
              )}
              <button className="adm-btn adm-btn-ghost" onClick={() => setSelectedBooking(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {actionMsg && <div className="action-msg">{actionMsg}</div>}
    </>
  );
}