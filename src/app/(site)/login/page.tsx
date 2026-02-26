'use client';
import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') ?? '/settings';
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    const res = await signIn('credentials', { ...form, redirect: false });
    setLoading(false);
    if (res?.error) { setError('Invalid email or password.'); return; }
    router.push(callbackUrl);
  }

  return (
    <div style={{ minHeight:'calc(100vh - 64px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem 1rem', background:'var(--navy)' }}>
      {/* Background glow */}
      <div style={{ position:'fixed', top:'30%', left:'50%', transform:'translateX(-50%)', width:'40rem', height:'30rem', background:'radial-gradient(ellipse, rgba(123,31,162,0.15) 0%, transparent 65%)', pointerEvents:'none', zIndex:0 }} />

      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:'420px' }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'1.25rem' }}>
            <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:'linear-gradient(135deg,#7B1FA2,#5CE1E6)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.1rem', color:'#fff' }}>OilGas Nanobot</span>
          </div>
          <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.75rem', color:'#fff', marginBottom:'0.5rem' }}>Welcome back</h1>
          <p style={{ color:'rgba(232,232,240,0.5)', fontSize:'0.875rem' }}>Sign in to your account</p>
        </div>

        {/* Card */}
        <div style={{ background:'rgba(13,10,46,0.8)', border:'1px solid rgba(92,225,230,0.12)', borderRadius:'1.25rem', padding:'2rem', backdropFilter:'blur(20px)' }}>
          {error && (
            <div style={{ marginBottom:'1rem', padding:'0.75rem 1rem', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.25)', borderRadius:'0.625rem', fontSize:'0.82rem', color:'#fca5a5' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            <div>
              <label style={{ display:'block', fontSize:'0.78rem', fontWeight:600, color:'rgba(232,232,240,0.7)', marginBottom:'0.4rem', fontFamily:'DM Sans,sans-serif' }}>Email</label>
              <input type="email" required value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} className="input" placeholder="you@company.com" />
            </div>
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.4rem' }}>
                <label style={{ fontSize:'0.78rem', fontWeight:600, color:'rgba(232,232,240,0.7)', fontFamily:'DM Sans,sans-serif' }}>Password</label>
              </div>
              <input type="password" required value={form.password} onChange={e => setForm(f=>({...f,password:e.target.value}))} className="input" placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width:'100%', marginTop:'0.5rem' }}>
              {loading ? 'Signing in…' : 'Sign in →'}
            </button>
          </form>

          <div style={{ display:'flex', alignItems:'center', gap:'1rem', margin:'1.5rem 0' }}>
            <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.06)' }} />
            <span style={{ fontSize:'0.72rem', color:'rgba(232,232,240,0.3)' }}>or</span>
            <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.06)' }} />
          </div>

          <p style={{ textAlign:'center', fontSize:'0.82rem', color:'rgba(232,232,240,0.45)' }}>
            No account?{' '}
            <Link href="/register" style={{ color:'#5CE1E6', textDecoration:'none', fontWeight:600 }}>Create one free</Link>
          </p>
        </div>

        {/* Trust */}
        <p style={{ textAlign:'center', fontSize:'0.72rem', color:'rgba(232,232,240,0.25)', marginTop:'1.5rem' }}>
          🔒 Secure sign-in · Your data is encrypted
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense fallback={<div style={{ minHeight:'100vh', background:'var(--navy)' }} />}><LoginForm /></Suspense>;
}
