import BigNumber from 'bignumber.js';

import { CollateralToken } from './consts';

export type WithdrawableToken = {
  name: string;
  period: string;
  address: string;
  token_address: string;
};

export interface CollateralTokenData {
  token: CollateralToken;
  icon: string;
  address: string;
  ilkAddress: string;
  unit: string;
  shouldApprove: boolean;
  relayerFee: BigNumber;
  minCollateralAmount: BigNumber;
  minWithdrawalAmount: BigNumber;
  withdrawalTokens: WithdrawableToken[];
}
