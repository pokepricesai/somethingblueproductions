// Replace the existing handleRedeemBooking function in src/app/book/page.tsx with this:

async function handleRedeemBooking() {
  if (!redeemedVoucher) return;
  setLoading(true);
  setError('');
  try {
    // 1. Save booking to Supabase
    const { error: dbError } = await supabase.from('bookings').insert({
      name: redeemBooking.name,
      email: redeemBooking.email,
      phone: redeemBooking.phone,
      service_type: redeemedVoucher.session_type,
      people_count: redeemedVoucher.session_duration === 60 ? 3 : 1,
      session_duration: redeemedVoucher.session_duration,
      session_price: 0,
      slot_date: redeemBooking.date,
      slot_time: redeemBooking.time,
      voucher_code: redeemedVoucher.code,
      notes: redeemBooking.notes,
      status: 'confirmed',
    });
    if (dbError) throw dbError;

    // 2. Mark voucher as used
    const { error: voucherError } = await supabase
      .from('vouchers')
      .update({ status: 'used', redeemed_at: new Date().toISOString() })
      .eq('id', redeemedVoucher.id);
    if (voucherError) throw voucherError;

    // 3. Send confirmation emails
    await fetch('/api/send-redeem-confirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: redeemBooking.name,
        email: redeemBooking.email,
        phone: redeemBooking.phone,
        date: redeemBooking.date,
        time: redeemBooking.time,
        notes: redeemBooking.notes,
        voucher: redeemedVoucher,
      }),
    });

    setRedeemStep('confirm');
  } catch {
    setError('Something went wrong. Please try again or contact us.');
  }
  setLoading(false);
}