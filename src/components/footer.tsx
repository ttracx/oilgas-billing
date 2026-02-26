import Link from 'next/link';

export function Footer() {
  return (
    <footer style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--border)', padding: '4rem 1.5rem 2rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }} className="footer-cols">

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{ width: '28px', height: '28px', background: 'var(--amber)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#fff', fontSize: '0.95rem', letterSpacing: '0.03em' }}>OILGAS NANOBOT PRO</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-3)', lineHeight: 1.7, maxWidth: '280px' }}>
              AI-powered hierarchical agent swarm for petroleum engineering. Reservoir, drilling, production, HSE, and economics — automated.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
              {['Neon PostgreSQL', 'Stripe', 'Vercel'].map(t => (
                <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', padding: '3px 8px', borderRadius: '4px', background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-3)', letterSpacing: '0.05em' }}>{t}</span>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--text-3)', marginBottom: '1rem', textTransform: 'uppercase' }}>Platform</p>
            <style>{`.f-link{display:block;font-size:0.85rem;color:var(--text-2);text-decoration:none;margin-bottom:0.6rem;transition:color 0.15s}.f-link:hover{color:var(--amber)}`}</style>
            {[['/#pricing', 'Pricing'], ['https://oilgas-nanobot-swarm.vibecaas.app', 'Demo'], ['https://oilgas-nanobot-swarm.vibecaas.app/docs-page', 'Docs'], ['https://oilgas-nanobot-swarm.vibecaas.app/faq', 'FAQ']].map(([h, l]) => (
              <a key={l} href={h} className="f-link">{l}</a>
            ))}
          </div>

          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--text-3)', marginBottom: '1rem', textTransform: 'uppercase' }}>Account</p>
            {[['/login', 'Log in'], ['/register', 'Sign up'], ['/settings', 'Dashboard'], ['/settings/billing', 'Billing']].map(([h, l]) => (
              <Link key={l} href={h} className="f-link">{l}</Link>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>
            © 2026 OilGas Nanobot Swarm powered by{' '}
            <a href="https://vibecaas.com" style={{ color: 'var(--teal)', textDecoration: 'none' }}>VibeCaaS.com</a>
            {' '}a division of{' '}
            <a href="https://neuralquantum.ai" style={{ color: 'var(--teal)', textDecoration: 'none' }}>NeuralQuantum.ai LLC</a>.
            {' '}All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(0,200,204,0.08)', border: '1px solid rgba(0,200,204,0.2)', color: 'var(--teal)' }}>v2.0.0</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: 'var(--green)' }}>LIVE</span>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:640px){.footer-cols{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}
