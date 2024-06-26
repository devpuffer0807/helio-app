import BigNumber from 'bignumber.js';

import { ProviderManagerSingleton } from 'modules/api';
import { convertToHex } from 'modules/common';
import { ContractsManager } from 'modules/core';
import { AvailableWriteProviders, IWeb3SendResult } from 'modules/provider';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';

import { getRewards } from './getRewards';

export const {
  useLazyMyPositionClaimQuery,
  endpoints: { myPositionClaim },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    myPositionClaim: build.query<IWeb3SendResult, BigNumber>({
      queryFn: async (amount, { getState }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(
          AvailableWriteProviders.ethCompatible,
        );
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getRewardsContract();

        const data = contract.methods.claim(convertToHex(amount)).encodeABI();

        const gasInfo = await sdk.getGasInfo({
          args: [convertToHex(amount)],
          contract,
          method: 'claim',
        });

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
        void data.receiptPromise.once('receipt', () => {
          void dispatch(
            getRewards.initiate(undefined, {
              subscribe: false,
              forceRefetch: true,
            }),
          );
        });
      },
    }),
  }),
});
