'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PLANS } from '@/lib/stripe';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true); setError('');
    const res = await fetch('/api/auth/register', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ name:form.name, email:form.email, password:form.password }) });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? 'Registration failed.'); setLoading(false); return; }
    await signIn('credentials', { email:form.email, password:form.password, redirect:false });
    router.push('/settings');
  }

  return (
    <div style={{ minHeight:'calc(100vh - 64px)', display:'grid', gridTemplateColumns:'1fr 1fr', background:'var(--navy)' }} className="register-grid">
      {/* Left: form */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'3rem 2rem', position:'relative' }}>
        <div style={{ position:'absolute', top:'20%', left:'30%', width:'24rem', height:'24rem', background:'radial-gradient(ellipse, rgba(123,31,162,0.12) 0%, transparent 65%)', pointerEvents:'none' }} />

        <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:'400px' }}>
          <div style={{ marginBottom:'2rem' }}>
            <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:'8px', textDecoration:'none', marginBottom:'1.5rem' }}>
              <div style={{ width:'30px', height:'30px', borderRadius:'8px', background:'linear-gradient(135deg,#7B1FA2,#5CE1E6)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
              <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'0.9rem', color:'#fff' }}>OilGas Nanobot</span>
            </Link>
            <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.75rem', color:'#fff', marginBottom:'0.4rem' }}>Create your account</h1>
            <p style={{ color:'rgba(232,232,240,0.5)', fontSize:'0.875rem' }}>Start with a free trial. No credit card required.</p>
          </div>

          <div style={{ background:'rgba(13,10,46,0.8)', border:'1px solid rgba(92,225,230,0.12)', borderRadius:'1.25rem', padding:'1.75rem', backdropFilter:'blur(20px)' }}>
            {error && <div style={{ marginBottom:'1rem', padding:'0.75rem 1rem', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.25)', borderRadius:'0.625rem', fontSize:'0.82rem', color:'#fca5a5' }}>{error}</div>}
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
              {[['name','Full name','text','Jane Smith',false],['email','Work email','email','you@company.com',true],['password','Password','password','Min 8 characters',true],['confirm','Confirm password','password','Repeat password',true]].map(([k,l,t,p,req]) => (
                <div key={k as string}>
                  <label style={{ display:'block', fontSize:'0.75rem', fontWeight:600, color:'rgba(232,232,240,0.65)', marginBottom:'0.35rem' }}>{l as string}</label>
                  <input type={t as string} required={!!req} value={form[k as keyof typeof form]} onChange={e => setForm(f=>({...f,[k as string]:e.target.value}))} className="input" placeholder={p as string} />
                </div>
              ))}
              <button type="submit" disabled={loading} className="btn-primary" style={{ width:'100%', marginTop:'0.25rem' }}>
                {loading ? 'Creating account…' : 'Create account →'}
              </button>
            </form>
            <p style={{ textAlign:'center', fontSize:'0.78rem', color:'rgba(232,232,240,0.4)', marginTop:'1.25rem' }}>
              Already have an account?{' '}<Link href="/login" style={{ color:'#5CE1E6', textDecoration:'none', fontWeight:600 }}>Sign in</Link>
            </p>
          </div>
          <p style={{ textAlign:'center', fontSize:'0.7rem', color:'rgba(232,232,240,0.2)', marginTop:'1rem' }}>
            By creating an account you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

      {/* Right: plan preview */}
      <div style={{ background:'rgba(13,10,46,0.5)', borderLeft:'1px solid rgba(92,225,230,0.06)', display:'flex', alignItems:'center', justifyContent:'center', padding:'3rem 2rem' }} className="register-right">
        <div style={{ maxWidth:'380px', width:'100%' }}>
          <p style={{ fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--cyan)', fontFamily:'DM Mono,monospace', marginBottom:'1rem' }}>INCLUDED IN PRO</p>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.6rem', color:'#fff', marginBottom:'0.75rem', lineHeight:1.2 }}>Everything you need for modern O&G engineering</h2>
          <p style={{ color:'rgba(232,232,240,0.5)', fontSize:'0.85rem', marginBottom:'2rem', lineHeight:1.6 }}>Full hierarchical AI swarm with Redis memory, scheduled teams, and priority AI backend.</p>
          <ul style={{ listStyle:'none', padding:0, margin:0 }}>
            {Object.values(PLANS).slice(1)[1]?.features.map((f) => (
              <li key={f} style={{ display:'flex', alignItems:'flex-start', gap:'10px', marginBottom:'0.75rem' }}>
                <div style={{ width:'20px', height:'20px', borderRadius:'5px', background:'rgba(92,225,230,0.1)', border:'1px solid rgba(92,225,230,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'1px' }}>
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#5CE1E6" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
                <span style={{ fontSize:'0.85rem', color:'rgba(232,232,240,0.7)', lineHeight:1.5 }}>{f}</span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop:'2rem', padding:'1rem 1.25rem', borderRadius:'0.75rem', background:'rgba(92,225,230,0.06)', border:'1px solid rgba(92,225,230,0.1)', fontSize:'0.78rem', color:'rgba(232,232,240,0.5)', lineHeight:1.6 }}>
            <span style={{ color:'#5CE1E6', fontWeight:600 }}>Free trial:</span> 14 days, then choose your plan. Cancel anytime.
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.register-grid{grid-template-columns:1fr!important;}.register-right{display:none!important;}}`}</style>
    </div>
  );
}
