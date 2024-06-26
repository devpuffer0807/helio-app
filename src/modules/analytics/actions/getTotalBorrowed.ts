import { AnalyticsApi, GetTotalBorrowed } from 'modules/api/AnalyticsApi';
import { COLLATERAL_MAIN_TOKEN_ADDRESS } from 'modules/core';
import { web3Api } from 'modules/store';

export const {
  useAnalyticsGetTotalBorrowedQuery,
  endpoints: { analyticsGetTotalBorrowed },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    analyticsGetTotalBorrowed: build.query<GetTotalBorrowed[], number>({
      queryFn: async fromDate => {
        const api = AnalyticsApi.getInstance();
        const data = await api.getTotalBorrowed(
          COLLATERAL_MAIN_TOKEN_ADDRESS,
          fromDate,
        );

        return { data };
      },
    }),
  }),
});
