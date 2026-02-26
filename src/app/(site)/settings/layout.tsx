'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href:'/settings', label:'Overview', icon:'◈' },
  { href:'/settings/profile', label:'Profile', icon:'◎' },
  { href:'/settings/billing', label:'Billing', icon:'◉' },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div style={{ minHeight:'calc(100vh - 64px)', background:'var(--navy)' }}>
      <div style={{ maxWidth:'72rem', margin:'0 auto', padding:'2.5rem 1.5rem', display:'grid', gridTemplateColumns:'220px 1fr', gap:'2.5rem' }} className="settings-layout">
        {/* Sidebar */}
        <aside>
          <p style={{ fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(232,232,240,0.3)', marginBottom:'0.75rem', fontFamily:'DM Mono,monospace' }}>ACCOUNT</p>
          <nav style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
            {LINKS.map(({ href, label, icon }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href} style={{
                  display:'flex', alignItems:'center', gap:'10px', padding:'9px 12px',
                  borderRadius:'8px', textDecoration:'none', fontSize:'0.875rem',
                  fontFamily:'DM Sans,sans-serif', fontWeight: active ? 600 : 400,
                  color: active ? '#5CE1E6' : 'rgba(232,232,240,0.6)',
                  background: active ? 'rgba(92,225,230,0.06)' : 'transparent',
                  borderLeft: active ? '2px solid #5CE1E6' : '2px solid transparent',
                  transition:'all 0.15s',
                }}>
                  <span style={{ fontSize:'1rem' }}>{icon}</span>
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <div>{children}</div>
      </div>
      <style>{`@media(max-width:768px){.settings-layout{grid-template-columns:1fr!important;gap:1rem!important;}}`}</style>
    </div>
  );
}
