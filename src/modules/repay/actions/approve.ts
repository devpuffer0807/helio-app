import BigNumber from 'bignumber.js';

import { convertToHex } from 'modules/common';
import { ContractsManager, INTERACTION_CONTRACT_ADDRESS } from 'modules/core';
import { AvailableWriteProviders, IWeb3SendResult } from 'modules/provider';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';

import { ProviderManagerSingleton } from '../../api';
import { repayGetApprovedAmount } from './getApprovedAmount';

export const {
  useLazyRepayApproveQuery,
  endpoints: { repayApprove },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    repayApprove: build.query<IWeb3SendResult, BigNumber>({
      queryFn: async (value, { getState }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getLoanTokenContract();
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(
          AvailableWriteProviders.ethCompatible,
        );

        const gasInfo = await sdk.getGasInfo({
          args: [INTERACTION_CONTRACT_ADDRESS, convertToHex(value)],
          contract,
          method: 'approve',
        });

        const data = contract.methods
          .approve(INTERACTION_CONTRACT_ADDRESS, convertToHex(value))
          .encodeABI();

        const result = await provider.sendTransactionAsync(
          account,
          contract.options.address,
          {
            data,
            gasLimit: gasInfo.gasLimit.toString(),
          },
        );

        return { data: result };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        void data.receiptPromise.once('confirmation', () => {
          void dispatch(
            repayGetApprovedAmount.initiate(undefined, {
              subscribe: false,
              forceRefetch: true,
            }),
          );
        });
      },
    }),
  }),
});
