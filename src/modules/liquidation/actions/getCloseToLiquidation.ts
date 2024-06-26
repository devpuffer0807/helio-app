import {
  CloseToLiquidationUser,
  LiquidationApi,
} from 'modules/api/LiquidationApi';
import { web3Api } from 'modules/store';

interface Args {
  limit: number;
  offset: number;
  shouldCombine?: boolean;
}

interface Cache {
  data: CloseToLiquidationUser[];
  offset: number;
}

let cache: Cache = {
  data: [],
  offset: 0,
};

export type UseGetCloseToLiquidationQueryResponse = {
  data: CloseToLiquidationUser[];
  offset: number;
  hasMore: boolean;
};

export const {
  useGetCloseToLiquidationQuery,
  endpoints: { getCloseToLiquidation },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getCloseToLiquidation: build.query<
      UseGetCloseToLiquidationQueryResponse,
      Args
    >({
      queryFn: async ({ limit, offset, shouldCombine }) => {
        const actualOffset = cache.offset || offset;
        const api = LiquidationApi.getInstance();
        const data = await api.getCloseToLiquidation({
          offset: actualOffset,
          limit,
        });
        const hasMore = data.users.length >= limit;

        if (shouldCombine) {
          cache.offset += limit;
          cache.data = [...cache.data, ...data.users];

          return {
            data: {
              ...data,
              ...cache,
              hasMore,
            },
          };
        }

        cache = {
          data: [],
          offset: 0,
        };

        return {
          data: {
            ...data.users,
            ...cache,
            hasMore,
          },
        };
      },
    }),
  }),
});
