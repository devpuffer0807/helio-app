import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from '@reduxjs/toolkit/dist/query';
import { ApiEndpointQuery } from '@reduxjs/toolkit/dist/query/core/module';
import {
  UseLazyQuery,
  UseQuery,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import BigNumber from 'bignumber.js';

import { IWeb3SendResult } from 'modules/provider';

interface Token {
  name: string;
  balance: BigNumber;
  isBound: boolean;
  equivalent: BigNumber;
  address: string;
}

interface LPToken {
  name: string;
  balance: BigNumber;
  price: BigNumber;
  address: string;
}

interface RewardToken {
  name: string;
  balance: BigNumber;
}

export interface BoostedVault {
  id: string;
  poolId: string;
  name: string;
  strategyAddress: string;
  proxyAddress: string;
  farmingAddress: string;
  staked: BigNumber;
  APR: BigNumber;
  TVL: BigNumber;
  rewardToken: RewardToken;
  tokens: [Token, Token];
  lpToken: LPToken;
  APRDetails?: Record<string, string>;
  type?: 'stable';
  isStakeActive?: boolean;
  showZeroAPR?: boolean;
  showOnlyForStakedUsers?: boolean;
  description: string;
}

export interface BoostedExternalVault {
  id: string;
  poolId: string;
  name: string;
  staked: BigNumber;
  APR: BigNumber;
  TVL: BigNumber;
  rewardToken: RewardToken;
  tokens: [Token, Token];
  lpToken: LPToken;
  APRDetails?: Record<string, string>;
  type?: 'stable';
  isStakeActive?: boolean;
  showZeroAPR?: boolean;
  showZeroTVL?: boolean;
  showOnlyForStakedUsers?: boolean;
  link: string;
  description: string;
}

export interface DepositPairArgs {
  firstAddress: string;
  secondAddress: string;
  firstAmount: BigNumber;
  secondAmount: BigNumber;
}

export interface DepositLPArgs {
  value: BigNumber;
  lpAddress: string;
  poolId: string;
}

export interface GetSharesArgs {
  strategyAddress: string;
  poolId: string;
}

export interface BoostedVaultEntry {
  id: string;
  poolId: string;
  type?: string;
  getInfo: ApiEndpointQuery<
    QueryDefinition<
      void,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, string>,
        FetchBaseQueryMeta
      >,
      never,
      BoostedVault
    >,
    never
  >;
  useGetInfo: UseQuery<
    QueryDefinition<
      void,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, string>,
        FetchBaseQueryMeta
      >,
      never,
      BoostedVault
    >
  >;
  useGetShares: UseQuery<
    QueryDefinition<
      GetSharesArgs,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, string>,
        FetchBaseQueryMeta
      >,
      never,
      BigNumber
    >
  >;
  useDepositPair: UseLazyQuery<
    QueryDefinition<
      DepositPairArgs,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, unknown>,
        FetchBaseQueryMeta
      >,
      never,
      IWeb3SendResult,
      'api'
    >
  >;
  useDepositLP: UseLazyQuery<
    QueryDefinition<
      DepositLPArgs,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, unknown>,
        FetchBaseQueryMeta
      >,
      never,
      IWeb3SendResult,
      'api'
    >
  >;
}
