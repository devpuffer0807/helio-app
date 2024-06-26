import {
  UseLazyQuery,
  UseQuery,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from '@reduxjs/toolkit/query';
import BigNumber from 'bignumber.js';

import { IWeb3SendResult } from 'modules/provider';

interface StakingToken {
  balance: BigNumber;
  price: BigNumber;
  address: string;
  name: string;
}

interface RewardToken {
  name: string;
  balance: BigNumber;
}

export interface StakingTokenInfo {
  poolName: string;
  stakingId: string;
  name: string;
  targetAddress: string;
  staked: BigNumber;
  APR: BigNumber;
  TVL: BigNumber;
  rewardToken: RewardToken;
  token: StakingToken;
  description: string;
}

export interface StakingTokenEntry {
  id: string;
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
      StakingTokenInfo
    >
  >;
  useDeposit: UseLazyQuery<
    QueryDefinition<
      BigNumber,
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
