import BigNumber from 'bignumber.js';

import { EarnApi } from 'modules/api/EarnApi';
import { ZERO } from 'modules/common';
import { web3Api } from 'modules/store';

import { ELLIPSIS_FINANCE_ADDRESS } from '../../../consts';

export const {
  useGetEllipsisFinanceAPRQuery,
  endpoints: { getEllipsisFinanceAPR },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getEllipsisFinanceAPR: build.query<BigNumber, void>({
      queryFn: async () => {
        const api = EarnApi.getInstance();
        const data = await api.getEllipsisFinancePool(ELLIPSIS_FINANCE_ADDRESS);
        const result = new BigNumber(data?.rewards[0]?.rewardsApy ?? ZERO);

        return { data: result };
      },
    }),
  }),
});
