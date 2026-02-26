import Link from 'next/link';
import { PLANS } from '@/lib/stripe';

/* ── Pricing Card ──────────────────────────────────────────────── */
function PricingCard({ planKey }: { planKey: keyof typeof PLANS }) {
  const plan = PLANS[planKey];
  const isPopular = 'badge' in plan && plan.badge === 'POPULAR';
  const isBest = 'badge' in plan && plan.badge === 'BEST VALUE';
  const highlight = isPopular || isBest;

  return (
    <div style={{
      position:'relative', display:'flex', flexDirection:'column',
      borderRadius:'1.25rem', padding: highlight ? '2rem 1.75rem' : '1.75rem',
      background: highlight ? 'linear-gradient(160deg,#7B1FA2,#4a0072)' : 'rgba(13,10,46,0.8)',
      border: highlight ? '1px solid rgba(123,31,162,0.5)' : '1px solid rgba(92,225,230,0.1)',
      boxShadow: highlight ? '0 0 60px rgba(123,31,162,0.25), inset 0 1px 0 rgba(255,255,255,0.1)' : 'none',
      transform: highlight ? 'scale(1.03)' : 'scale(1)',
      zIndex: highlight ? 1 : 0,
    }}>
      {'badge' in plan && plan.badge && (
        <div style={{
          position:'absolute', top:'-12px', left:'50%', transform:'translateX(-50%)',
          padding:'4px 16px', borderRadius:'99px',
          background: isBest ? '#F59E0B' : '#fff',
          color: isBest ? '#78350f' : '#7B1FA2',
          fontSize:'0.65rem', fontWeight:800, letterSpacing:'0.08em', textTransform:'uppercase',
          fontFamily:'Syne,sans-serif', whiteSpace:'nowrap',
        }}>{plan.badge}</div>
      )}

      <div style={{ marginBottom:'1.25rem' }}>
        <p style={{ fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color: highlight ? 'rgba(255,255,255,0.5)' : 'var(--cyan)', marginBottom:'0.4rem', fontFamily:'DM Mono,monospace' }}>
          {plan.interval === 'one-time' ? 'one-time' : plan.interval}
        </p>
        <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.15rem', color:'#fff' }}>{plan.name}</h3>
        <p style={{ fontSize:'0.8rem', color: highlight ? 'rgba(255,255,255,0.6)' : 'rgba(232,232,240,0.5)', marginTop:'0.25rem' }}>{plan.description}</p>
      </div>

      <div style={{ marginBottom:'1.5rem' }}>
        <div style={{ display:'flex', alignItems:'baseline', gap:'6px' }}>
          <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'2.5rem', color:'#fff' }}>${plan.price.toLocaleString()}</span>
          <span style={{ fontSize:'0.8rem', color: highlight ? 'rgba(255,255,255,0.5)' : 'rgba(232,232,240,0.4)' }}>
            {plan.interval === 'one-time' ? 'once' : `/ ${plan.interval}`}
          </span>
        </div>
        {'pricePerMonth' in plan && (
          <p style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.45)', marginTop:'2px' }}>
            ~${plan.pricePerMonth}/mo — save 40%
          </p>
        )}
      </div>

      <ul style={{ listStyle:'none', padding:0, margin:'0 0 1.75rem', flex:1 }}>
        {plan.features.map((f) => (
          <li key={f} style={{ display:'flex', alignItems:'flex-start', gap:'10px', marginBottom:'10px' }}>
            <svg style={{ flexShrink:0, marginTop:'2px', color: highlight ? '#5CE1E6' : '#5CE1E6' }} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            <span style={{ fontSize:'0.82rem', color: highlight ? 'rgba(255,255,255,0.85)' : 'rgba(232,232,240,0.7)', lineHeight:1.5 }}>{f}</span>
          </li>
        ))}
      </ul>

      <Link href={`/checkout/${planKey}`} style={{
        display:'block', width:'100%', padding:'0.875rem', borderRadius:'0.75rem',
        textAlign:'center', textDecoration:'none',
        fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'0.875rem',
        background: highlight ? '#fff' : 'rgba(123,31,162,0.35)',
        color: highlight ? '#7B1FA2' : '#fff',
        border: highlight ? 'none' : '1px solid rgba(123,31,162,0.5)',
        transition:'all 0.2s',
      }}>
        {plan.interval === 'one-time' ? 'Buy now →' : 'Start free trial →'}
      </Link>
    </div>
  );
}

/* ── Main Landing Page ──────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div style={{ background:'var(--navy)', color:'var(--text)', minHeight:'100vh' }}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section style={{ position:'relative', padding:'5rem 1.5rem 6rem', textAlign:'center', overflow:'hidden' }}>
        {/* Animated grid background */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          backgroundImage:'linear-gradient(rgba(92,225,230,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(92,225,230,0.05) 1px, transparent 1px)',
          backgroundSize:'40px 40px',
          maskImage:'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
          WebkitMaskImage:'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
          animation:'grid-flow 8s linear infinite',
        }} />
        {/* Glow orbs */}
        <div style={{ position:'absolute', top:'-8rem', left:'50%', transform:'translateX(-50%)', width:'50rem', height:'30rem', background:'radial-gradient(ellipse at 50% 0%, rgba(123,31,162,0.35) 0%, transparent 65%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:0, left:'20%', width:'20rem', height:'20rem', background:'radial-gradient(ellipse, rgba(92,225,230,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />

        <div style={{ position:'relative', maxWidth:'56rem', margin:'0 auto' }}>
          {/* Badge */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 16px', borderRadius:'99px', background:'rgba(92,225,230,0.08)', border:'1px solid rgba(92,225,230,0.2)', marginBottom:'1.5rem' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#5CE1E6', animation:'pulse-ring 2s infinite' }} />
            <span style={{ fontSize:'0.75rem', fontWeight:600, color:'#5CE1E6', fontFamily:'DM Mono,monospace', letterSpacing:'0.05em' }}>LIVE DEMO AVAILABLE</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(2.5rem,6vw,4.5rem)', color:'#fff', lineHeight:1.1, marginBottom:'1.5rem', letterSpacing:'-0.02em' }}>
            The AI Swarm Built for<br />
            <span style={{ background:'linear-gradient(135deg,#5CE1E6,#7B1FA2)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              Oil &amp; Gas Engineers
            </span>
          </h1>

          <p style={{ fontSize:'1.15rem', color:'rgba(232,232,240,0.6)', maxWidth:'42rem', margin:'0 auto 2.5rem', lineHeight:1.7 }}>
            Hierarchical AI agents that do reservoir analysis, drilling calculations, HSE compliance, and economics — in seconds. Built for petroleum engineers.
          </p>

          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/register" className="btn-primary" style={{ fontSize:'1rem', padding:'1rem 2rem' }}>
              Start free trial →
            </Link>
            <a href="https://oilgas-nanobot-swarm.vibecaas.app" target="_blank" rel="noopener" className="btn-outline" style={{ fontSize:'1rem', padding:'1rem 2rem' }}>
              Live demo
            </a>
          </div>

          {/* Social proof */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'1.5rem', marginTop:'2.5rem', flexWrap:'wrap' }}>
            {['14-day money-back', 'No credit card required', 'Cancel anytime'].map((t) => (
              <div key={t} style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'0.78rem', color:'rgba(232,232,240,0.45)' }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#5CE1E6" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────── */}
      <section style={{ borderTop:'1px solid rgba(92,225,230,0.08)', borderBottom:'1px solid rgba(92,225,230,0.08)', padding:'2rem 1.5rem', background:'rgba(13,10,46,0.5)' }}>
        <div style={{ maxWidth:'56rem', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.5rem', textAlign:'center' }} className="stats-grid">
          {[['9','Agent Teams'],['7','Engineering Tools'],['3-Tier','Architecture'],['<10s','Avg. Response']].map(([n,l]) => (
            <div key={l}>
              <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.75rem', color:'#5CE1E6' }}>{n}</div>
              <div style={{ fontSize:'0.75rem', color:'rgba(232,232,240,0.5)', marginTop:'2px' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────── */}
      <section style={{ padding:'5rem 1.5rem' }}>
        <div style={{ maxWidth:'72rem', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <p style={{ fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--cyan)', fontFamily:'DM Mono,monospace', marginBottom:'0.75rem' }}>WHAT MAKES PRO DIFFERENT</p>
            <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(1.75rem,3.5vw,2.5rem)', color:'#fff', margin:'0' }}>Everything you need for modern O&amp;G engineering</h2>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem' }} className="features-grid">
            {[
              { icon:'🔬', title:'Reservoir Analysis', desc:'Vogel IPR curves, Archie Sw, Darcy flow, material balance, decline curve analysis — automated from log data.' },
              { icon:'⚙️', title:'Drilling Engineering', desc:'ECD, kick tolerance, MAASP, fracture gradient (Hubbert & Willis), casing design verification in real-time.' },
              { icon:'🛢️', title:'Production Optimization', desc:'AI lift selection, waterflood surveillance, decline curve fitting, P10/P50/P90 EUR estimation.' },
              { icon:'🔒', title:'HSE Compliance', desc:'OSHA PSM 14-element audits, BSEE SEMS, EPA Quad O LDAR, NORSOK D-010 well integrity checks.' },
              { icon:'💰', title:'Well Economics', desc:'NPV10/IRR, AFE build-up, break-even oil price, EUR sensitivity — full economic screening.' },
              { icon:'🏗️', title:'Pipeline Integrity', desc:'Darcy-Weisbach pressure drop, flow regime analysis, ILI anomaly ranking, MAOP verification.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ padding:'1.5rem', borderRadius:'1rem', background:'rgba(13,10,46,0.6)', border:'1px solid rgba(92,225,230,0.08)', transition:'border-color 0.2s' }}>
                <div style={{ fontSize:'1.75rem', marginBottom:'0.75rem' }}>{icon}</div>
                <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'1rem', color:'#fff', marginBottom:'0.5rem' }}>{title}</h3>
                <p style={{ fontSize:'0.82rem', color:'rgba(232,232,240,0.55)', lineHeight:1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────── */}
      <section id="pricing" style={{ padding:'5rem 1.5rem' }}>
        <div style={{ maxWidth:'80rem', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <p style={{ fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--cyan)', fontFamily:'DM Mono,monospace', marginBottom:'0.75rem' }}>PRICING</p>
            <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(1.75rem,3.5vw,2.5rem)', color:'#fff', marginBottom:'1rem' }}>Simple, transparent pricing</h2>
            <p style={{ color:'rgba(232,232,240,0.5)', maxWidth:'32rem', margin:'0 auto', fontSize:'0.95rem' }}>From single-project campaigns to full annual Pro access. All plans include the complete engineering tool suite.</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', alignItems:'stretch' }} className="pricing-grid">
            {(Object.keys(PLANS) as Array<keyof typeof PLANS>).map((key) => (
              <PricingCard key={key} planKey={key} />
            ))}
          </div>

          <p style={{ textAlign:'center', marginTop:'2rem', fontSize:'0.78rem', color:'rgba(232,232,240,0.35)' }}>
            All plans include 14-day money-back guarantee · Secure payments via Stripe · Cancel anytime
          </p>
        </div>
      </section>

      {/* ── Testimonial / Trust ────────────────────────────────── */}
      <section style={{ padding:'4rem 1.5rem', background:'rgba(13,10,46,0.5)', borderTop:'1px solid rgba(92,225,230,0.06)' }}>
        <div style={{ maxWidth:'56rem', margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>⚠️</div>
          <p style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'1rem', color:'rgba(232,232,240,0.9)', marginBottom:'0.5rem' }}>Engineering Disclaimer</p>
          <p style={{ fontSize:'0.82rem', color:'rgba(232,232,240,0.45)', lineHeight:1.7, maxWidth:'40rem', margin:'0 auto' }}>
            OilGas Nanobot Swarm is a decision-support tool for qualified petroleum engineers. All calculations must be verified by licensed engineers before operational use. It does not replace API-certified well control training or IADC WellSharp certification.
          </p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section style={{ padding:'5rem 1.5rem', textAlign:'center' }}>
        <div style={{ maxWidth:'44rem', margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(1.75rem,3.5vw,2.75rem)', color:'#fff', marginBottom:'1rem' }}>
            Ready to work smarter?
          </h2>
          <p style={{ color:'rgba(232,232,240,0.5)', marginBottom:'2.5rem', fontSize:'0.95rem' }}>
            Join petroleum engineers using AI-powered analysis to accelerate their workflows.
          </p>
          <Link href="/register" className="btn-primary" style={{ fontSize:'1.05rem', padding:'1rem 2.5rem' }}>
            Create your account →
          </Link>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){.pricing-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:600px){
          .pricing-grid{grid-template-columns:1fr!important;}
          .features-grid{grid-template-columns:1fr!important;}
          .stats-grid{grid-template-columns:repeat(2,1fr)!important;}
        }
      `}</style>
    </div>
  );
}
