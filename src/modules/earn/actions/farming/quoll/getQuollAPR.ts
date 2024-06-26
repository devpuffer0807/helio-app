import BigNumber from 'bignumber.js';

import { EarnApi } from 'modules/api/EarnApi';
import { HUNDRED, ZERO } from 'modules/common';
import { web3Api } from 'modules/store';

export const {
  useGetQuollAPRQuery,
  endpoints: { getQuollAPR },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getQuollAPR: build.query<BigNumber, void>({
      queryFn: async () => {
        const api = EarnApi.getInstance();
        const data = await api.getQuollPool();
        const result = new BigNumber(data?.apr ?? ZERO).multipliedBy(HUNDRED);

        return { data: result };
      },
    }),
  }),
});
