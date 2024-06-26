import BigNumber from 'bignumber.js';
import contracts from 'contracts';

import { EEthereumNetworkId } from 'modules/provider';

import { isProdEnv } from './utils';

/* common environment (specific environment should be in modules/${projectName} ) */

export const isReactSnap = navigator.userAgent === 'ReactSnap';

export const MAIN_TOKEN_ADDRESS = contracts.collateralCeABNBc;
export const STAKED_TOKEN_ADDRESS = contracts.ankrBNB;
export const LOAN_TOKEN_ADDRESS = contracts.HAY;
export const COLLATERAL_SECOND_TOKEN_ADDRESS = contracts.collateralBUSD;

export const APP_ENV = process.env.REACT_APP_ENV as string;

export const API_DEV_URL = process.env.REACT_APP_API_DEV_URL as string;
export const API_ELLIPSIS_URL = process.env
  .REACT_APP_API_ELLIPSIS_URL as string;
export const API_QUOLL_FINANCE = 'https://quoll.finance/api';
export const API_THENA_FINANCE = 'https://api.thena.fi/api/v1';
export const API_PLANET_FINANCE_HAY_BUSD =
  'https://api.planet.finance/v1/markets/planetHelioUserAssets';
export const API_PLANET_FINANCE_HAY_USDT =
  'https://api.planet.finance/v2/markets/planetHelioUserAssets';

export const TELEGRAM_SUBSCRIPTION_LINK = process.env
  .REACT_APP_TELEGRAM_SUBSCRIPTION_LINK as string;

export const GTM_ID = 'GTM-5PN45VZ';
export const TWITTER_LINK = 'https://twitter.com/Helio_Money';
export const TELEGRAM_LINK = 'https://t.me/helio_money';
export const DISCORD_LINK = 'https://discord.gg/k5JZVQYpUn';
export const MEDIUM_LINK = 'https://medium.com/@Helio-HAY';
export const DOCS_LINK = 'https://docs.helio.money';
export const GITHUB_LINK =
  'https://github.com/helio-money/helio-smart-contracts';
export const BUGBOUNTY_LINK = 'https://immunefi.com/bounty/helio';

export const STAKING_DOCS_LINK =
  'https://docs.helio.money/get-started/stake-hay';
export const FARMING_DOCS_LINK =
  'https://docs.helio.money/get-started/farm-hay';
export const LIQUIDITY_POOLS_DOCS_LINK =
  'https://docs.helio.money/get-started/add-liquidity-to-hay';
export const BOOSTED_VAULTS_DOCS_LINK =
  'https://docs.helio.money/get-started/boost-vault-hay';

export const CAMPAIGN_CMC_LINK =
  'https://karatdao.com/campaign/BSC/token/0x0f0baa72157877f3f39e448a18811c3b93aaaeda';

export const PLANET_BOOSTED_VAULT_LINK = 'https://app.planet.finance/pools';

export const PLANET_HAY_BUSD_DESCRIPTION =
  'Boosted Yield Pool for HAY/BUSD Thena V1 Stable Pool';

export const PLANET_HAY_USDT_VAULT_LINK = 'https://app.planet.finance/pools';
export const PLANET_HAY_USDT_DESCRIPTION =
  'Boosted Yield Pool for HAY/USDT Thena V2 FUSION Stable Pool';

export const EXPLORER_URL = process.env.REACT_APP_EXPLORER_URL as string;
export const RPC_URL = process.env.REACT_APP_RPC_URL as string;
export const NETWORK_NAME = process.env.REACT_APP_NETWORK_NAME as string;
export const ZERO = new BigNumber(0);
export const ONE = new BigNumber(1);
export const HUNDRED = new BigNumber(100);
export const BORROW_LIMIT_PERCENTS = new BigNumber(95);
export const SAFE_BORROW_LIMIT_PERCENTS = 75; // %
export const MAX_DECIMALS = 18;
export const DESKTOP_HEADER_HEIGHT = 104;
export const MOBILE_HEADER_HEIGHT = 60;
export const BORROWED_LIQUIDATION_PERCENT = new BigNumber(95);
export const CHAIN_ID = (() => {
  const chainId = parseInt(
    process.env.REACT_APP_CHAIN_ID ?? '',
    10,
  ) as EEthereumNetworkId;
  if (!chainId) {
    throw new Error('Chain id must be initialized');
  }

  return chainId;
})();

export const featuresConfig = {
  dropdownMainToken: !isProdEnv(),
};

/**
 * Magic number to prevent fee calculation issue
 */
export const BNB_ESTIMATE_GAS_MULTIPLIER = 3;

/**
 * Maximum decimals length for the BNB Staking
 */
export const BNB_STAKING_MAX_DECIMALS_LEN = 8;

/**
 * Block offset to get 1 day history events
 */
export const BINANCE_HISTORY_1_DAY_BLOCK_OFFSET = 28_800;

/**
 * Events block range for stake/unstake history
 * @note  ~3h = 3_000 blocks for testnet, ~2.5h = 2_500 blocks for mainnet
 */
export const BNB_MAX_BLOCK_RANGE = isProdEnv() ? 2_500 : 3_000;

export const ONE_DAY_IN_SECONDS = 86400;

export const DEFAULT_FETCH_LIMIT = 20;

export const IS_ANALYTICS_ENABLED = true;

export const WALLET_PARAM_ID = 'wallet';

export const HOMEPAGE = 'app/dashboard';

export const DAYS_TO_WITHDRAWAL = 15;
