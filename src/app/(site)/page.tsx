import Link from 'next/link';
import { PLANS } from '@/lib/stripe';

/* ── Ticker data ─────────────────────────────────────────────── */
const TICKER_ITEMS = [
  'ECD = MW + APL / (0.052 × TVD)',
  'Vogel IPR: q/qmax = 1 − 0.2(Pwf/Pr) − 0.8(Pwf/Pr)²',
  'MAASP = (FG − MW) × 0.052 × Dshoe',
  'KMW = MW + SIDPP / (0.052 × TVD)',
  'Archie: Sw^n = (a·Rw) / (φ^m·Rt)',
  'Darcy: q = k·h·ΔP / (141.2·μ·Bo·(ln(re/rw)−0.75+S))',
  'FG = (ν/(1−ν))·(OBG−PP) + PP  [Hubbert & Willis]',
  'PI = q / (Pr − Pwf)',
  'ΔP = f·(L/D)·(ρv²/2)  [Darcy-Weisbach]',
];

function PricingCard({ planKey }: { planKey: keyof typeof PLANS }) {
  const plan = PLANS[planKey];
  const isPopular = 'badge' in plan && plan.badge === 'POPULAR';
  const isBest = 'badge' in plan && plan.badge === 'BEST VALUE';

  return (
    <div style={{
      position: 'relative',
      display: 'flex', flexDirection: 'column',
      borderRadius: '16px', padding: '1.75rem',
      background: isPopular ? 'linear-gradient(145deg, #1a0a2e, #0f0624)' : 'var(--bg-1)',
      border: isPopular ? '1px solid rgba(232,160,32,0.4)' : '1px solid var(--border)',
      boxShadow: isPopular ? '0 0 60px rgba(232,160,32,0.12), inset 0 1px 0 rgba(255,255,255,0.05)' : 'none',
      transition: 'transform 0.2s, border-color 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = isPopular ? 'rgba(232,160,32,0.7)' : 'rgba(255,255,255,0.15)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = isPopular ? 'rgba(232,160,32,0.4)' : 'var(--border)'; }}
    >
      {'badge' in plan && plan.badge && (
        <div style={{
          position: 'absolute', top: '-11px', left: '1.5rem',
          padding: '3px 12px', borderRadius: '99px',
          background: isBest ? 'var(--amber)' : 'rgba(232,160,32,0.15)',
          border: isBest ? 'none' : '1px solid rgba(232,160,32,0.4)',
          color: isBest ? '#000' : 'var(--amber)',
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>{plan.badge}</div>
      )}

      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          {plan.interval === 'one-time' ? '// ONE-TIME' : `// ${plan.interval.toUpperCase()}LY`}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', color: '#fff', letterSpacing: '0.02em' }}>
          {plan.name.toUpperCase()}
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginTop: '0.2rem' }}>{plan.description}</div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.6rem', color: isPopular ? 'var(--amber)' : '#fff', letterSpacing: '-0.02em' }}>
            ${plan.price.toLocaleString()}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>
            {plan.interval === 'one-time' ? 'once' : `/${plan.interval}`}
          </span>
        </div>
        {'pricePerMonth' in plan && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--amber)', marginTop: '2px' }}>
            ~${plan.pricePerMonth}/mo · saves 40%
          </div>
        )}
      </div>

      <ul style={{ listStyle: 'none', margin: '0 0 1.75rem', padding: 0, flex: 1 }}>
        {plan.features.map(f => (
          <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '9px' }}>
            <span style={{ color: 'var(--amber)', marginTop: '2px', flexShrink: 0, fontSize: '0.75rem' }}>▸</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.5 }}>{f}</span>
          </li>
        ))}
      </ul>

      <Link href={`/checkout/${planKey}`} style={{
        display: 'block', width: '100%', padding: '0.875rem', borderRadius: '10px',
        textAlign: 'center', textDecoration: 'none',
        fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.05em',
        background: isPopular ? 'var(--amber)' : 'rgba(255,255,255,0.06)',
        color: isPopular ? '#000' : 'var(--text)',
        border: isPopular ? 'none' : '1px solid var(--border)',
        transition: 'all 0.2s',
      }}>
        {plan.interval === 'one-time' ? 'BUY NOW →' : 'START FREE TRIAL →'}
      </Link>
    </div>
  );
}

export default function HomePage() {
  const ticker = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)' }}>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', overflow: 'hidden', padding: '4rem 1.5rem' }}>

        {/* Animated seismic grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(0,200,204,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,204,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          animation: 'grid-scroll 6s linear infinite',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
        }} />

        {/* Scan line */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,200,204,0.3), transparent)',
          animation: 'scan 8s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: '-10rem', right: '-5rem', width: '45rem', height: '45rem', background: 'radial-gradient(ellipse, rgba(232,160,32,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-5rem', left: '-5rem', width: '35rem', height: '35rem', background: 'radial-gradient(ellipse, rgba(0,200,204,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: '80rem', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">

          {/* Left: copy */}
          <div>
            <div className="animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '99px', background: 'rgba(232,160,32,0.1)', border: '1px solid rgba(232,160,32,0.2)', marginBottom: '1.5rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)', animation: 'pulse-amber 2s infinite' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--amber)', letterSpacing: '0.1em' }}>LIVE SYSTEM ACTIVE</span>
            </div>

            <h1 className="animate-fade-up delay-100" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#fff', lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: '1.5rem' }}>
              THE AI SWARM<br />
              <span style={{ color: 'var(--amber)' }}>BUILT FOR</span><br />
              O&amp;G ENGINEERS
            </h1>

            <p className="animate-fade-up delay-200" style={{ fontSize: '1rem', color: 'var(--text-2)', maxWidth: '38rem', lineHeight: 1.75, marginBottom: '2rem' }}>
              Hierarchical AI agents that run reservoir analysis, drilling calculations, HSE compliance, and well economics in seconds. Not another chatbot — a precision engineering instrument.
            </p>

            <div className="animate-fade-up delay-300" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <Link href="/register" className="btn-amber" style={{ fontSize: '0.95rem', padding: '0.9rem 2rem' }}>
                Start free trial →
              </Link>
              <a href="https://oilgas-nanobot-swarm.vibecaas.app" target="_blank" rel="noopener" className="btn-ghost" style={{ fontSize: '0.95rem', padding: '0.9rem 2rem' }}>
                Live demo
              </a>
            </div>

            <div className="animate-fade-up delay-400" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {['14-day money-back', 'No credit card', 'Cancel anytime'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--amber)' }}>✓</span> {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right: terminal widget */}
          <div className="animate-fade-up delay-200 hero-terminal" style={{ animation: 'float 5s ease-in-out infinite' }}>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(232,160,32,0.08)' }}>
              {/* Terminal bar */}
              <div style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {['#EF4444', '#F59E0B', '#22C55E'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-3)', marginLeft: '8px' }}>swarm-console — nanobot-gateway v2.0</span>
              </div>
              {/* Terminal body */}
              <div style={{ padding: '1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', lineHeight: 1.8 }}>
                <div style={{ color: 'rgba(0,200,204,0.7)', marginBottom: '0.5rem' }}>$ swarm run --mode hierarchical</div>
                <div style={{ color: 'var(--text-3)' }}>▸ Queen decomposing goal...</div>
                <div style={{ color: 'var(--text-3)' }}>▸ Dispatching L1: reservoir-analysis</div>
                <div style={{ color: 'var(--amber)' }}>▸ Running Archie Sw calculation...</div>
                <div style={{ color: 'var(--text-3)', marginTop: '0.75rem', borderLeft: '2px solid var(--amber)', paddingLeft: '0.75rem' }}>
                  <div>Rt = 12.5 Ω·m</div>
                  <div>Rw = 0.04 Ω·m</div>
                  <div>φ  = 22.0%</div>
                </div>
                <div style={{ color: 'var(--green)', marginTop: '0.75rem' }}>
                  ✓ Sw = 0.423 | Sh = 57.7%
                </div>
                <div style={{ color: 'var(--green)' }}>
                  ✓ Classification: HYDROCARBON
                </div>
                <div style={{ marginTop: '0.5rem', color: 'var(--amber)' }}>
                  ▸ <span style={{ animation: 'blink 1s infinite' }}>█</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ticker ──────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '0.875rem 0', background: 'var(--bg-1)', overflow: 'hidden' }}>
        <div className="ticker-inner">
          {ticker.map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', padding: '0 2.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', whiteSpace: 'nowrap' }}>
              <span style={{ color: 'var(--amber)', marginRight: '0.5rem' }}>◆</span>
              <span style={{ color: 'var(--text-3)' }}>{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats ───────────────────────────────────────────── */}
      <section style={{ padding: '4rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'var(--border)' }} className="stats-grid">
          {[['9', 'Agent Teams', 'Hierarchical + Flat'], ['7', 'Eng. Tools', 'Drilling · Reservoir · Pipeline'], ['22', 'Agent Roles', 'Queen → L1 → L2 hierarchy'], ['<10s', 'Response', 'Avg. end-to-end analysis']].map(([n, l, sub]) => (
            <div key={l} style={{ padding: '2rem 1.5rem', background: 'var(--bg)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.25rem', color: 'var(--amber)', letterSpacing: '-0.02em' }}>{n}</div>
              <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.875rem', marginTop: '0.25rem' }}>{l}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginTop: '0.2rem', fontFamily: 'var(--font-mono)' }}>{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--teal)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>// ENGINEERING CAPABILITIES</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', color: '#fff', letterSpacing: '-0.01em' }}>
              Every calculation. Every domain.<br />
              <span style={{ color: 'var(--amber)' }}>Automated.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)' }} className="feat-grid">
            {[
              { tag: '01', title: 'Reservoir Engineering', desc: 'Vogel IPR, Darcy flow, Archie Sw, material balance, EUR estimation with P10/P50/P90.' },
              { tag: '02', title: 'Drilling Engineering', desc: 'ECD, kick tolerance, MAASP, fracture gradient (Hubbert & Willis), mud weight window.' },
              { tag: '03', title: 'Well Control', desc: 'Kill mud weight, MAASP, driller method kill schedule. Referenced to IADC/API standards.' },
              { tag: '04', title: 'Production Optimization', desc: 'AI lift selection, decline curves, waterflood VRR, nodal analysis inputs.' },
              { tag: '05', title: 'HSE Compliance', desc: 'OSHA PSM 14 elements, BSEE SEMS, EPA Quad O LDAR, NORSOK D-010 well integrity.' },
              { tag: '06', title: 'Well Economics', desc: 'AFE build-up, NPV10/IRR, break-even oil price, EUR sensitivity matrix.' },
            ].map(({ tag, title, desc }) => (
              <div key={tag} style={{ padding: '2rem', background: 'var(--bg)', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--amber)', letterSpacing: '0.1em', marginBottom: '0.75rem', opacity: 0.7 }}>{tag}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: '#fff', marginBottom: '0.6rem', letterSpacing: '0.01em' }}>{title.toUpperCase()}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-3)', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────────── */}
      <section id="pricing" style={{ padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--teal)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>// PRICING</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', color: '#fff', letterSpacing: '-0.01em', marginBottom: '0.75rem' }}>
              START FREE. SCALE WITH YOUR TEAM.
            </h2>
            <p style={{ color: 'var(--text-3)', fontSize: '0.9rem', maxWidth: '32rem', margin: '0 auto' }}>
              From single-project campaigns to full annual Pro access. All plans include the complete 7-tool engineering suite.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', alignItems: 'stretch' }} className="pricing-grid">
            {(Object.keys(PLANS) as Array<keyof typeof PLANS>).map(key => <PricingCard key={key} planKey={key} />)}
          </div>

          <p style={{ textAlign: 'center', marginTop: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-3)', letterSpacing: '0.05em' }}>
            14-DAY MONEY-BACK · SECURE PAYMENT VIA STRIPE · CANCEL ANYTIME
          </p>
        </div>
      </section>

      {/* ── Disclaimer ──────────────────────────────────────── */}
      <section style={{ padding: '3rem 1.5rem', borderTop: '1px solid var(--border)', background: 'var(--bg-1)' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>⚠ ENGINEERING DISCLAIMER</div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-3)', lineHeight: 1.7 }}>
            OilGas Nanobot Swarm is a decision-support tool for qualified petroleum engineers. All calculations must be verified by licensed engineers before operational use. This tool does not replace API-certified well control training or IADC WellSharp certification.
          </p>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '44rem', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: '#fff', letterSpacing: '-0.01em', marginBottom: '1rem' }}>
            READY TO ENGINEER<br />
            <span style={{ color: 'var(--amber)' }}>FASTER?</span>
          </h2>
          <p style={{ color: 'var(--text-3)', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: 1.7 }}>
            Join petroleum engineers using AI-powered swarm intelligence to accelerate their workflows.
          </p>
          <Link href="/register" className="btn-amber" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
            Create your account →
          </Link>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){
          .hero-grid{grid-template-columns:1fr!important}
          .hero-terminal{display:none}
          .pricing-grid{grid-template-columns:repeat(2,1fr)!important}
          .stats-grid{grid-template-columns:repeat(2,1fr)!important}
          .feat-grid{grid-template-columns:1fr!important}
        }
        @media(max-width:600px){
          .pricing-grid{grid-template-columns:1fr!important}
          .stats-grid{grid-template-columns:repeat(2,1fr)!important}
        }
      `}</style>
    </div>
  );
}
