import BigNumber from 'bignumber.js';

import { ProviderManagerSingleton } from 'modules/api';
import { convertToWei } from 'modules/common';
import { ContractsManager } from 'modules/core';
import { AvailableWriteProviders, IWeb3SendResult } from 'modules/provider';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';
import { getLoanTokenBalance } from 'modules/store/actions/getLoanTokenBalance';

import { getHAYPool } from './getHAYPool';

export const {
  useLazyDepositHAYQuery,
  endpoints: { depositHAY },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    depositHAY: build.query<IWeb3SendResult, BigNumber>({
      queryFn: async (value, { getState, dispatch }) => {
        const state: RootState = getState();
        const { data: currentAccount = '' } = getAccount.select()(state);
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(
          AvailableWriteProviders.ethCompatible,
        );
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getJarContract();

        const data = contract.methods.join(convertToWei(value)).encodeABI();

        const gasInfo = await sdk.getGasInfo({
          args: [convertToWei(value)],
          contract,
          method: 'join',
        });

        const result = await provider.sendTransactionAsync(
          currentAccount,
          contract.options.address,
          {
            data,
            gasLimit: gasInfo.gasLimit.toString(),
          },
        );

        void result?.receiptPromise?.once('confirmation', async () => {
          await dispatch(
            getLoanTokenBalance.initiate(undefined, {
              subscribe: false,
              forceRefetch: true,
            }),
          );
          void dispatch(
            getHAYPool.initiate(undefined, {
              subscribe: false,
              forceRefetch: true,
            }),
          );
        });

        return { data: result };
      },
    }),
  }),
});
