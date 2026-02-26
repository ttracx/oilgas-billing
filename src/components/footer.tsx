import Link from 'next/link';
export function Footer() {
  return (
    <footer style={{ background:'var(--navy)', borderTop:'1px solid rgba(92,225,230,0.08)', marginTop:'auto' }}>
      <div style={{ maxWidth:'80rem', margin:'0 auto', padding:'3rem 1.5rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'2rem', marginBottom:'2.5rem' }} className="footer-grid">
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'0.75rem' }}>
              <div style={{ width:'28px', height:'28px', borderRadius:'6px', background:'linear-gradient(135deg,#7B1FA2,#5CE1E6)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
              <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'0.9rem', color:'#fff' }}>OilGas Nanobot</span>
            </div>
            <p style={{ fontSize:'0.78rem', color:'rgba(232,232,240,0.4)', lineHeight:1.6 }}>AI-powered engineering intelligence for upstream, midstream, and downstream O&G operations.</p>
          </div>
          <div>
            <p style={{ fontSize:'0.65rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(232,232,240,0.3)', marginBottom:'0.75rem' }}>Product</p>
            {[['/#pricing','Pricing'],['https://oilgas-nanobot-swarm.vibecaas.app','Demo'],['https://oilgas-nanobot-swarm.vibecaas.app/docs-page','Docs'],['https://oilgas-nanobot-swarm.vibecaas.app/faq','FAQ']].map(([h,l])=>(
              <a key={l} href={h} style={{ display:'block', fontSize:'0.82rem', color:'rgba(232,232,240,0.5)', textDecoration:'none', marginBottom:'0.4rem', transition:'color 0.15s' }} onMouseEnter={e=>e.currentTarget.style.color='#5CE1E6'} onMouseLeave={e=>e.currentTarget.style.color='rgba(232,232,240,0.5)'}>{l}</a>
            ))}
          </div>
          <div>
            <p style={{ fontSize:'0.65rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(232,232,240,0.3)', marginBottom:'0.75rem' }}>Account</p>
            {[['/login','Log in'],['/register','Sign up'],['/settings','Settings'],['/settings/billing','Billing']].map(([h,l])=>(
              <Link key={l} href={h} style={{ display:'block', fontSize:'0.82rem', color:'rgba(232,232,240,0.5)', textDecoration:'none', marginBottom:'0.4rem', transition:'color 0.15s' }} onMouseEnter={e=>e.currentTarget.style.color='#5CE1E6'} onMouseLeave={e=>e.currentTarget.style.color='rgba(232,232,240,0.5)'}>{l}</Link>
            ))}
          </div>
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:'1.5rem', textAlign:'center' }}>
          <p style={{ fontSize:'0.72rem', color:'rgba(232,232,240,0.25)' }}>
            © 2026 OilGas Nanobot Swarm powered by{' '}
            <a href="https://vibecaas.com" style={{ color:'#5CE1E6', textDecoration:'none' }}>VibeCaaS.com</a>
            {' '}a division of{' '}
            <a href="https://neuralquantum.ai" style={{ color:'#5CE1E6', textDecoration:'none' }}>NeuralQuantum.ai LLC</a>.
            {' '}All rights reserved.
          </p>
        </div>
      </div>
      <style>{`@media(max-width:640px){.footer-grid{grid-template-columns:1fr!important;}}`}</style>
    </footer>
  );
}
