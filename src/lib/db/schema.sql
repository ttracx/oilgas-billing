-- OilGas Nanobot Swarm — User & Billing Schema
-- Uses dedicated 'oilgas' schema to avoid conflicts with other apps

CREATE SCHEMA IF NOT EXISTS oilgas;

CREATE TABLE IF NOT EXISTS oilgas.users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           VARCHAR(255) UNIQUE NOT NULL,
  password_hash   VARCHAR(255) NOT NULL,
  name            VARCHAR(255),
  company         VARCHAR(255),
  role            VARCHAR(100),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS oilgas.subscriptions (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                UUID NOT NULL REFERENCES oilgas.users(id) ON DELETE CASCADE,
  stripe_customer_id     VARCHAR(255) UNIQUE,
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_price_id        VARCHAR(255),
  plan                   VARCHAR(50),
  status                 VARCHAR(50),
  current_period_start   TIMESTAMPTZ,
  current_period_end     TIMESTAMPTZ,
  cancel_at_period_end   BOOLEAN DEFAULT FALSE,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_og_subs_user_id   ON oilgas.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_og_subs_customer  ON oilgas.subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_og_subs_stripe_id ON oilgas.subscriptions(stripe_subscription_id);

-- Auto-update updated_at trigger function (schema-scoped)
CREATE OR REPLACE FUNCTION oilgas.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_updated_at ON oilgas.users;
CREATE TRIGGER users_updated_at BEFORE UPDATE ON oilgas.users
  FOR EACH ROW EXECUTE FUNCTION oilgas.update_updated_at();

DROP TRIGGER IF EXISTS subscriptions_updated_at ON oilgas.subscriptions;
CREATE TRIGGER subscriptions_updated_at BEFORE UPDATE ON oilgas.subscriptions
  FOR EACH ROW EXECUTE FUNCTION oilgas.update_updated_at();
