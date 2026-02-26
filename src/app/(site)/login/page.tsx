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
    if (res?.error) { setError('Invalid credentials. Check your email and password.'); return; }
    router.push(callbackUrl);
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Left panel */}
      <div style={{ flex: '0 0 50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 2.5rem', position: 'relative' }} className="login-left">

        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(0,200,204,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,204,0.035) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)',
        }} />
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: '20rem', height: '20rem', background: 'radial-gradient(ellipse, rgba(232,160,32,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '400px' }}>

          {/* Back link */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-3)', textDecoration: 'none', letterSpacing: '0.05em', marginBottom: '2.5rem', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--amber)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}>
            ← BACK TO HOME
          </Link>

          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', color: 'var(--teal)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>// AUTHENTICATION</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.25rem', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
              WELCOME<br />BACK
            </h1>
            <p style={{ color: 'var(--text-3)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Access your engineering platform</p>
          </div>

          {/* Card */}
          <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem' }}>
            {error && (
              <div style={{ marginBottom: '1.25rem', padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#fca5a5', letterSpacing: '0.02em' }}>
                ✗ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Email address</label>
                <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-field" placeholder="engineer@company.com" />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Password</label>
                <input type="password" required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="input-field" placeholder="••••••••••" />
              </div>
              <button type="submit" disabled={loading} className="btn-amber" style={{ width: '100%', marginTop: '0.5rem', fontSize: '0.875rem' }}>
                {loading ? 'AUTHENTICATING...' : 'SIGN IN →'}
              </button>
            </form>

            <div style={{ margin: '1.25rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-3)', letterSpacing: '0.05em' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-3)', letterSpacing: '0.03em' }}>
              NO ACCOUNT?{' '}
              <Link href="/register" style={{ color: 'var(--amber)', textDecoration: 'none' }}>CREATE ONE FREE</Link>
            </p>
          </div>

          <p style={{ marginTop: '1.25rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-3)', letterSpacing: '0.04em' }}>
            🔒 ENCRYPTED · SECURE · GDPR COMPLIANT
          </p>
        </div>
      </div>

      {/* Right panel — decorative */}
      <div style={{ flex: '0 0 50%', background: 'var(--bg-1)', borderLeft: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }} className="login-right">
        <div style={{ maxWidth: '380px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--teal)', textTransform: 'uppercase', marginBottom: '1rem' }}>// LIVE SYSTEM STATUS</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              ['Gateway API', 'OPERATIONAL', 'var(--green)'],
              ['Ollama Cloud', 'OPERATIONAL', 'var(--green)'],
              ['NVIDIA NIM', 'STANDBY', 'var(--amber)'],
              ['Agent Swarm', 'OPERATIONAL', 'var(--green)'],
              ['Eng. Tools', '7 ACTIVE', 'var(--teal)'],
            ].map(([label, status, color]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-2)' }}>{label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color, letterSpacing: '0.06em' }}>● {status}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', padding: '1.25rem', background: 'var(--bg)', border: '1px solid var(--border-lit)', borderRadius: '12px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>RECENT CALCULATION</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-2)', lineHeight: 1.8 }}>
              <div>ECD = 10.5 + 320/(0.052 × 9800)</div>
              <div style={{ color: 'var(--green)', marginTop: '0.25rem' }}>= 11.128 ppg ✓ SAFE</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){.login-right{display:none!important}.login-left{flex:none!important;width:100%!important}}`}</style>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--bg)' }} />}><LoginForm /></Suspense>;
}
