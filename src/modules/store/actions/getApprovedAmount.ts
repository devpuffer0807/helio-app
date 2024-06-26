import BigNumber from 'bignumber.js';

import { convertFromWei, UseApproveAmountExtraOptions } from 'modules/common';
import { ContractsManager } from 'modules/core';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';

export const {
  useGetApprovedAmountQuery,
  endpoints: { getApprovedAmount },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getApprovedAmount: build.query<
      BigNumber,
      UseApproveAmountExtraOptions | void
    >({
      queryFn: async (params, { getState }) => {
        const { tokenAddress, targetAddress } = params ?? {};
        const state: RootState = getState();
        const { data: currentAccount = '' } = getAccount.select()(state);
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getERC20Contract(tokenAddress as string);

        const data = await contract.methods
          .allowance(currentAccount, targetAddress as string)
          .call();

        return { data: convertFromWei(data) };
      },
    }),
  }),
});
