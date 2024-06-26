import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import { convertToHex } from 'modules/common';
import { ContractsManager } from 'modules/core';
import { web3Api } from 'modules/store';

import { getAccount } from './getAccount';
import { getApprovedAmount } from './getApprovedAmount';

export const {
  useLazyApproveQuery,
  endpoints: { approve },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    approve: build.query<
      TransactionReceipt,
      { value: BigNumber; tokenAddress: string; targetAddress: string }
    >({
      queryFn: async ({ value, tokenAddress, targetAddress }, { getState }) => {
        const state: RootState = getState();
        const { data: currentAccount = '' } = getAccount.select()(state);
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getERC20Contract(tokenAddress);

        const result = await contract.methods
          .approve(targetAddress, convertToHex(value))
          .send({
            from: currentAccount,
          });

        return { data: result };
      },
      onQueryStarted: async (
        { tokenAddress, targetAddress },
        { dispatch, queryFulfilled },
      ) => {
        await queryFulfilled;
        void dispatch(
          getApprovedAmount.initiate(
            { tokenAddress, targetAddress },
            {
              subscribe: false,
              forceRefetch: true,
            },
          ),
        );
      },
    }),
  }),
});
