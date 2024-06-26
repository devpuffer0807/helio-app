import BigNumber from 'bignumber.js';

import { convertFromWei } from 'modules/common';
import { ContractsManager } from 'modules/core';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';

export const {
  useGetRewardsQuery,
  useLazyGetRewardsQuery,
  endpoints: { getRewards },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getRewards: build.query<BigNumber, void>({
      queryFn: async (_, { getState }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getRewardsContract();

        const result = await contract.methods.pendingRewards(account).call();

        return { data: convertFromWei(result) };
      },
    }),
  }),
});
