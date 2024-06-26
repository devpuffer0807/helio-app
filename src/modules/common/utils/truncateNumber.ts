import BigNumber from 'bignumber.js';

export const DEFAULT_DECIMALS = 3;
export const DEFAULT_ROUNDING_MODE = 1;

export function truncateNumber(
  value: BigNumber | string,
  decimals = DEFAULT_DECIMALS,
  toString = false,
): string {
  const BNValue = value instanceof BigNumber ? value : new BigNumber(value);
  const truncatedValue = BNValue.decimalPlaces(decimals, DEFAULT_ROUNDING_MODE);

  return toString ? truncatedValue.toString() : truncatedValue.toFormat();
}
