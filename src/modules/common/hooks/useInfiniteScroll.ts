import { useCallback } from 'react';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from '@reduxjs/toolkit/query';

import { DEFAULT_FETCH_LIMIT } from '../consts';
import { useIntersect } from './useIntersect';

interface Props {
  limit?: number;
  offset?: number;
}

type UseInfiniteScrollResult<R, T> = [
  (node: R) => void,
  {
    data: T | undefined;
    isFetching: boolean;
    hasMore: boolean;
  },
];

interface FetchCallArgs {
  limit: number;
  offset: number;
  shouldCombine?: boolean;
}

const INITIAL_OFFSET = 0;

export function useInfiniteScroll<
  R extends Element,
  T extends { offset: number; data: unknown[]; hasMore: boolean },
>(
  useFetchData: UseQuery<
    QueryDefinition<
      FetchCallArgs,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, unknown>,
        FetchBaseQueryMeta
      >,
      string,
      T,
      string
    >
  >,
  props?: Props,
): UseInfiniteScrollResult<R, T> {
  const { limit = DEFAULT_FETCH_LIMIT, offset = INITIAL_OFFSET } = props ?? {};
  const { data, isFetching, refetch } = useFetchData({
    shouldCombine: true,
    offset,
    limit,
  });
  const isDone = data ? data.data.length < limit : false;

  const handleIntersect = useCallback(() => {
    if (!isDone) {
      void refetch();
    }
  }, [isDone, refetch]);

  const [ref] = useIntersect<R>(handleIntersect);

  return [
    ref,
    {
      data,
      isFetching,
      hasMore: data?.hasMore ?? false,
    },
  ];
}
