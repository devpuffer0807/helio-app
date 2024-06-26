import { useCallback, useEffect, useState } from 'react';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from '@reduxjs/toolkit/dist/query';
import { UseLazyQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { TransactionReceipt } from 'web3-core';

import { IWeb3SendResult } from 'modules/provider';

interface UseTransactionAction {
  loading: boolean;
  executed: boolean;
  data: {
    receipt?: TransactionReceipt;
    transactionHash?: string;
  };
  error?: Error;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  executeAction: (params: any) => Promise<void>;
}

export function useTransactionAction(
  useLazyAction: UseLazyQuery<
    QueryDefinition<
      unknown,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, unknown>,
        FetchBaseQueryMeta
      >,
      never,
      IWeb3SendResult
    >
  >,
): UseTransactionAction {
  const [txError, setTxError] = useState<Error>();
  const [receipt, setReceipt] = useState<TransactionReceipt>();
  const [executed, setExecuted] = useState(false);
  const [action, { data }] = useLazyAction();

  const receiptPromise = data?.receiptPromise;
  useEffect(() => {
    if (!receiptPromise) {
      return;
    }

    void receiptPromise.once('receipt', receipt => {
      setReceipt(receipt);
    });

    void receiptPromise.once('error', error => {
      setTxError(error);
    });
  }, [receiptPromise]);

  const executeAction = useCallback(
    async (values: Record<string, unknown>) => {
      setExecuted(true);
      await action(values).finally(() => {
        setExecuted(false);
      });
    },
    [action],
  );

  const error = txError;
  const loading = !!(data?.transactionHash && !receipt && !error);

  return {
    error,
    loading,
    executed,
    executeAction,
    data: {
      receipt,
      transactionHash: data?.transactionHash,
    },
  };
}
