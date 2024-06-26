import BigNumber from 'bignumber.js';

import { EarnApi } from 'modules/api/EarnApi';
import { ZERO } from 'modules/common';
import { web3Api } from 'modules/store';

export const {
  useGetQuollTVLQuery,
  endpoints: { getQuollTVL },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getQuollTVL: build.query<BigNumber, void>({
      queryFn: async () => {
        const api = EarnApi.getInstance();
        const data = await api.getQuollPool();
        const result = new BigNumber(data?.tvl ?? ZERO);

        return { data: result };
      },
    }),
  }),
});
