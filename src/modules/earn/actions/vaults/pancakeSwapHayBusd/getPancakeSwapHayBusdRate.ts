import BigNumber from 'bignumber.js';

import {
  convertFromWei,
  convertToWei,
  LOAN_TOKEN_ADDRESS,
  ONE,
} from 'modules/common';
import {
  COLLATERAL_SECOND_TOKEN_ADDRESS,
  ContractsManager,
} from 'modules/core';
import { web3Api } from 'modules/store';

export const {
  useGetPancakeSwapHayBusdRateQuery,
  endpoints: { getPancakeSwapHayBusdRate },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getPancakeSwapHayBusdRate: build.query<
      {
        busdPerHayRate: BigNumber;
        hayPerBusdRate: BigNumber;
      },
      void
    >({
      queryFn: async () => {
        const sdk = await ContractsManager.getInstance();
        const routerContract = await sdk.getPancakeRouterContract();
        const lpContract = await sdk.getLoanCollateralSecondLPContract();

        const isHayFirst = new BigNumber(
          Number(COLLATERAL_SECOND_TOKEN_ADDRESS),
        ).isLessThan(new BigNumber(Number(LOAN_TOKEN_ADDRESS)));

        const { 0: firstReserved, 1: secondReserved } = await lpContract.methods
          .getReserves()
          .call();

        const hayReserved = isHayFirst ? firstReserved : secondReserved;
        const busdReserved = isHayFirst ? secondReserved : firstReserved;

        const [hayRate, busdRate] = await Promise.all([
          routerContract.methods
            .quote(
              convertToWei(ONE),
              convertToWei(hayReserved),
              convertToWei(busdReserved),
            )
            .call(),
          routerContract.methods
            .quote(
              convertToWei(ONE),
              convertToWei(busdReserved),
              convertToWei(hayReserved),
            )
            .call(),
        ]);

        return {
          data: {
            busdPerHayRate: convertFromWei(hayRate),
            hayPerBusdRate: convertFromWei(busdRate),
          },
        };
      },
    }),
  }),
});
