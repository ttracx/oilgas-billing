import { neon } from '@neondatabase/serverless';

function getDb() {
  const url = process.env.POSTGRES_URL;
  if (!url) throw new Error('POSTGRES_URL is not set');
  return neon(url);
}

// Execute parameterized query — uses .query() not tagged templates
async function q<T extends Record<string, unknown>>(
  sql: string,
  params: unknown[] = []
): Promise<T[]> {
  const db = getDb();
  const result = await db.query(sql, params);
  return result.rows as T[];
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
  const rows = await q<User>('SELECT * FROM oilgas.users WHERE email = $1 LIMIT 1', [email]);
  return rows[0] ?? null;
}

export async function getUserById(id: string): Promise<User | null> {
  const rows = await q<User>('SELECT * FROM oilgas.users WHERE id = $1 LIMIT 1', [id]);
  return rows[0] ?? null;
}

export async function createUser(email: string, passwordHash: string, name?: string): Promise<User> {
  const rows = await q<User>(
    'INSERT INTO oilgas.users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING *',
    [email, passwordHash, name ?? null]
  );
  return rows[0];
}

export async function updateUser(id: string, data: { name?: string; company?: string; role?: string }): Promise<User> {
  const rows = await q<User>(
    `UPDATE oilgas.users
     SET name    = COALESCE($2, name),
         company = COALESCE($3, company),
         role    = COALESCE($4, role)
     WHERE id = $1 RETURNING *`,
    [id, data.name ?? null, data.company ?? null, data.role ?? null]
  );
  return rows[0];
}

export async function getSubscriptionByUserId(userId: string): Promise<Subscription | null> {
  const rows = await q<Subscription>(
    'SELECT * FROM oilgas.subscriptions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
    [userId]
  );
  return rows[0] ?? null;
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
  const rows = await q<Subscription>(
    `INSERT INTO oilgas.subscriptions
       (user_id, stripe_customer_id, stripe_subscription_id, stripe_price_id,
        plan, status, current_period_start, current_period_end, cancel_at_period_end)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (stripe_subscription_id) DO UPDATE SET
       stripe_price_id      = EXCLUDED.stripe_price_id,
       plan                 = EXCLUDED.plan,
       status               = EXCLUDED.status,
       current_period_start = EXCLUDED.current_period_start,
       current_period_end   = EXCLUDED.current_period_end,
       cancel_at_period_end = EXCLUDED.cancel_at_period_end,
       updated_at           = NOW()
     RETURNING *`,
    [
      data.userId, data.stripeCustomerId, data.stripeSubscriptionId ?? null,
      data.stripePriceId ?? null, data.plan ?? null, data.status,
      data.currentPeriodStart ?? null, data.currentPeriodEnd ?? null,
      data.cancelAtPeriodEnd ?? false,
    ]
  );
  return rows[0];
}

export async function getSubscriptionByCustomerId(customerId: string): Promise<Subscription | null> {
  const rows = await q<Subscription>(
    'SELECT * FROM oilgas.subscriptions WHERE stripe_customer_id = $1 ORDER BY created_at DESC LIMIT 1',
    [customerId]
  );
  return rows[0] ?? null;
}
