import BigNumber from 'bignumber.js';

import { convertFromWei } from 'modules/common';
import { ContractsManager, INTERACTION_CONTRACT_ADDRESS } from 'modules/core';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';

export const {
  useRepayGetApprovedAmountQuery,
  endpoints: { repayGetApprovedAmount },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    repayGetApprovedAmount: build.query<BigNumber, void>({
      queryFn: async (_, { getState }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getLoanTokenContract();
        const amount = await contract.methods
          .allowance(account, INTERACTION_CONTRACT_ADDRESS)
          .call();

        return { data: convertFromWei(amount) };
      },
    }),
  }),
});
