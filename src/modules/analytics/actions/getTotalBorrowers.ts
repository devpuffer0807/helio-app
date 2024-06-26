import { AnalyticsApi, GetTotalBorrowers } from 'modules/api/AnalyticsApi';
import { web3Api } from 'modules/store';

export const {
  useAnalyticsGetTotalBorrowersQuery,
  endpoints: { analyticsGetTotalBorrowers },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    analyticsGetTotalBorrowers: build.query<GetTotalBorrowers[], number>({
      queryFn: async fromDate => {
        const api = AnalyticsApi.getInstance();
        const data = await api.getTotalBorrowers(fromDate);

        return { data };
      },
    }),
  }),
});
