import type { Plan } from './kapit-dashboard-api';

export interface PricingTier {
  id: Plan;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  includedRequests: string;
  quotaBehavior: string;
  overage: string | null;
  rateLimit: string;
  apiKeys: string;
  support: string;
  sla: string;
  highlighted?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    includedRequests: '500/day (~15K/mo)',
    quotaBehavior: 'Hard cap',
    overage: null,
    rateLimit: '10 req/min',
    apiKeys: '1',
    support: 'Community / docs',
    sla: 'None',
  },
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 19,
    yearlyPrice: 190,
    includedRequests: '50K/mo',
    quotaBehavior: 'Soft cap',
    overage: '$1.50 per 1K extra',
    rateLimit: '60 req/min',
    apiKeys: '3',
    support: 'Email, 72hr',
    sla: 'None',
  },
  {
    id: 'builder',
    name: 'Builder',
    monthlyPrice: 49,
    yearlyPrice: 490,
    includedRequests: '200K/mo',
    quotaBehavior: 'Soft cap',
    overage: '$1.20 per 1K extra',
    rateLimit: '300 req/min',
    apiKeys: '10',
    support: 'Email, 24hr',
    sla: '99.5% uptime target',
    highlighted: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    monthlyPrice: 149,
    yearlyPrice: 1490,
    includedRequests: '1M/mo',
    quotaBehavior: 'Soft cap',
    overage: '$0.80 per 1K extra',
    rateLimit: '1,000 req/min',
    apiKeys: 'Unlimited',
    support: 'Priority email + Discord',
    sla: '99.9% uptime + status page',
  },
];

export const SHARED_FEATURES: string[] = [
  'Stocks + Crypto + Polymarket',
  'KapitResponse envelope',
  'Structured recovery errors',
  '/llms.txt',
  'Source / provider metadata',
];
