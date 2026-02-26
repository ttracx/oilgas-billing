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
    <nav className="sticky top-0 z-50" style={{ background:'rgba(5,0,56,0.85)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(92,225,230,0.1)' }}>
      <div style={{ maxWidth:'80rem', margin:'0 auto', padding:'0 1.5rem', height:'64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem' }}>
        {/* Brand */}
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
          <div style={{ width:'32px', height:'32px', borderRadius:'8px', background:'linear-gradient(135deg,#7B1FA2,#5CE1E6)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1rem', color:'#fff' }}>
            Oil<span style={{ color:'#5CE1E6' }}>Gas</span> Nanobot
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display:'flex', alignItems:'center', gap:'4px' }} className="hidden md:flex">
          {[['/#pricing','Pricing'],['https://oilgas-nanobot-swarm.vibecaas.app/faq','FAQ'],['https://oilgas-nanobot-swarm.vibecaas.app/docs-page','Docs']].map(([href,label]) => (
            <a key={label} href={href as string} style={{ color:'rgba(232,232,240,0.65)', textDecoration:'none', fontSize:'0.875rem', padding:'6px 14px', borderRadius:'8px', transition:'all 0.15s', fontFamily:'DM Sans,sans-serif' }}
               onMouseEnter={e=>(e.currentTarget.style.color='#fff',e.currentTarget.style.background='rgba(255,255,255,0.06)')}
               onMouseLeave={e=>(e.currentTarget.style.color='rgba(232,232,240,0.65)',e.currentTarget.style.background='transparent')}>
              {label}
            </a>
          ))}
          {session ? (
            <>
              <Link href="/settings" style={{ color: pathname.startsWith('/settings') ? '#5CE1E6' : 'rgba(232,232,240,0.65)', textDecoration:'none', fontSize:'0.875rem', padding:'6px 14px', borderRadius:'8px', transition:'all 0.15s' }}>Settings</Link>
              <button onClick={() => signOut({ callbackUrl: '/' })} style={{ color:'rgba(232,232,240,0.65)', background:'none', border:'none', cursor:'pointer', fontSize:'0.875rem', padding:'6px 14px', borderRadius:'8px' }}>Sign out</button>
            </>
          ) : (
            <>
              <Link href="/login" style={{ color:'rgba(232,232,240,0.65)', textDecoration:'none', fontSize:'0.875rem', padding:'6px 14px', borderRadius:'8px' }}>Log in</Link>
              <Link href="/register" className="btn-primary" style={{ padding:'8px 20px', fontSize:'0.82rem' }}>Get started →</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} style={{ display:'none', padding:'8px', background:'none', border:'none', cursor:'pointer', color:'#fff' }} className="mobile-menu-btn">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      <style>{`
        @media(max-width:768px){
          .hidden.md\\:flex { display:none !important; }
          .mobile-menu-btn { display:flex !important; }
        }
      `}</style>
    </nav>
  );
}
