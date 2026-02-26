import { auth } from '@/lib/auth';
import { getSubscriptionByUserId, getUserById } from '@/lib/db';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { PLANS } from '@/lib/stripe';

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background:'rgba(13,10,46,0.7)', border:'1px solid rgba(92,225,230,0.1)', borderRadius:'1rem', padding:'1.5rem', marginBottom:'1.25rem' }}>
      <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'0.9rem', color:'rgba(232,232,240,0.9)', marginBottom:'1rem', paddingBottom:'0.75rem', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>{title}</h3>
      {children}
    </div>
  );
}

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const [user, sub] = await Promise.all([
    getUserById(session.user.id),
    getSubscriptionByUserId(session.user.id),
  ]);

  const plan = sub?.stripe_price_id ? Object.entries(PLANS).find(([,p]) => p.priceId === sub.stripe_price_id) : null;
  const planName = plan ? plan[1].name : 'No active plan';
  const isActive = sub?.status === 'active' || sub?.status === 'trialing';

  return (
    <div>
      <div style={{ marginBottom:'2rem' }}>
        <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.75rem', color:'#fff', marginBottom:'0.4rem' }}>
          Welcome back, {user?.name?.split(' ')[0] ?? 'there'} 👋
        </h1>
        <p style={{ color:'rgba(232,232,240,0.5)', fontSize:'0.875rem' }}>Manage your account, subscription, and access.</p>
      </div>

      <Card title="Subscription Status">
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'0.4rem' }}>
              <span style={{ width:'8px', height:'8px', borderRadius:'50%', background: isActive ? '#10B981' : '#F59E0B', boxShadow: isActive ? '0 0 8px rgba(16,185,129,0.5)' : 'none' }} />
              <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, color:'#fff', fontSize:'1rem' }}>{planName}</span>
            </div>
            {sub ? (
              <p style={{ fontSize:'0.78rem', color:'rgba(232,232,240,0.45)' }}>
                Status: <span style={{ color: isActive ? '#10B981' : '#F59E0B', fontWeight:600 }}>{sub.status}</span>
                {sub.current_period_end && ` · Renews ${new Date(sub.current_period_end).toLocaleDateString()}`}
              </p>
            ) : (
              <p style={{ fontSize:'0.78rem', color:'rgba(232,232,240,0.45)' }}>No active subscription</p>
            )}
          </div>
          <div style={{ display:'flex', gap:'0.75rem' }}>
            {sub ? (
              <Link href="/settings/billing" style={{ padding:'8px 16px', background:'rgba(92,225,230,0.08)', border:'1px solid rgba(92,225,230,0.2)', borderRadius:'8px', color:'#5CE1E6', fontSize:'0.8rem', fontWeight:600, textDecoration:'none' }}>Manage billing →</Link>
            ) : (
              <Link href="/#pricing" className="btn-primary" style={{ padding:'8px 16px', fontSize:'0.82rem' }}>Choose a plan →</Link>
            )}
          </div>
        </div>
      </Card>

      <Card title="Quick Access">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.75rem' }} className="quick-grid">
          {[
            { icon:'🔬', label:'Reservoir Analysis', href:'https://oilgas-nanobot-swarm.vibecaas.app/#console' },
            { icon:'⚙️', label:'Drilling Tools', href:'https://oilgas-nanobot-swarm.vibecaas.app/#console' },
            { icon:'🏗️', label:'Agent Builder', href:'https://oilgas-nanobot-swarm.vibecaas.app/#builder' },
          ].map(({ icon, label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener" className="quick-link">
              <div style={{ fontSize:'1.25rem', marginBottom:'0.35rem' }}>{icon}</div>
              <div style={{ fontSize:'0.75rem', color:'rgba(232,232,240,0.6)' }}>{label}</div>
            </a>
          ))}
        </div>
      </Card>

      <Card title="Account">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <p style={{ fontWeight:600, color:'#fff', fontSize:'0.875rem' }}>{user?.name ?? 'Not set'}</p>
            <p style={{ fontSize:'0.78rem', color:'rgba(232,232,240,0.45)', marginTop:'2px' }}>{user?.email}</p>
          </div>
          <Link href="/settings/profile" style={{ padding:'7px 14px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', color:'rgba(232,232,240,0.7)', fontSize:'0.78rem', textDecoration:'none' }}>Edit profile</Link>
        </div>
      </Card>

      <style>{`@media(max-width:600px){.quick-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
