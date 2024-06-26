import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import { convertToHex } from 'modules/common';
import {
  CollateralToken,
  ContractsManager,
  ETH_PROVIDER_CONTRACT_ADDRESS,
  INTERACTION_CONTRACT_ADDRESS,
} from 'modules/core';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';

import { getCollateralApprovedAmount } from './getApprovedAmount';

export const {
  useLazyCollateralApproveQuery,
  endpoints: { collateralApprove },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    collateralApprove: build.query<
      TransactionReceipt,
      { token: CollateralToken; value: BigNumber }
    >({
      queryFn: async ({ token, value }, { getState }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getCollateralTokenContract(token);

        const receipt = await contract.methods
          .approve(
            token === CollateralToken.Eth
              ? ETH_PROVIDER_CONTRACT_ADDRESS
              : INTERACTION_CONTRACT_ADDRESS,
            convertToHex(value),
          )
          .send({
            from: account,
          });

        return { data: receipt };
      },
      onQueryStarted: async ({ token }, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        void dispatch(
          getCollateralApprovedAmount.initiate(
            { token },
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
