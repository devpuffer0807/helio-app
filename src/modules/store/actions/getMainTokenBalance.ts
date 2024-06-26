import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common';

import { web3Api } from '../queries';

export const {
  useGetMainTokenBalanceQuery,
  endpoints: { getMainTokenBalance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getMainTokenBalance: build.query<BigNumber, void>({
      // TODO: Remove mock, add real implementation when we will release MAIN_TOKEN
      queryFn: () => ({ data: ZERO }),
    }),
  }),
});
