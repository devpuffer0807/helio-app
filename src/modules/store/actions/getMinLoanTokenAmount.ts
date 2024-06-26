import BigNumber from 'bignumber.js';

import { convertFromWei } from 'modules/common';
import {
  CollateralToken,
  ContractsManager,
  getCollateralToken,
} from 'modules/core';

import { web3Api } from '../queries';

const DECIMALS = 1e27;

export const {
  useGetMinLoanTokenAmountQuery,
  endpoints: { getMinLoanTokenAmount },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getMinLoanTokenAmount: build.query<BigNumber, { token: CollateralToken }>({
      queryFn: async ({ token }) => {
        const { ilkAddress } = getCollateralToken(token);
        const manager = await ContractsManager.getInstance();

        const contract = await manager.getVatContract();
        const { dust } = await contract.methods.ilks(ilkAddress).call();
        const dustConverted = convertFromWei(dust);

        return { data: new BigNumber(dustConverted).dividedBy(DECIMALS) };
      },
    }),
  }),
});
