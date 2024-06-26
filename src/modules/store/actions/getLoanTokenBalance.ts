import BigNumber from 'bignumber.js';

import { convertFromWei } from 'modules/common';
import { ContractsManager } from 'modules/core';

import { web3Api } from '../queries';
import { getAccount } from './getAccount';

export const {
  useGetLoanTokenBalanceQuery,
  endpoints: { getLoanTokenBalance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getLoanTokenBalance: build.query<BigNumber, void>({
      queryFn: async (_, { getState }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);
        const instance = await ContractsManager.getInstance();
        const contract = await instance.getLoanTokenContract();

        const result = await contract.methods.balanceOf(account).call();

        return { data: convertFromWei(result) };
      },
    }),
  }),
});
