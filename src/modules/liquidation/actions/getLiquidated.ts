import { LiquidatedUser, LiquidationApi } from 'modules/api/LiquidationApi';
import { web3Api } from 'modules/store';

interface Args {
  limit: number;
  offset: number;
  shouldCombine?: boolean;
}

interface Cache {
  data: LiquidatedUser[];
  offset: number;
}

export type UseGetLiquidatedQueryResponse = {
  data: LiquidatedUser[];
  offset: number;
  hasMore: boolean;
};

let cache: Cache = {
  data: [],
  offset: 0,
};

export const {
  useGetLiquidatedQuery,
  endpoints: { getLiquidated },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getLiquidated: build.query<UseGetLiquidatedQueryResponse, Args>({
      queryFn: async ({ limit, offset, shouldCombine }) => {
        const actualOffset = cache.offset || offset;
        const api = LiquidationApi.getInstance();
        const data = await api.getLiquidated({
          offset: actualOffset,
          limit,
        });
        const hasMore = data.length >= limit;

        if (shouldCombine) {
          cache.offset += limit;
          cache.data = [...cache.data, ...data];

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
            ...data,
            ...cache,
            hasMore,
          },
        };
      },
    }),
  }),
});
