'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

export function Nav() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(7,7,10,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        height: '64px', display: 'flex', alignItems: 'center', padding: '0 1.5rem',
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>

          {/* Brand */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--amber)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: '#fff', letterSpacing: '0.02em', lineHeight: 1 }}>
                OILGAS NANOBOT
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.1em', lineHeight: 1, marginTop: '2px' }}>
                PRO PLATFORM
              </div>
            </div>
          </Link>

          {/* Desktop */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="nav-desktop">
            {[['/#pricing', 'Pricing'], ['https://oilgas-nanobot-swarm.vibecaas.app', 'Demo'], ['https://oilgas-nanobot-swarm.vibecaas.app/docs-page', 'Docs']].map(([href, label]) => (
              <a key={label} href={href} style={{ fontFamily: 'var(--font-body)', color: 'rgba(240,240,248,0.55)', textDecoration: 'none', fontSize: '0.875rem', padding: '6px 14px', borderRadius: '8px', transition: 'all 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff', e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,240,248,0.55)', e.currentTarget.style.background = 'transparent')}>
                {label}
              </a>
            ))}

            <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 8px' }} />

            {session ? (
              <>
                <Link href="/settings" style={{ fontFamily: 'var(--font-body)', color: pathname.startsWith('/settings') ? 'var(--amber)' : 'rgba(240,240,248,0.55)', textDecoration: 'none', fontSize: '0.875rem', padding: '6px 14px', borderRadius: '8px' }}>
                  Dashboard
                </Link>
                <button onClick={() => signOut({ callbackUrl: '/' })} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'rgba(240,240,248,0.6)', borderRadius: '8px', padding: '6px 14px', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" style={{ fontFamily: 'var(--font-body)', color: 'rgba(240,240,248,0.55)', textDecoration: 'none', fontSize: '0.875rem', padding: '6px 14px', borderRadius: '8px' }}>
                  Log in
                </Link>
                <Link href="/register" className="btn-amber" style={{ padding: '7px 18px', fontSize: '0.82rem' }}>
                  Get started →
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="nav-mobile-btn" style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', padding: '6px' }}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 99, background: 'var(--bg-1)', borderBottom: '1px solid var(--border)', padding: '1rem 1.5rem' }} className="nav-mobile-menu">
          {[['/#pricing', 'Pricing'], ['https://oilgas-nanobot-swarm.vibecaas.app', 'Demo'], ['https://oilgas-nanobot-swarm.vibecaas.app/docs-page', 'Docs']].map(([href, label]) => (
            <a key={label} href={href} onClick={() => setOpen(false)} style={{ display: 'block', padding: '12px 0', color: 'var(--text-2)', textDecoration: 'none', fontSize: '1rem', borderBottom: '1px solid var(--border)' }}>{label}</a>
          ))}
          {session ? (
            <>
              <Link href="/settings" onClick={() => setOpen(false)} style={{ display: 'block', padding: '12px 0', color: 'var(--text-2)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>Dashboard</Link>
              <button onClick={() => signOut({ callbackUrl: '/' })} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', color: 'var(--text-2)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Sign out</button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <Link href="/login" onClick={() => setOpen(false)} className="btn-ghost" style={{ flex: 1, fontSize: '0.9rem' }}>Log in</Link>
              <Link href="/register" onClick={() => setOpen(false)} className="btn-amber" style={{ flex: 1, fontSize: '0.9rem' }}>Get started</Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media(max-width:768px){
          .nav-desktop { display:none !important; }
          .nav-mobile-btn { display:flex !important; }
        }
      `}</style>
    </>
  );
}
