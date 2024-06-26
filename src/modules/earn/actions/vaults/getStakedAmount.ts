import BigNumber from 'bignumber.js';

import { convertFromWei } from 'modules/common';
import { ContractsManager } from 'modules/core';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';

export const {
  useGetStakedAmountQuery,
  endpoints: { getStakedAmount },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getStakedAmount: build.query<BigNumber, string>({
      queryFn: async (poolId, { getState }) => {
        const state: RootState = getState();
        const { data: currentAccount = '' } = getAccount.select()(state);

        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getFarmingContract();

        const staked = await contract.methods
          .stakedWantTokens(poolId, currentAccount)
          .call();

        return { data: convertFromWei(staked) };
      },
    }),
  }),
});
