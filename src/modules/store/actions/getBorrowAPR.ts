import BigNumber from 'bignumber.js';

import { convertFromWei } from 'modules/common';
import {
  CollateralToken,
  ContractsManager,
  getCollateralToken,
} from 'modules/core';

import { web3Api } from '../queries';

export const {
  useGetBorrowAPRQuery,
  endpoints: { getBorrowAPR },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getBorrowAPR: build.query<BigNumber, { token: CollateralToken }>({
      queryFn: async ({ token }) => {
        const instance = await ContractsManager.getInstance();
        const { address } = getCollateralToken(token);
        const contract = await instance.getInteractionContract();
        const result = await contract.methods.borrowApr(address).call();

        return { data: convertFromWei(result) };
      },
    }),
  }),
});
