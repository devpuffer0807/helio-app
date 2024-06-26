import BigNumber from 'bignumber.js';

import { convertFromWei } from 'modules/common';
import {
  CollateralToken,
  ContractsManager,
  getCollateralToken,
} from 'modules/core';

import { web3Api } from '../queries';
import { getAccount } from './getAccount';

// collateral price which would lead to request for liquidation
export const {
  useGetLiquidationPriceQuery,
  endpoints: { getLiquidationPrice },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getLiquidationPrice: build.query<BigNumber, { token: CollateralToken }>({
      queryFn: async ({ token }, { getState }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getInteractionContract();
        const { address } = getCollateralToken(token);

        const result = await contract.methods
          .currentLiquidationPrice(address, account)
          .call();

        return { data: convertFromWei(result) };
      },
    }),
  }),
});
