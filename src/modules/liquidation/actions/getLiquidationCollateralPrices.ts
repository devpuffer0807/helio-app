import BigNumber from 'bignumber.js';

import { LiquidationApi } from 'modules/api/LiquidationApi';
import { convertFromWei } from 'modules/common';
import { web3Api } from 'modules/store';

export const {
  useGetLiquidationCollateralPricesQuery,
  endpoints: { getLiquidationCollateralPrices },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getLiquidationCollateralPrices: build.query<
      { [key: string]: BigNumber },
      void
    >({
      queryFn: async () => {
        const api = LiquidationApi.getInstance();
        const data = await api.getLiquidationCollateralPrices();

        const result = Object.entries(data.prices).reduce(
          (acc, [key, value]) => {
            acc[key] = convertFromWei(value);
            return acc;
          },
          {} as Record<string, BigNumber>,
        );

        return { data: result };
      },
    }),
  }),
});
