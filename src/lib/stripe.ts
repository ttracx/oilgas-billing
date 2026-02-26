import Stripe from 'stripe';

// Lazy singleton — avoids crash during static page generation when env var is absent
let _stripe: Stripe | null = null;
export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY is not set');
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2026-02-25.clover' });
  }
  return _stripe;
}
/** @deprecated Use getStripe() */
export const stripe = { get: getStripe } as unknown as Stripe;

export const PLANS = {
  campaign: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CAMPAIGN!,
    name: 'Campaign Pack',
    description: 'One-time access for a single project',
    price: 99,
    interval: 'one-time' as const,
    features: [
      'Full swarm access for 1 project',
      'All 9 agent teams',
      '7 engineering calculators',
      'Agent & team builder',
      'Export results',
    ],
  },
  weekly: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_WEEKLY!,
    name: 'Pro Weekly',
    description: 'Cancel anytime',
    price: 49.99,
    interval: 'week' as const,
    features: [
      'Unlimited swarm runs',
      'Redis memory & vault',
      'Scheduled agent teams',
      'Priority AI backend',
      'API access',
    ],
  },
  monthly: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY!,
    name: 'Pro Monthly',
    description: 'Most popular',
    price: 149,
    interval: 'month' as const,
    badge: 'POPULAR',
    features: [
      'Unlimited swarm runs',
      'Redis memory & vault',
      'Scheduled agent teams',
      'Priority AI backend',
      'API access + priority support',
    ],
  },
  annual: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL!,
    name: 'Pro Annual',
    description: 'Save 40% vs monthly',
    price: 1079,
    pricePerMonth: 89.92,
    interval: 'year' as const,
    badge: 'BEST VALUE',
    features: [
      'Everything in Monthly',
      'Dedicated capacity',
      'MS 365 integration',
      'Custom agents & teams',
      'Priority support + onboarding',
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;

export function getPlanFromPriceId(priceId: string): PlanKey | null {
  const entry = Object.entries(PLANS).find(([, p]) => p.priceId === priceId);
  return entry ? (entry[0] as PlanKey) : null;
}

export async function createOrRetrieveCustomer(
  email: string,
  userId: string
): Promise<string> {
  const existing = await getStripe().customers.list({ email, limit: 1 });
  if (existing.data.length > 0) return existing.data[0].id;
  const customer = await getStripe().customers.create({
    email,
    metadata: { userId },
  });
  return customer.id;
}

export async function createCheckoutSession({
  priceId,
  customerId,
  userId,
  email,
  successUrl,
  cancelUrl,
  mode,
}: {
  priceId: string;
  customerId: string;
  userId: string;
  email: string;
  successUrl: string;
  cancelUrl: string;
  mode: 'payment' | 'subscription';
}) {
  return getStripe().checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    mode,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { userId, priceId },
    customer_update: { address: 'auto' },
    ...(mode === 'subscription' && {
      subscription_data: { metadata: { userId } },
    }),
  });
}

export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string
) {
  return getStripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}
