'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { PLANS } from '@/lib/stripe';
import Link from 'next/link';

export default function CheckoutPage() {
  const { plan } = useParams<{ plan: string }>();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const planData = PLANS[plan as keyof typeof PLANS];

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login?callbackUrl=/checkout/' + plan);
  }, [status, plan, router]);

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-purple-700 border-t-transparent rounded-full animate-spin" /></div>;
  if (!planData) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><h2 className="text-xl font-bold mb-2">Plan not found</h2><Link href="/#pricing" className="text-purple-700 hover:underline">View pricing</Link></div></div>;

  async function handleCheckout() {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Checkout failed');
      window.location.href = data.url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Checkout failed');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 bg-gray-50">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-purple-700 to-purple-900 px-8 py-8 text-white">
            <h1 className="text-2xl font-bold">{planData.name}</h1>
            <p className="text-purple-200 mt-1 text-sm">{planData.description}</p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold">${planData.price.toLocaleString()}</span>
              <span className="text-purple-300 text-sm">{planData.interval === 'one-time' ? 'one-time' : '/ ' + planData.interval}</span>
            </div>
          </div>
          <div className="px-8 py-6">
            <ul className="space-y-3 mb-6">
              {planData.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span className="text-sm text-gray-700">{f}</span>
                </li>
              ))}
            </ul>
            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm flex justify-between">
              <span className="text-gray-600">Signed in as</span>
              <span className="font-medium text-gray-900">{session?.user?.email}</span>
            </div>
            <button onClick={handleCheckout} disabled={loading} className="w-full bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white py-3.5 rounded-xl font-bold text-sm transition-colors">
              {loading ? 'Redirecting to Stripe…' : planData.interval === 'one-time' ? 'Pay $' + planData.price : 'Subscribe — $' + planData.price + '/' + planData.interval}
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">Secure payment via Stripe · 14-day money-back guarantee</p>
          </div>
        </div>
        <p className="text-center mt-4"><Link href="/#pricing" className="text-sm text-gray-500 hover:text-purple-700">← Back to pricing</Link></p>
      </div>
    </div>
  );
}
