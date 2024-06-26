import BigNumber from 'bignumber.js';
import contracts from 'contracts';

import { useLazyDepositHAYQuery } from './actions/staking/hay/depositHAY';
import { useGetHAYPoolQuery } from './actions/staking/hay/getHAYPool';
import { StakingTokenEntry } from './actions/staking/types';
import { useLazyDepositPancakeSwapHayBusdQuery } from './actions/vaults/pancakeSwapHayBusd/depositPancakeSwapHayBusd';
import { useLazyDepositPancakeSwapHayBusdLPQuery } from './actions/vaults/pancakeSwapHayBusd/depositPancakeSwapHayBusdLP';
import { useLazyDepositPancakeSwapHayBusdStableQuery } from './actions/vaults/pancakeSwapHayBusd/depositPancakeSwapHayBusdStable';
import {
  getPancakeSwapHayBusd,
  useGetPancakeSwapHayBusdQuery,
} from './actions/vaults/pancakeSwapHayBusd/getPancakeSwapHayBusd';
import { useGetPancakeSwapHayBusdSharesQuery } from './actions/vaults/pancakeSwapHayBusd/getPancakeSwapHayBusdShares';
import {
  getPancakeSwapHayBusdStable,
  useGetPancakeSwapHayBusdStableQuery,
} from './actions/vaults/pancakeSwapHayBusd/getPancakeSwapHayBusdStable';
import { BoostedVaultEntry } from './actions/vaults/types';

export const HAY_BUSD_LP_STABLE_TOKEN_ADDRESS = contracts.HAYBUSDLpStable;
export const PANCAKE_STRATEGY_ADDRESS = contracts.pancakeStrategy;
export const PANCAKE_STRATEGY_STABLE_ADDRESS = contracts.pancakeStrategyStable;
export const PANCAKE_STABLE_SWAP = contracts.pancakeStableSwap;
export const LOAN_COLLATERAL_SECOND_LP_TOKEN_ADDRESS = contracts.HAYBUSDLp;
export const LOAN_COLLATERAL_PLANET_LP_TOKEN_ADDRESS =
  contracts.HAYBUSDPlanetLp;
export const ELLIPSIS_FINANCE_ADDRESS = contracts.ellipsisFinance;

export const MAGPIE_PROXY_ADDRESS = contracts.magpieProxy;
export const MAGPIE_MASTER_WOMBAT_ADDRESS = contracts.magpieMasterWombatAddress;
export const MAGPIE_HAY_LP_ADDRESS = contracts.magpieHAYLp;
export const MAGPIE_ROUTER_ADDRESS = contracts.magpieRouter;
export const MAGPIE_MASTER_ADDRESS = contracts.magpieMaster;
export const MAGPIE_MGP_ADDRESS = contracts.magpieMGP;
export const MAGPIE_BUSD_ADDRESS = contracts.magpieBUSD;
export const MAGPIE_STAKING_TOKEN_ADDRESS = contracts.magpieStakingToken;
export const THENA_ADDRESS = contracts.thena;

export const COLLATERAL_SECOND_TOKEN_ADDRESS = contracts.collateralBUSD;
export const LOAN_TOKEN_ADDRESS = contracts.HAY;

export const STAKING_TOKEN_ENTRIES: StakingTokenEntry[] = [
  {
    id: 'hay',
    useGetInfo: useGetHAYPoolQuery,
    useDeposit: useLazyDepositHAYQuery,
  },
];

export const BOOSTED_VAULT_ENTRIES: BoostedVaultEntry[] = [
  {
    id: 'HAY-BUSD',
    poolId: '0',
    getInfo: getPancakeSwapHayBusd,
    useGetInfo: useGetPancakeSwapHayBusdQuery,
    useDepositPair: useLazyDepositPancakeSwapHayBusdQuery,
    useDepositLP: useLazyDepositPancakeSwapHayBusdLPQuery,
    useGetShares: useGetPancakeSwapHayBusdSharesQuery,
  },
  {
    id: 'HAY-BUSD',
    type: 'stable',
    poolId: '1',
    getInfo: getPancakeSwapHayBusdStable,
    useGetInfo: useGetPancakeSwapHayBusdStableQuery,
    useDepositPair: useLazyDepositPancakeSwapHayBusdStableQuery,
    useDepositLP: useLazyDepositPancakeSwapHayBusdLPQuery,
    useGetShares: useGetPancakeSwapHayBusdSharesQuery,
  },
];

export const BOOSTED_EXTERNAL_VAULTS = [];

export const THENA_POOLS = [
  {
    poolName: 'Thena',
    label: 'Thena.fi',
    tokenName: 'HAY/USDT LP',
    link: 'https://thena.fi/liquidity/fusion?currency0=0x0782b6d8c4551b9760e74c0545a9bcd90bdc41e5&currency1=0x55d398326f99059ff775485246999027b3197955&strategy=CL_STABLE',
    useTVL: (): BigNumber => new BigNumber(0),
    useAPR: (): BigNumber => new BigNumber(0),
    showAPR: true,
    showTVL: true,
    description: 'Thena V2 FUSION Stable Pool ',
    symbol: 'HAY/USDT',
    type: 'CL_STABLE',
  },
  {
    poolName: 'Thena',
    label: 'Thena.fi',
    tokenName: 'HAY/FRAX LP',
    link: 'https://thena.fi/liquidity/manage/0x04d6115703b0127888323f142b8046c7c13f857d',
    useTVL: (): BigNumber => new BigNumber(0),
    useAPR: (): BigNumber => new BigNumber(0),
    showAPR: true,
    showTVL: true,
    description: 'Thena V1 Stable Pool',
    symbol: 'HAY/FRAX',
    type: 'STABLE',
  },
  {
    poolName: 'Thena',
    label: 'Thena.fi',
    tokenName: 'HAY/frxETH Narrow',
    link: 'https://thena.fi/liquidity/fusion?currency0=0x0782b6d8c4551b9760e74c0545a9bcd90bdc41e5&currency1=0x64048a7eecf3a2f1ba9e144aac3d7db6e58f555e&strategy=NARROW',
    useTVL: (): BigNumber => new BigNumber(0),
    useAPR: (): BigNumber => new BigNumber(0),
    showAPR: true,
    showTVL: true,
    description: 'Thena V2 FUSION Narrow Pool',
    symbol: 'HAY/frxETH',
    type: 'NARROW',
  },
  {
    poolName: 'Thena',
    label: 'Thena.fi',
    tokenName: 'HAY/BNB Narrow',
    link: 'https://thena.fi/liquidity/fusion?currency0=0x0782b6d8c4551b9760e74c0545a9bcd90bdc41e5&currency1=0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&strategy=NARROW',
    useTVL: (): BigNumber => new BigNumber(0),
    useAPR: (): BigNumber => new BigNumber(0),
    showAPR: true,
    showTVL: true,
    description: 'Thena V2 FUSION Narrow Pool',
    symbol: 'HAY/BNB',
    type: 'NARROW',
  },
  {
    poolName: 'Thena',
    label: 'Thena.fi',
    tokenName: 'SnBNB/BNB LP',
    link: 'https://thena.fi/liquidity/fusion?currency0=0xb0b84d294e0c75a6abe60171b70edeb2efd14a1b&currency1=0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&strategy=CORRELATED',
    useTVL: (): BigNumber => new BigNumber(0),
    useAPR: (): BigNumber => new BigNumber(0),
    showAPR: true,
    showTVL: true,
    description: 'Thena V2 FUSION Correlated Pool',
    symbol: 'SnBNB/BNB',
    type: 'CORRELATED',
  },
];

export const LIQUIDITY_POOLS = [
  {
    poolName: 'Wombat',
    label: 'Wombat',
    tokenName: 'Smart HAY LP',
    link: 'https://app.wombat.exchange/pool?pool=SIDE&token=HAY&action=DEPOSIT&chain=bsc',
    useTVL: (): BigNumber => new BigNumber(0),
    useAPR: (): BigNumber => new BigNumber(0),
    showAPR: false,
    showTVL: false,
    description: 'Single-Sided HAY Staking Pool with USDT and USDC',
  },
  {
    poolName: 'Wombat',
    label: 'Wombat',
    tokenName: 'SnBNB LP',
    link: 'https://app.wombat.exchange/pool?pool=SIDE&token=HAY&action=DEPOSIT&chain=bsc',
    useTVL: (): BigNumber => new BigNumber(0),
    useAPR: (): BigNumber => new BigNumber(0),
    showAPR: false,
    showTVL: false,
    description: 'Single-Sided SnBNB Staking Pool with BNB',
  },
];

export const FARMING_POOLS = [
  {
    poolName: 'PancakeSwap',
    label: 'Pancake Swap',
    tokenName: 'HAY/USDT LP',
    link: 'https://pancakeswap.finance/add/0x0782b6d8c4551b9760e74c0545a9bcd90bdc41e5/0x55d398326f99059ff775485246999027b3197955/500?chain=bsc&minPrice=0.999000781098546620&maxPrice=1.001000021174809573',
    useTVL: (): BigNumber => new BigNumber(0),
    useAPR: (): BigNumber => new BigNumber(0),
    showAPR: false,
    showTVL: false,
    description: 'Pancake Swap V3 Concentrated Liquidity  Pool',
  },
  {
    poolName: 'PancakeSwap',
    label: 'Pancake Swap',
    tokenName: 'HAY/ETH LP',
    link: 'https://pancakeswap.finance/add/0x0782b6d8c4551b9760e74c0545a9bcd90bdc41e5/0x2170ed0880ac9a755fd29b2688956bd959f933f8/2500?chain=bsc&minPrice=0.000317674073960677&maxPrice=0.001275145586833308',
    useTVL: (): BigNumber => new BigNumber(0),
    useAPR: (): BigNumber => new BigNumber(0),
    showAPR: false,
    showTVL: false,
    description: 'Pancake Swap V3 Concentrated Liquidity  Pool',
  },
  {
    poolName: 'PancakeSwap',
    label: 'Pancake Swap',
    tokenName: 'HAY/BTCB LP',
    link: 'https://pancakeswap.finance/add/0x0782b6d8c4551b9760e74c0545a9bcd90bdc41e5/0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c/2500?chain=bsc&minPrice=0.000018385541613413&maxPrice=0.000073763131501106',
    useTVL: (): BigNumber => new BigNumber(0),
    useAPR: (): BigNumber => new BigNumber(0),
    showAPR: false,
    showTVL: false,
    description: 'Pancake Swap V3 Concentrated Liquidity  Pool',
  },
  {
    poolName: 'PancakeSwap',
    label: 'Pancake Swap',
    tokenName: 'HAY/BNB LP',
    link: 'https://pancakeswap.finance/add/0x0782b6d8c4551b9760e74c0545a9bcd90bdc41e5/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c/2500?chain=bsc&minPrice=0.002407357769336822&maxPrice=0.009658796906629881',
    useTVL: (): BigNumber => new BigNumber(0),
    useAPR: (): BigNumber => new BigNumber(0),
    showAPR: false,
    showTVL: false,
    description: 'Pancake Swap V3 Concentrated Liquidity  Pool',
  },
  {
    poolName: 'PancakeSwap',
    label: 'Pancake Swap',
    tokenName: 'SnBNB/BNB LP',
    link: 'https://pancakeswap.finance/add/0xb0b84d294e0c75a6abe60171b70edeb2efd14a1b/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c/500?chain=bsc&minPrice=0.999013937829577037&maxPrice=1.000990607281800671',
    useTVL: (): BigNumber => new BigNumber(0),
    useAPR: (): BigNumber => new BigNumber(0),
    showAPR: false,
    showTVL: false,
    description: 'Pancake Swap V3 Concentrated Liquidity  Pool',
  },
];

export const LENDING_POOLS = [
  {
    poolName: 'Venus',
    label: 'Venus',
    tokenName: 'HAY Isolated LP',
    link: 'https://app.venus.io/#/isolated-pools/pool/0x94c1495cD4c557f1560Cbd68EAB0d197e6291571/market/0xCa2D81AA7C09A1a025De797600A7081146dceEd9',
    useTVL: (): BigNumber => new BigNumber(0),
    useAPR: (): BigNumber => new BigNumber(0),
    showAPR: false,
    showTVL: false,
    description:
      'Borrow HAY against USDT or USDD, or supply HAY as collateral to borrow USDT or USDD',
  },
  {
    poolName: 'Kinza',
    label: 'Kinza Finance',
    tokenName: 'HAY LP',
    link: 'https://app.kinza.finance/#/details/HAY',
    useTVL: (): BigNumber => new BigNumber(0),
    useAPR: (): BigNumber => new BigNumber(0),
    showAPR: false,
    showTVL: false,
    description:
      'Borrow HAY against other stable coins, or supply HAY as collateral to borrow other stable coins',
  },
];

enum Env {
  DEV = 'dev',
  STAGE = 'stage',
  PROD = 'prod',
}

const WITHDRAWAL_TOKENS_FOR_MAIN = {
  [Env.DEV]: [
    {
      name: 'SnBNB',
      period: 'Instant',
      address: '0x01780b0d509c69B8409B64C909661Ea87ddA296B',
      token_address: '0xa5e96AaDc66e48Ff000057C0f932a3C4B71403e8',
    },
    {
      name: 'ankrBNB',
      period: 'Instant',
      address: '0xc19C950372FB4A3b6105Ba288D799aBb4b29BB0c',
      token_address: '0x3C1039C346bd5141BF2D5e855928E61655658fA7',
    },
    {
      name: 'stkBNB',
      period: 'Instant',
      address: '0xD315e3325c1754Cd45eab0FA895511f30F17bEBA',
      token_address: '0xF7CE8444b3b1c62e785a25343a8B4764198A81B8',
    },
    {
      name: 'BNBx',
      period: 'Instant',
      address: '0xCc4ce464bF0de4e8ffCE31237C2c78Ae7476485D',
      token_address: '0x3ECB02c703C815e9cFFd8d9437B7A2F93638d7Cb',
    },
    {
      name: 'BNB',
      period: '7-15 days',
      address: '',
      token_address: '',
    },
  ],
  [Env.STAGE]: [
    {
      name: 'SnBNB',
      period: 'Instant',
      address: '0x01780b0d509c69B8409B64C909661Ea87ddA296B',
      token_address: '0xa5e96AaDc66e48Ff000057C0f932a3C4B71403e8',
    },
    {
      name: 'ankrBNB',
      period: 'Instant',
      address: '0xc19C950372FB4A3b6105Ba288D799aBb4b29BB0c',
      token_address: '0x3C1039C346bd5141BF2D5e855928E61655658fA7',
    },
    {
      name: 'stkBNB',
      period: 'Instant',
      address: '0xD315e3325c1754Cd45eab0FA895511f30F17bEBA',
      token_address: '0xF7CE8444b3b1c62e785a25343a8B4764198A81B8',
    },
    {
      name: 'BNBx',
      period: 'Instant',
      address: '0xCc4ce464bF0de4e8ffCE31237C2c78Ae7476485D',
      token_address: '0x3ECB02c703C815e9cFFd8d9437B7A2F93638d7Cb',
    },
    {
      name: 'BNB',
      period: '7-15 days',
      address: '',
      token_address: '',
    },
  ],
  [Env.PROD]: [
    {
      name: 'SnBNB',
      period: 'Instant',
      address: '0x6F28FeC449dbd2056b76ac666350Af8773E03873',
      token_address: '0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B',
    },
    {
      name: 'ankrBNB',
      period: 'Instant',
      address: '0x00D8697D73216278de8f97BBEaE6ca90cf0a5CB0',
      token_address: '0x52F24a5e03aee338Da5fd9Df68D2b6FAe1178827',
    },
    {
      name: 'stkBNB',
      period: 'Instant',
      address: '0x98CB81d921B8F5020983A46e96595471Ad4E60Be',
      token_address: '0xc2e9d07f66a89c44062459a47a0d2dc038e4fb16',
    },
    {
      name: 'BNBx',
      period: 'Instant',
      address: '0x6ae7073d801a74eE753F19323DF320C8F5Fe2DbC',
      token_address: '0x1bdd3cf7f79cfb8edbb955f20ad99211551ba275',
    },
    {
      name: 'BNB',
      period: '7-15 days',
      address: '',
      token_address: '',
    },
  ],
};

const WITHDRAWAL_TOKENS_FOR_ETH = {
  [Env.DEV]: [
    {
      name: 'ETH',
      period: 'Instant',
      address: '0x2d924a915B1d9a6926366149f8d39509f7D501bB',
      token_address: '0xE7bCB9e341D546b66a46298f4893f5650a56e99E',
    },
    {
      name: 'wBETH',
      period: 'Instant',
      address: '0x2d924a915B1d9a6926366149f8d39509f7D501bB',
      token_address: '0x34f8f72e3f14Ede08bbdA1A19a90B35a80f3E789',
    },
  ],
  [Env.STAGE]: [
    {
      name: 'ETH',
      period: 'Instant',
      address: '0x2d924a915B1d9a6926366149f8d39509f7D501bB',
      token_address: '0xE7bCB9e341D546b66a46298f4893f5650a56e99E',
    },
    {
      name: 'wBETH',
      period: 'Instant',
      address: '0x2d924a915B1d9a6926366149f8d39509f7D501bB',
      token_address: '0x34f8f72e3f14Ede08bbdA1A19a90B35a80f3E789',
    },
  ],
  [Env.PROD]: [
    {
      name: 'ETH',
      period: 'Instant',
      address: '0xA230805C28121cc97B348f8209c79BEBEa3839C0',
      token_address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    },
    {
      name: 'wBETH',
      period: 'Instant',
      address: '0xA230805C28121cc97B348f8209c79BEBEa3839C0',
      token_address: '0xa2E3356610840701BDf5611a53974510Ae27E2e1',
    },
  ],
};

export const WITHDRAWAL_TOKENS_MAIN =
  WITHDRAWAL_TOKENS_FOR_MAIN[process.env.REACT_APP_ENV as Env];

export const WITHDRAWAL_TOKENS_ETH =
  WITHDRAWAL_TOKENS_FOR_ETH[process.env.REACT_APP_ENV as Env];
