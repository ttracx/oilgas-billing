import { NextRequest, NextResponse } from 'next/server';
import { getStripe, getPlanFromPriceId } from '@/lib/stripe';
import { upsertSubscription } from '@/lib/db';
import type Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') ?? '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? '';

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }

  async function syncSubscription(sub: Stripe.Subscription, userId: string) {
    const priceId = sub.items.data[0]?.price.id ?? '';
    const plan = getPlanFromPriceId(priceId);
    const periodStart = (sub as unknown as { current_period_start: number }).current_period_start;
    const periodEnd   = (sub as unknown as { current_period_end: number }).current_period_end;
    const cancelAtEnd = (sub as unknown as { cancel_at_period_end: boolean }).cancel_at_period_end ?? false;

    await upsertSubscription({
      userId,
      stripeCustomerId: typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
      stripeSubscriptionId: sub.id,
      stripePriceId: priceId,
      plan: plan ?? undefined,
      status: sub.status,
      currentPeriodStart: periodStart ? new Date(periodStart * 1000) : undefined,
      currentPeriodEnd:   periodEnd   ? new Date(periodEnd   * 1000) : undefined,
      cancelAtPeriodEnd: cancelAtEnd,
    });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === 'subscription' && session.subscription) {
          const sub = await getStripe().subscriptions.retrieve(session.subscription as string);
          const userId = session.metadata?.userId ?? (sub.metadata as Record<string,string>)?.userId;
          if (userId) await syncSubscription(sub, userId);
        }
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const userId = (sub.metadata as Record<string,string>)?.userId;
        if (userId) await syncSubscription(sub, userId);
        break;
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err);
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
