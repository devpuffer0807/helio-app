import BigNumber from 'bignumber.js';

import { convertFromWei } from 'modules/common';
import {
  COLLATERAL_SECOND_TOKEN_ADDRESS,
  ContractsManager,
} from 'modules/core';

import { web3Api } from '../queries';
import { getAccount } from './getAccount';

export const {
  endpoints: { getCollateralSecondTokenBalance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getCollateralSecondTokenBalance: build.query<BigNumber, void>({
      queryFn: async (_, { getState }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);
        const instance = await ContractsManager.getInstance();
        const contract = await instance.getERC20Contract(
          COLLATERAL_SECOND_TOKEN_ADDRESS,
        );

        const result = await contract.methods.balanceOf(account).call();

        return { data: convertFromWei(result) };
      },
    }),
  }),
});
