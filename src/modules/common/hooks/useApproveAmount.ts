import { useCallback, useMemo } from 'react';
import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from '@reduxjs/toolkit/dist/query';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  UseLazyQuery,
  UseQuery,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import { ZERO } from 'modules/common';

export interface UseApproveAmountExtraOptions {
  tokenAddress?: string;
  targetAddress?: string;
}

interface UseApproveAmountArgs extends UseApproveAmountExtraOptions {
  value: BigNumber;
}

interface UseApproveAmountResult {
  loading: boolean;
  approve: (value: BigNumber) => Promise<void>;
  approvedAmount: BigNumber;
}

export function useApproveAmount(
  useLazyApprove: UseLazyQuery<
    QueryDefinition<
      UseApproveAmountArgs,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, unknown>,
        FetchBaseQueryMeta
      >,
      never,
      TransactionReceipt
    >
  >,
  useGetApprovedAmount: UseQuery<
    QueryDefinition<
      UseApproveAmountExtraOptions,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, unknown>,
        FetchBaseQueryMeta
      >,
      string,
      BigNumber
    >
  >,
  options?: UseApproveAmountExtraOptions,
): UseApproveAmountResult {
  const { targetAddress, tokenAddress } = options ?? {};

  const params = useMemo<UseApproveAmountExtraOptions>(() => {
    const result: Record<string, string> = {};

    if (tokenAddress) {
      result.tokenAddress = tokenAddress;
    }

    if (targetAddress) {
      result.targetAddress = targetAddress;
    }

    return result;
  }, [targetAddress, tokenAddress]);

  const { data: approvedAmount = ZERO } = useGetApprovedAmount(params);
  const [approve, { isLoading: loading }] = useLazyApprove();

  const approveAmount = useCallback(
    async (value: BigNumber) => {
      if (value.isLessThanOrEqualTo(approvedAmount)) {
        return;
      }

      const approveOptions = params ? { value, ...params } : { value };
      await approve(approveOptions);
    },
    [approve, approvedAmount, params],
  );

  return {
    loading,
    approvedAmount,
    approve: approveAmount,
  };
}
