import { AnalyticsApi, GetTotalValueLocked } from 'modules/api/AnalyticsApi';
import { COLLATERAL_MAIN_TOKEN_ADDRESS } from 'modules/core';
import { web3Api } from 'modules/store';

export const {
  useAnalyticsGetTotalValueLockedQuery,
  endpoints: { analyticsGetTotalValueLocked },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    analyticsGetTotalValueLocked: build.query<GetTotalValueLocked[], number>({
      queryFn: async fromDate => {
        const api = AnalyticsApi.getInstance();
        const data = await api.getTotalValueLocked(
          COLLATERAL_MAIN_TOKEN_ADDRESS,
          fromDate,
        );

        return { data };
      },
    }),
  }),
});
