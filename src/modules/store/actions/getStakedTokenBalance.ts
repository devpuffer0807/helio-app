import BigNumber from 'bignumber.js';

import { convertFromWei } from 'modules/common';
import { ContractsManager } from 'modules/core';

import { web3Api } from '../queries';
import { getAccount } from './getAccount';

export const {
  useGetStakedTokenBalanceQuery,
  endpoints: { getStakedTokenBalance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getStakedTokenBalance: build.query<BigNumber, void>({
      queryFn: async (_, { getState }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getStakedTokenContract();

        const balance = await contract.methods.balanceOf(account).call();
        return { data: convertFromWei(balance) };
      },
    }),
  }),
});
