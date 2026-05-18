/**
 * Kapit dashboard API client.
 *
 * All requests carry a Clerk session JWT supplied by the caller. The caller is
 * responsible for obtaining the token via Clerk's `useAuth().getToken()` and
 * passing it in. This module never reads Clerk state directly.
 *
 * To use a custom JWT template later, change the `getToken()` call site in the
 * component, not here.
 */

const BASE_URL =
  (import.meta.env.PUBLIC_KAPIT_API_BASE_URL as string | undefined) ??
  'https://api.kapit.dev';

export type Plan = 'free' | 'starter' | 'builder' | 'scale' | 'enterprise';
export type PaidPlan = 'starter' | 'builder' | 'scale' | 'enterprise';
export type BillingCycle = 'monthly' | 'yearly';
export type SubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'canceled'
  | 'incomplete'
  | 'none';
export type ApiKeyMode = 'live' | 'test';
export type ApiKeyStatus = 'active' | 'revoked';

export interface AccountMe {
  user: {
    id: string;
    email: string;
    plan: Plan;
    subscription_status: SubscriptionStatus;
    billing_cycle?: BillingCycle | null;
  };
  api_keys?: { active_count: number; limit: number | null };
}

export interface AccountUsage {
  plan: Plan;
  period: 'daily' | 'monthly';
  used: number;
  limit: number | null;
  reset_at: string;
  rate_limit: string;
  overage_units?: number;
  estimated_overage_cost_cents?: number;
}

export interface MetaWarning {
  code: string;
  severity: 'warning' | 'info' | 'error';
  recommended_action?: string;
  upgrade_url?: string;
  monthly_limit?: number;
  monthly_used?: number;
  monthly_remaining?: number;
  overage_units?: number;
  overage_cost_cents?: number;
  guidance?: string;
}

export interface WithMetaWarning<T> {
  data: T;
  warning: MetaWarning | null;
}

export interface ApiKey {
  id: string;
  prefix: string;
  name: string | null;
  mode: ApiKeyMode;
  status: ApiKeyStatus;
  created_at: string;
  revoked_at: string | null;
}

export interface CreateApiKeyInput {
  name?: string;
  mode?: ApiKeyMode;
}

export interface CreateApiKeyResponse {
  key: ApiKey;
  raw_key: string;
}

export interface CheckoutInput {
  plan: 'starter' | 'builder' | 'scale';
  billing_cycle: BillingCycle;
  success_url: string;
  cancel_url: string;
}

export interface CheckoutResponse {
  checkout_url: string;
}

export interface CustomerPortalInput {
  return_url: string;
}

export interface CustomerPortalResponse {
  portal_url: string;
}

export class KapitDashboardApiError extends Error {
  status: number;
  code: string;
  recovery?: string;
  alternativeAction?: string;
  retryAfterSeconds?: number;
  rateLimitContext?: string;

  constructor(
    status: number,
    code: string,
    message: string,
    extras?: {
      recovery?: string;
      alternativeAction?: string;
      retryAfterSeconds?: number;
      rateLimitContext?: string;
    },
  ) {
    super(message);
    this.name = 'KapitDashboardApiError';
    this.status = status;
    this.code = code;
    if (extras?.recovery !== undefined) this.recovery = extras.recovery;
    if (extras?.alternativeAction !== undefined) this.alternativeAction = extras.alternativeAction;
    if (extras?.retryAfterSeconds !== undefined) this.retryAfterSeconds = extras.retryAfterSeconds;
    if (extras?.rateLimitContext !== undefined) this.rateLimitContext = extras.rateLimitContext;
  }
}

function parseRetryAfterHeader(header: string | null): number | undefined {
  if (!header) return undefined;
  const seconds = parseInt(header, 10);
  if (Number.isFinite(seconds) && seconds >= 0) return seconds;
  return undefined;
}

async function request<T>(
  token: string | null,
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  if (!token) {
    throw new KapitDashboardApiError(0, 'no_token', 'Missing Clerk session token.');
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let code = 'request_failed';
    let message = `Request failed with status ${response.status}`;
    let recovery: string | undefined;
    let alternativeAction: string | undefined;
    let retryAfterSeconds: number | undefined;
    let rateLimitContext: string | undefined;

    try {
      const data = (await response.json()) as {
        error?: {
          code?: string;
          message?: string;
          recovery?: { guidance?: string };
          alternative_action?: string;
          retry_after_seconds?: number;
          context?: { rate_limit?: string };
        };
        meta?: { request_id?: string };
      };
      if (typeof data.error?.code === 'string') code = data.error.code;
      if (typeof data.error?.message === 'string') message = data.error.message;
      if (typeof data.error?.recovery?.guidance === 'string') recovery = data.error.recovery.guidance;
      if (typeof data.error?.alternative_action === 'string') alternativeAction = data.error.alternative_action;
      if (typeof data.error?.retry_after_seconds === 'number') retryAfterSeconds = data.error.retry_after_seconds;
      if (typeof data.error?.context?.rate_limit === 'string') rateLimitContext = data.error.context.rate_limit;
    } catch {
      // body wasn't JSON; keep defaults
    }

    if (response.status === 429 && retryAfterSeconds === undefined) {
      retryAfterSeconds = parseRetryAfterHeader(response.headers.get('Retry-After'));
    }

    if (response.status === 404 || response.status === 501) {
      throw new KapitDashboardApiError(
        response.status,
        'not_ready',
        'Endpoint is not available yet.',
      );
    }

    throw new KapitDashboardApiError(response.status, code, message, {
      recovery,
      alternativeAction,
      retryAfterSeconds,
      rateLimitContext,
    });
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function getAccountMe(token: string): Promise<AccountMe> {
  return request<AccountMe>(token, 'GET', '/v1/account/me');
}

export function getAccountUsage(token: string): Promise<AccountUsage> {
  return request<AccountUsage>(token, 'GET', '/v1/account/usage');
}

export async function getAccountUsageWithMeta(
  token: string,
): Promise<WithMetaWarning<AccountUsage>> {
  if (!token) {
    throw new KapitDashboardApiError(0, 'no_token', 'Missing Clerk session token.');
  }

  const response = await fetch(`${BASE_URL}/v1/account/usage`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    let code = 'request_failed';
    let message = `Request failed with status ${response.status}`;
    let recovery: string | undefined;
    let alternativeAction: string | undefined;
    let retryAfterSeconds: number | undefined;
    let rateLimitContext: string | undefined;

    try {
      const data = (await response.json()) as {
        error?: {
          code?: string;
          message?: string;
          recovery?: { guidance?: string };
          alternative_action?: string;
          retry_after_seconds?: number;
          context?: { rate_limit?: string };
        };
      };
      if (typeof data.error?.code === 'string') code = data.error.code;
      if (typeof data.error?.message === 'string') message = data.error.message;
      if (typeof data.error?.recovery?.guidance === 'string') recovery = data.error.recovery.guidance;
      if (typeof data.error?.alternative_action === 'string') alternativeAction = data.error.alternative_action;
      if (typeof data.error?.retry_after_seconds === 'number') retryAfterSeconds = data.error.retry_after_seconds;
      if (typeof data.error?.context?.rate_limit === 'string') rateLimitContext = data.error.context.rate_limit;
    } catch {
      // body wasn't JSON; keep defaults
    }

    if (response.status === 429 && retryAfterSeconds === undefined) {
      retryAfterSeconds = parseRetryAfterHeader(response.headers.get('Retry-After'));
    }

    if (response.status === 404 || response.status === 501) {
      throw new KapitDashboardApiError(
        response.status,
        'not_ready',
        'Endpoint is not available yet.',
      );
    }

    throw new KapitDashboardApiError(response.status, code, message, {
      recovery,
      alternativeAction,
      retryAfterSeconds,
      rateLimitContext,
    });
  }

  const json = (await response.json()) as AccountUsage & {
    meta?: { warning?: MetaWarning | null };
  };

  const { meta, ...usageFields } = json;
  const data: AccountUsage = {
    plan: usageFields.plan,
    period: usageFields.period,
    used: usageFields.used,
    limit: usageFields.limit,
    reset_at: usageFields.reset_at,
    rate_limit: usageFields.rate_limit,
    overage_units: usageFields.overage_units,
    estimated_overage_cost_cents: usageFields.estimated_overage_cost_cents,
  };

  const warning: MetaWarning | null =
    meta && meta.warning && typeof meta.warning === 'object' ? meta.warning : null;

  return { data, warning };
}

// On `not_ready`, callers should catch `KapitDashboardApiError` with
// code === 'not_ready' and treat it as an empty list (return []).
export function listApiKeys(token: string): Promise<ApiKey[]> {
  return request<ApiKey[]>(token, 'GET', '/v1/account/api-keys');
}

export function createApiKey(
  token: string,
  input: CreateApiKeyInput,
): Promise<CreateApiKeyResponse> {
  return request<CreateApiKeyResponse>(token, 'POST', '/v1/account/api-keys', input);
}

export async function revokeApiKey(token: string, keyId: string): Promise<void> {
  await request<void>(
    token,
    'DELETE',
    `/v1/account/api-keys/${encodeURIComponent(keyId)}`,
  );
}

export function createCheckout(
  token: string,
  input: CheckoutInput,
): Promise<CheckoutResponse> {
  return request<CheckoutResponse>(token, 'POST', '/v1/billing/checkout', input);
}

export function createCustomerPortal(
  token: string,
  input: CustomerPortalInput,
): Promise<CustomerPortalResponse> {
  return request<CustomerPortalResponse>(token, 'POST', '/v1/billing/customer-portal', input);
}
