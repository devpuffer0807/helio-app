import { LiquidationApi, LiquidationUser } from 'modules/api/LiquidationApi';
import { web3Api } from 'modules/store';

interface Args {
  limit: number;
  offset: number;
  shouldCombine?: boolean;
}

interface Cache {
  data: LiquidationUser[];
  offset: number;
}

export type UseGetToBeLiquidatedQueryResponse = {
  data: LiquidationUser[];
  offset: number;
  hasMore: boolean;
};

let cache: Cache = {
  data: [],
  offset: 0,
};

export const {
  useGetToBeLiquidatedQuery,
  endpoints: { getToBeLiquidated },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getToBeLiquidated: build.query<UseGetToBeLiquidatedQueryResponse, Args>({
      queryFn: async ({ limit, offset, shouldCombine }) => {
        const actualOffset = cache.offset || offset;
        const api = LiquidationApi.getInstance();
        const data = await api.getToBeLiquidated({
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
