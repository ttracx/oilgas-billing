'use client';
import { useState } from 'react';

export default function BillingActions({ customerId }: { customerId: string }) {
  const [loading, setLoading] = useState(false);
  void customerId;

  async function openPortal() {
    setLoading(true);
    const res = await fetch('/api/billing/portal', { method:'POST' });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setLoading(false);
  }

  return (
    <button onClick={openPortal} disabled={loading}
      style={{ padding:'9px 18px', background:'rgba(92,225,230,0.08)', border:'1px solid rgba(92,225,230,0.2)', borderRadius:'8px', color:'#5CE1E6', fontSize:'0.82rem', fontWeight:600, cursor:'pointer', transition:'all 0.15s' }}>
      {loading ? 'Opening…' : '→ Manage billing in Stripe'}
    </button>
  );
}
