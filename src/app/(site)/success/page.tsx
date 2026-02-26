import Link from 'next/link';
export default function SuccessPage() {
  return (
    <div style={{ minHeight:'calc(100vh - 64px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'3rem 1rem', background:'var(--navy)' }}>
      <div style={{ position:'fixed', top:'30%', left:'50%', transform:'translateX(-50%)', width:'40rem', height:'30rem', background:'radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 65%)', pointerEvents:'none' }} />
      <div style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:'480px' }}>
        <div style={{ width:'72px', height:'72px', borderRadius:'50%', background:'rgba(16,185,129,0.12)', border:'2px solid rgba(16,185,129,0.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.5rem' }}>
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'2rem', color:'#fff', marginBottom:'0.75rem' }}>You&apos;re all set! 🎉</h1>
        <p style={{ color:'rgba(232,232,240,0.55)', marginBottom:'2rem', lineHeight:1.7 }}>Your subscription is active. You now have full access to OilGas Nanobot Swarm Pro. Check your email for a receipt.</p>
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/settings" className="btn-primary">Go to dashboard →</Link>
          <a href="https://oilgas-nanobot-swarm.vibecaas.app" target="_blank" rel="noopener" className="btn-outline">Open app</a>
        </div>
      </div>
    </div>
  );
}
