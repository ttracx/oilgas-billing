'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true); setError('');
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? 'Registration failed. Please try again.'); setLoading(false); return; }
    await signIn('credentials', { email: form.email, password: form.password, redirect: false });
    router.push('/settings');
  }

  const FEATURES = [
    { icon: '⚡', text: 'Full hierarchical swarm (Queen → L1 → L2)' },
    { icon: '🔬', text: 'Reservoir, drilling, production, HSE, economics' },
    { icon: '🤖', text: 'Agent builder + team builder' },
    { icon: '📊', text: 'Scheduled automated briefings' },
    { icon: '🔒', text: 'Redis memory + knowledge vault' },
    { icon: '📡', text: 'OpenAI-compatible API' },
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--bg)' }} className="register-layout">

      {/* Left: features */}
      <div style={{ background: 'var(--bg-1)', borderRight: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem', position: 'relative', overflow: 'hidden' }} className="register-left">

        {/* Decorative grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(232,160,32,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,160,32,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-5rem', right: '-5rem', width: '30rem', height: '30rem', background: 'radial-gradient(ellipse, rgba(0,200,204,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '380px', width: '100%' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', color: 'var(--amber)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>// WHAT YOU GET WITH PRO</div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.85rem', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.15, marginBottom: '2rem' }}>
            THE COMPLETE<br />
            <span style={{ color: 'var(--amber)' }}>ENGINEERING</span><br />
            INTELLIGENCE SUITE
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {FEATURES.map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.875rem 1rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px' }}>
                <span style={{ fontSize: '1rem', flexShrink: 0 }}>{icon}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.4 }}>{text}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: '1rem 1.25rem', background: 'rgba(232,160,32,0.06)', border: '1px solid rgba(232,160,32,0.2)', borderRadius: '10px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>FREE TRIAL</div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
              14 days, full access, no credit card. Choose your plan after.
            </p>
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 2.5rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '15%', left: '10%', width: '18rem', height: '18rem', background: 'radial-gradient(ellipse, rgba(232,160,32,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '400px' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-3)', textDecoration: 'none', letterSpacing: '0.05em', marginBottom: '2.5rem', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--amber)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}>
            ← BACK TO HOME
          </Link>

          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', color: 'var(--teal)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>// NEW ACCOUNT</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.25rem', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
              CREATE YOUR<br />ACCOUNT
            </h1>
            <p style={{ color: 'var(--text-3)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Start your 14-day free trial. No credit card.</p>
          </div>

          <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem' }}>
            {error && (
              <div style={{ marginBottom: '1.25rem', padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#fca5a5' }}>
                ✗ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                ['name', 'Full name', 'text', 'Jane Smith', false],
                ['email', 'Work email', 'email', 'you@company.com', true],
                ['password', 'Password', 'password', 'Min. 8 characters', true],
                ['confirm', 'Confirm password', 'password', 'Repeat password', true],
              ].map(([k, l, t, p, req]) => (
                <div key={k as string}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{l as string}</label>
                  <input type={t as string} required={!!req} value={form[k as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [k as string]: e.target.value }))}
                    className="input-field" placeholder={p as string} />
                </div>
              ))}

              <button type="submit" disabled={loading} className="btn-amber" style={{ width: '100%', marginTop: '0.5rem', fontSize: '0.875rem' }}>
                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT →'}
              </button>
            </form>

            <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-3)', letterSpacing: '0.03em', marginTop: '1.25rem' }}>
              HAVE AN ACCOUNT?{' '}
              <Link href="/login" style={{ color: 'var(--amber)', textDecoration: 'none' }}>SIGN IN</Link>
            </p>
          </div>

          <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.68rem', color: 'var(--text-3)', lineHeight: 1.6 }}>
            By creating an account you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

      <style>{`@media(max-width:768px){.register-layout{grid-template-columns:1fr!important}.register-left{display:none!important}}`}</style>
    </div>
  );
}
