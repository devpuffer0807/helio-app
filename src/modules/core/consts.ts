import BigNumber from 'bignumber.js';
import contracts from 'contracts';

import {
  WITHDRAWAL_TOKENS_ETH,
  WITHDRAWAL_TOKENS_MAIN,
} from 'modules/earn/consts';

import ethCollateralTokenIcon from './assets/eth-collateral-token.svg';
import mainCollateralTokenIcon from './assets/main-collateral-token.svg';
import secondCollateralTokenIcon from './assets/second-collateral-token.svg';
import snbnbCollateralTokenIcon from './assets/snbnb-collateral-token.svg';
import wbethCollateralTokenIcon from './assets/wbeth-collateral-token.svg';
import { CollateralTokenData } from './types';

export const INTERACTION_CONTRACT_ADDRESS = contracts.interaction;

export const REWARDS_CONTRACT_ADDRESS = contracts.rewards;

export const PROVIDER_CONTRACT_ADDRESS = contracts.provider;

export const ETH_PROVIDER_CONTRACT_ADDRESS = contracts.ethProvider;

export const JAR_CONTRACT_ADDRESS = contracts.jar;

export const VAT_CONTRACT_ADDRESS = contracts.vat;

export const FARMING_CONTRACT_ADDRESS = contracts.farming;

export const PANCAKE_ROUTER_ADDRESS = contracts.pancakeRouter;

export const PANCAKE_DEPOSIT_PROXY_ADDRESS = contracts.pancakeDepositProxy;
export const PANCAKE_DEPOSIT_PROXY_STABLE_ADDRESS =
  contracts.pancakeDepositProxyStable;

export const COLLATERAL_MAIN_TOKEN_ADDRESS = contracts.collateralCeABNBc;

export const COLLATERAL_SECOND_TOKEN_ADDRESS = contracts.collateralBUSD;

export const COLLATERAL_ETH_TOKEN_ADDRESS = contracts.collateralETH;

export const COLLATERAL_SNBNB_TOKEN_ADDRESS = contracts.collateralSNBNB;

export const COLLATERAL_WBETH_TOKEN_ADDRESS = contracts.collateralWBETH;

export const SNBNB_TOKEN_ADDRESS = contracts.SNBNB;

export const WBETH_TOKEN_ADDRESS = contracts.wBETH;

export const ETH_TOKEN_ADDRESS = contracts.ETH;

export const BINANCE_POOL_ADDRESS = contracts.binancePool;

export const CEETHVAULT_ADDRESS = contracts.ceETHVault;

export const DISABLE_MULTI_COLLATERAL = Boolean(
  process.env.REACT_APP_DISABLE_MULTI_COLLATERAL as string,
);

const TEST_NET_MIN_COLLATERAL_MAIN_TOKEN_AMOUNT = new BigNumber(0.1);
const MAIN_NET_MIN_COLLATERAL_MAIN_TOKEN_AMOUNT = new BigNumber(0.1);

const TEST_NET_MIN_COLLATERAL_ETH_TOKEN_AMOUNT = new BigNumber(0.1);
const MAIN_NET_MIN_COLLATERAL_ETH_TOKEN_AMOUNT = new BigNumber(0.1);

const TEST_NET_MIN_COLLATERAL_SNBNB_TOKEN_AMOUNT = new BigNumber(0.1);
const MAIN_NET_MIN_COLLATERAL_SNBNB_TOKEN_AMOUNT = new BigNumber(0.1);

const TEST_NET_MIN_COLLATERAL_WBETH_TOKEN_AMOUNT = new BigNumber(0.1);
const MAIN_NET_MIN_COLLATERAL_WBETH_TOKEN_AMOUNT = new BigNumber(0.1);

const TEST_NET_MIN_WITHDRAWAL_AMOUNT = new BigNumber(0.1);
const MAIN_NET_MIN_WITHDRAWAL_AMOUNT = new BigNumber(0.1);

export enum CollateralToken {
  Main = 'BNB',
  Second = 'BUSD',
  Eth = 'ETH',
  SnBNB = 'SnBNB',
  WBETH = 'WBETH',
}
const ZERO = new BigNumber(0);

// DON'T USE IT DIRECTLY
// pls use useCollateralToken/getCollateralToken methods
export const COLLATERAL_TOKEN: Record<CollateralToken, CollateralTokenData> = {
  [CollateralToken.Main]: {
    token: CollateralToken.Main,
    icon: mainCollateralTokenIcon,
    address: COLLATERAL_MAIN_TOKEN_ADDRESS,
    ilkAddress: contracts.ilkCeABNBc,
    unit: 'BNB',
    shouldApprove: false,
    relayerFee: new BigNumber(
      process.env.REACT_APP_MAIN_COLLATERAL_TOKEN_RELAYER_FEE as string,
    ),
    minCollateralAmount:
      process.env.REACT_APP_ENV === 'prod'
        ? MAIN_NET_MIN_COLLATERAL_MAIN_TOKEN_AMOUNT
        : TEST_NET_MIN_COLLATERAL_MAIN_TOKEN_AMOUNT,
    minWithdrawalAmount:
      process.env.REACT_APP_ENV === 'prod'
        ? MAIN_NET_MIN_WITHDRAWAL_AMOUNT
        : TEST_NET_MIN_WITHDRAWAL_AMOUNT,
    withdrawalTokens: WITHDRAWAL_TOKENS_MAIN,
  },
  [CollateralToken.Second]: {
    token: CollateralToken.Second,
    icon: secondCollateralTokenIcon,
    address: COLLATERAL_SECOND_TOKEN_ADDRESS,
    ilkAddress: contracts.ilkBUSD,
    unit: 'BUSD',
    shouldApprove: true,
    relayerFee: ZERO,
    minCollateralAmount: ZERO,
    minWithdrawalAmount: ZERO,
    withdrawalTokens: [],
  },
  [CollateralToken.Eth]: {
    token: CollateralToken.Eth,
    icon: ethCollateralTokenIcon,
    address: COLLATERAL_ETH_TOKEN_ADDRESS,
    ilkAddress: contracts.ilkETH,
    unit: 'ETH',
    shouldApprove: true,
    relayerFee: ZERO,
    minCollateralAmount:
      process.env.REACT_APP_ENV === 'prod'
        ? MAIN_NET_MIN_COLLATERAL_ETH_TOKEN_AMOUNT
        : TEST_NET_MIN_COLLATERAL_ETH_TOKEN_AMOUNT,
    minWithdrawalAmount:
      process.env.REACT_APP_ENV === 'prod'
        ? MAIN_NET_MIN_WITHDRAWAL_AMOUNT
        : TEST_NET_MIN_WITHDRAWAL_AMOUNT,
    withdrawalTokens: WITHDRAWAL_TOKENS_ETH,
  },
  [CollateralToken.SnBNB]: {
    token: CollateralToken.SnBNB,
    icon: snbnbCollateralTokenIcon,
    address: COLLATERAL_SNBNB_TOKEN_ADDRESS,
    ilkAddress: contracts.ilkSNBNB,
    unit: 'SnBNB',
    shouldApprove: true,
    relayerFee: ZERO,
    minCollateralAmount:
      process.env.REACT_APP_ENV === 'prod'
        ? MAIN_NET_MIN_COLLATERAL_SNBNB_TOKEN_AMOUNT
        : TEST_NET_MIN_COLLATERAL_SNBNB_TOKEN_AMOUNT,
    minWithdrawalAmount:
      process.env.REACT_APP_ENV === 'prod'
        ? MAIN_NET_MIN_WITHDRAWAL_AMOUNT
        : TEST_NET_MIN_WITHDRAWAL_AMOUNT,
    withdrawalTokens: WITHDRAWAL_TOKENS_ETH,
  },
  [CollateralToken.WBETH]: {
    token: CollateralToken.WBETH,
    icon: wbethCollateralTokenIcon,
    address: COLLATERAL_WBETH_TOKEN_ADDRESS,
    ilkAddress: contracts.ilkWBETH,
    unit: 'WBETH',
    shouldApprove: true,
    relayerFee: ZERO,
    minCollateralAmount:
      process.env.REACT_APP_ENV === 'prod'
        ? MAIN_NET_MIN_COLLATERAL_WBETH_TOKEN_AMOUNT
        : TEST_NET_MIN_COLLATERAL_WBETH_TOKEN_AMOUNT,
    minWithdrawalAmount:
      process.env.REACT_APP_ENV === 'prod'
        ? MAIN_NET_MIN_WITHDRAWAL_AMOUNT
        : TEST_NET_MIN_WITHDRAWAL_AMOUNT,
    withdrawalTokens: WITHDRAWAL_TOKENS_ETH,
  },
};
