import { neon } from '@neondatabase/serverless';

let _sql: ReturnType<typeof neon> | null = null;

function sql() {
  if (!_sql) {
    const url = process.env.POSTGRES_URL;
    if (!url) throw new Error('POSTGRES_URL is not set');
    _sql = neon(url);
  }
  return _sql;
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  name: string | null;
  company: string | null;
  role: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  plan: string | null;
  status: string | null;
  current_period_start: Date | null;
  current_period_end: Date | null;
  cancel_at_period_end: boolean;
  created_at: Date;
  updated_at: Date;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const db = sql();
  const rows = (await db`SELECT * FROM oilgas.users WHERE email = ${email} LIMIT 1`) as unknown as Record<string, unknown>[];
  return rows[0] as unknown as User ?? null;
}

export async function getUserById(id: string): Promise<User | null> {
  const db = sql();
  const rows = (await db`SELECT * FROM oilgas.users WHERE id = ${id} LIMIT 1`) as unknown as Record<string, unknown>[];
  return rows[0] as unknown as User ?? null;
}

export async function createUser(email: string, passwordHash: string, name?: string): Promise<User> {
  const db = sql();
  const n = name ?? null;
  const rows = (await db`
    INSERT INTO oilgas.users (email, password_hash, name)
    VALUES (${email}, ${passwordHash}, ${n})
    RETURNING *
  `) as unknown as Record<string, unknown>[];
  return rows[0] as User;
}

export async function updateUser(id: string, data: { name?: string; company?: string; role?: string }): Promise<User> {
  const db = sql();
  const n = data.name ?? null;
  const c = data.company ?? null;
  const r = data.role ?? null;
  const rows = (await db`
    UPDATE oilgas.users
    SET name    = COALESCE(${n}, name),
        company = COALESCE(${c}, company),
        role    = COALESCE(${r}, role)
    WHERE id = ${id}
    RETURNING *
  `) as unknown as Record<string, unknown>[];
  return rows[0] as User;
}

export async function getSubscriptionByUserId(userId: string): Promise<Subscription | null> {
  const db = sql();
  const rows = (await db`
    SELECT * FROM oilgas.subscriptions WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 1
  `) as unknown as Record<string, unknown>[];
  return rows[0] as unknown as Subscription ?? null;
}

export async function upsertSubscription(data: {
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  plan?: string;
  status: string;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
}): Promise<Subscription> {
  const db = sql();
  const sid = data.stripeSubscriptionId ?? null;
  const pid = data.stripePriceId ?? null;
  const plan = data.plan ?? null;
  const pStart = data.currentPeriodStart ?? null;
  const pEnd = data.currentPeriodEnd ?? null;
  const cancel = data.cancelAtPeriodEnd ?? false;
  const rows = (await db`
    INSERT INTO oilgas.subscriptions
      (user_id, stripe_customer_id, stripe_subscription_id, stripe_price_id,
       plan, status, current_period_start, current_period_end, cancel_at_period_end)
    VALUES
      (${data.userId}, ${data.stripeCustomerId}, ${sid}, ${pid},
       ${plan}, ${data.status}, ${pStart}, ${pEnd}, ${cancel})
    ON CONFLICT (stripe_subscription_id) DO UPDATE SET
      stripe_price_id      = EXCLUDED.stripe_price_id,
      plan                 = EXCLUDED.plan,
      status               = EXCLUDED.status,
      current_period_start = EXCLUDED.current_period_start,
      current_period_end   = EXCLUDED.current_period_end,
      cancel_at_period_end = EXCLUDED.cancel_at_period_end,
      updated_at           = NOW()
    RETURNING *
  `) as unknown as Record<string, unknown>[];
  return rows[0] as Subscription;
}

export async function getSubscriptionByCustomerId(customerId: string): Promise<Subscription | null> {
  const db = sql();
  const rows = (await db`
    SELECT * FROM oilgas.subscriptions WHERE stripe_customer_id = ${customerId} ORDER BY created_at DESC LIMIT 1
  `) as unknown as Record<string, unknown>[];
  return rows[0] as unknown as Subscription ?? null;
}
