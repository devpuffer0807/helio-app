import { AnalyticsApi, GetTotalReservePool } from 'modules/api/AnalyticsApi';
import { web3Api } from 'modules/store';

export const {
  useAnalyticsGetTotalReservePoolQuery,
  endpoints: { analyticsGetTotalReservePool },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    analyticsGetTotalReservePool: build.query<GetTotalReservePool[], number>({
      queryFn: async fromDate => {
        const api = AnalyticsApi.getInstance();
        const data = await api.getTotalReservePool(fromDate);

        return { data };
      },
    }),
  }),
});
