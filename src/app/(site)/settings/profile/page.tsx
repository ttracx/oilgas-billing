'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({ name:'', company:'', role:'' });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (session) {
      fetch('/api/user/profile').then(r=>r.json()).then(d => {
        if (d.user) setForm({ name:d.user.name??'', company:d.user.company??'', role:d.user.role??'' });
      });
    }
  }, [session]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setSaved(false); setError('');
    const res = await fetch('/api/user/profile', { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
    setLoading(false);
    if (res.ok) { setSaved(true); setTimeout(()=>setSaved(false), 3000); }
    else { const d = await res.json(); setError(d.error ?? 'Update failed'); }
  }

  return (
    <div>
      <div style={{ marginBottom:'2rem' }}>
        <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.5rem', color:'#fff', marginBottom:'0.4rem' }}>Profile</h1>
        <p style={{ color:'rgba(232,232,240,0.5)', fontSize:'0.875rem' }}>Update your personal information.</p>
      </div>

      <div style={{ background:'rgba(13,10,46,0.7)', border:'1px solid rgba(92,225,230,0.1)', borderRadius:'1rem', padding:'1.75rem' }}>
        {saved && <div style={{ marginBottom:'1rem', padding:'0.75rem 1rem', background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.25)', borderRadius:'0.625rem', fontSize:'0.82rem', color:'#6ee7b7' }}>✓ Profile saved successfully</div>}
        {error && <div style={{ marginBottom:'1rem', padding:'0.75rem 1rem', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.25)', borderRadius:'0.625rem', fontSize:'0.82rem', color:'#fca5a5' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
          <div>
            <label style={{ display:'block', fontSize:'0.78rem', fontWeight:600, color:'rgba(232,232,240,0.65)', marginBottom:'0.4rem' }}>Email</label>
            <input type="email" disabled value={session?.user?.email ?? ''} className="input" style={{ opacity:0.5, cursor:'not-allowed' }} />
            <p style={{ fontSize:'0.7rem', color:'rgba(232,232,240,0.3)', marginTop:'0.3rem' }}>Email cannot be changed.</p>
          </div>
          {[['name','Full name','text','Jane Smith'],['company','Company','text','Acme Energy'],['role','Job title','text','Senior Reservoir Engineer']].map(([k,l,t,p]) => (
            <div key={k as string}>
              <label style={{ display:'block', fontSize:'0.78rem', fontWeight:600, color:'rgba(232,232,240,0.65)', marginBottom:'0.4rem' }}>{l as string}</label>
              <input type={t as string} value={form[k as keyof typeof form]} onChange={e=>setForm(f=>({...f,[k as string]:e.target.value}))} className="input" placeholder={p as string} />
            </div>
          ))}
          <div style={{ paddingTop:'0.5rem' }}>
            <button type="submit" disabled={loading} className="btn-primary" style={{ minWidth:'140px' }}>
              {loading ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
