import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { fromWei, toWei } from 'web3-utils';

import {
  BNB_ESTIMATE_GAS_MULTIPLIER,
  BNB_STAKING_MAX_DECIMALS_LEN,
} from '../consts';

const MAX_LENGTH = 12;

export function cropString(value: string, length = 5): string {
  if (value.length < MAX_LENGTH) {
    return value;
  }

  return `${value.slice(0, length)}...${value.slice(-length + 1)}`;
}

export function keepValueInRange(
  value: BigNumber,
  minValue: BigNumber,
  maxValue: BigNumber,
): BigNumber {
  if (value.isLessThan(minValue)) return minValue;
  if (value.isGreaterThan(maxValue)) return maxValue;

  return value;
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function convertFromWei(value: string): BigNumber {
  if (Number.isNaN(Number(value))) {
    throw new Error('Value is not a valid number');
  }

  return new BigNumber(fromWei(value));
}

export function convertToWei(value: BigNumber | string | number): string {
  const BNValue = value instanceof BigNumber ? value : new BigNumber(value);

  if (BNValue.isNaN()) {
    throw new Error('Value is not a valid number');
  }

  return toWei(BNValue.toString());
}

export function convertToHex(value: BigNumber): string {
  const valueAsWei = Web3.utils.toWei(value.toString());

  return Web3.utils.numberToHex(valueAsWei);
}

export function getSafeHexAmount(amount: BigNumber): string {
  const safeAmount = amount.decimalPlaces(
    BNB_STAKING_MAX_DECIMALS_LEN,
    BigNumber.ROUND_DOWN,
  );

  return convertToHex(safeAmount);
}

export function increaseGasFeeByMultiplier(gasFee: number): number {
  return Math.round(gasFee * BNB_ESTIMATE_GAS_MULTIPLIER);
}
