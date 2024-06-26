import BigNumber from 'bignumber.js';

import { AnalyticsApi, FarmingAPR } from 'modules/api/AnalyticsApi';
import { ZERO } from 'modules/common';
import { web3Api } from 'modules/store/queries';

export const {
  useGetPancakeSwapHayBusdAPRQuery,
  endpoints: { getPancakeSwapHayBusdAPR },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getPancakeSwapHayBusdAPR: build.query<FarmingAPR, void>({
      queryFn: async () => {
        const api = AnalyticsApi.getInstance();
        const data = await api.getAPR();

        return {
          data: {
            apr: new BigNumber(data.apr),
            cakeApr: new BigNumber(data.cakeApr),
            lpApr: new BigNumber(data.lpApr),
            ourApr: new BigNumber(data.ourApr),
            pancakeStable: {
              apr: new BigNumber(data.pancakeStable?.apr ?? ZERO),
              cakeApr: new BigNumber(data.pancakeStable?.cakeApr ?? ZERO),
              lpApr: new BigNumber(data.pancakeStable?.lpApr ?? ZERO),
              ourApr: new BigNumber(data.pancakeStable?.ourApr ?? ZERO),
            },
          },
        };
      },
    }),
  }),
});
