import { auth } from '@/lib/auth';
import { getSubscriptionByUserId } from '@/lib/db';
import { PLANS } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import BillingActions from './billing-actions';

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const sub = await getSubscriptionByUserId(session.user.id);
  const planEntry = sub?.stripe_price_id
    ? Object.entries(PLANS).find(([,p]) => p.priceId === sub.stripe_price_id)
    : null;
  const plan = planEntry?.[1];
  const isActive = sub?.status === 'active' || sub?.status === 'trialing';

  return (
    <div>
      <div style={{ marginBottom:'2rem' }}>
        <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.5rem', color:'#fff', marginBottom:'0.4rem' }}>Billing</h1>
        <p style={{ color:'rgba(232,232,240,0.5)', fontSize:'0.875rem' }}>Manage your subscription and payment details.</p>
      </div>

      {/* Current plan */}
      <div style={{ background:'rgba(13,10,46,0.7)', border:'1px solid rgba(92,225,230,0.1)', borderRadius:'1rem', padding:'1.5rem', marginBottom:'1.25rem' }}>
        <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'0.9rem', color:'rgba(232,232,240,0.9)', marginBottom:'1.25rem', paddingBottom:'0.75rem', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>Current Plan</h3>

        {sub && plan ? (
          <div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem', marginBottom:'1.25rem' }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                  <span style={{ width:'8px', height:'8px', borderRadius:'50%', background: isActive ? '#10B981' : '#F59E0B', boxShadow: isActive ? '0 0 8px rgba(16,185,129,0.5)' : 'none' }} />
                  <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, color:'#fff', fontSize:'1.05rem' }}>{plan.name}</span>
                  <span style={{ padding:'2px 8px', borderRadius:'4px', fontSize:'0.65rem', fontWeight:700, background: isActive ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: isActive ? '#10B981' : '#F59E0B', textTransform:'uppercase' }}>{sub.status}</span>
                </div>
                {sub.current_period_end && (
                  <p style={{ fontSize:'0.78rem', color:'rgba(232,232,240,0.4)', marginTop:'0.35rem' }}>
                    {sub.cancel_at_period_end ? '⚠️ Cancels' : 'Renews'} on {new Date(sub.current_period_end).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}
                  </p>
                )}
              </div>
              <div style={{ display:'flex', alignItems:'baseline', gap:'4px' }}>
                <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.5rem', color:'#fff' }}>${plan.price.toLocaleString()}</span>
                <span style={{ fontSize:'0.78rem', color:'rgba(232,232,240,0.4)' }}>/{plan.interval}</span>
              </div>
            </div>
            {sub.stripe_customer_id && <BillingActions customerId={sub.stripe_customer_id} />}
          </div>
        ) : (
          <div style={{ textAlign:'center', padding:'2rem 0' }}>
            <p style={{ color:'rgba(232,232,240,0.45)', marginBottom:'1.25rem', fontSize:'0.875rem' }}>No active subscription. Choose a plan to get started.</p>
            <Link href="/#pricing" className="btn-primary" style={{ fontSize:'0.875rem' }}>View plans →</Link>
          </div>
        )}
      </div>

      {/* Upgrade prompt */}
      {!isActive && (
        <div style={{ background:'rgba(123,31,162,0.08)', border:'1px solid rgba(123,31,162,0.25)', borderRadius:'1rem', padding:'1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <p style={{ fontFamily:'Syne,sans-serif', fontWeight:700, color:'#fff', marginBottom:'0.25rem' }}>Upgrade to Pro</p>
            <p style={{ fontSize:'0.8rem', color:'rgba(232,232,240,0.5)' }}>Get full hierarchical swarm, Redis memory, and scheduled teams.</p>
          </div>
          <Link href="/#pricing" className="btn-primary" style={{ fontSize:'0.82rem', padding:'10px 20px' }}>Choose plan →</Link>
        </div>
      )}
    </div>
  );
}
