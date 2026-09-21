export type CurrencyCode = 'GBP' | 'USD' | 'EUR' | 'AED' | 'SAR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  rate: number; // multiplier against GBP
  freeShippingThreshold: number; // in local currency
  prefix: string;
  suffix?: string;
  decimals: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'United Kingdom (GBP £)',
    flag: '🇬🇧',
    rate: 1.0,
    freeShippingThreshold: 70,
    prefix: '£',
    decimals: 2,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'United States (USD $)',
    flag: '🇺🇸',
    rate: 1.28,
    freeShippingThreshold: 100,
    prefix: '$',
    decimals: 2,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'European Union (EUR €)',
    flag: '🇪🇺',
    rate: 1.18,
    freeShippingThreshold: 85,
    prefix: '€',
    decimals: 2,
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    name: 'United Arab Emirates (AED)',
    flag: '🇦🇪',
    rate: 4.7,
    freeShippingThreshold: 350,
    prefix: 'AED ',
    decimals: 2,
  },
  SAR: {
    code: 'SAR',
    symbol: 'SAR',
    name: 'Saudi Arabia (SAR)',
    flag: '🇸🇦',
    rate: 4.8,
    freeShippingThreshold: 360,
    prefix: 'SAR ',
    decimals: 2,
  },
};

export const DEFAULT_CURRENCY: CurrencyCode = 'GBP';

/**
 * Converts a base price in GBP to the target currency and formats it cleanly.
 * @param amountInGbp Raw price in GBP pounds (e.g. 69.00)
 * @param currency Target currency code
 */
export function formatCurrency(amountInGbp: number, currency: CurrencyCode = DEFAULT_CURRENCY): string {
  const config = CURRENCIES[currency] || CURRENCIES.GBP;
  const converted = amountInGbp * config.rate;
  const formattedNumber = converted.toLocaleString(undefined, {
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  });

  if (config.suffix) {
    return `${config.prefix}${formattedNumber} ${config.suffix}`;
  }
  return `${config.prefix}${formattedNumber}`;
}

/**
 * Converts an amount from GBP to local currency numeric value.
 */
export function convertFromGbp(amountInGbp: number, currency: CurrencyCode = DEFAULT_CURRENCY): number {
  const config = CURRENCIES[currency] || CURRENCIES.GBP;
  return amountInGbp * config.rate;
}
