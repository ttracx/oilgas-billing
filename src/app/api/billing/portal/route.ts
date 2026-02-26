import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getSubscriptionByUserId } from '@/lib/db';
import { createBillingPortalSession } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const sub = await getSubscriptionByUserId(session.user.id);
  if (!sub?.stripe_customer_id) return NextResponse.json({ error: 'No subscription found' }, { status: 404 });

  const origin = req.headers.get('origin') ?? 'http://localhost:3000';
  const portal = await createBillingPortalSession(sub.stripe_customer_id, `${origin}/settings/billing`);

  return NextResponse.json({ url: portal.url });
}
