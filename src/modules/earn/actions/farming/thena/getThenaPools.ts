import BigNumber from 'bignumber.js';

import { EarnApi } from 'modules/api/EarnApi';
import { ZERO } from 'modules/common';
import { THENA_POOLS } from 'modules/earn/consts';
import { web3Api } from 'modules/store';

type ThenaPool = typeof THENA_POOLS[number];

export const {
  useGetThenaPoolsQuery,
  endpoints: { getThenaPools },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getThenaPools: build.query<ThenaPool[], void>({
      queryFn: async () => {
        const api = EarnApi.getInstance();
        const data = await api.getThenaFusion();

        const result: ThenaPool[] = [];

        for (const pool of THENA_POOLS) {
          const lpPrice = new BigNumber(
            data?.find(
              item => item.symbol === pool.symbol && item.type === pool.type,
            )?.lpPrice ?? ZERO,
          );

          const TVL = new BigNumber(
            data?.find(
              item => item.symbol === pool.symbol && item.type === pool.type,
            )?.gauge?.totalSupply ?? ZERO,
          ).multipliedBy(lpPrice);

          const APR = new BigNumber(
            data?.find(
              item => item.symbol === pool.symbol && item.type === pool.type,
            )?.gauge?.apr ?? ZERO,
          );

          result.push({
            ...pool,
            useTVL: () => TVL,
            useAPR: () => APR,
          });
        }

        return { data: result };
      },
    }),
  }),
});
