import BigNumber from 'bignumber.js';

import { ProviderManagerSingleton } from 'modules/api';
import { convertToHex, convertToWei } from 'modules/common';
import { ContractsManager } from 'modules/core';
import { AvailableWriteProviders, IWeb3SendResult } from 'modules/provider';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';
import { getLoanTokenBalance } from 'modules/store/actions/getLoanTokenBalance';

import { getHAYPool } from './getHAYPool';

export const {
  useLazyWithdrawHAYQuery,
  endpoints: { withdrawHAY },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    withdrawHAY: build.query<IWeb3SendResult, BigNumber>({
      queryFn: async (value, { getState, dispatch }) => {
        const state: RootState = getState();
        const { data: currentAccount = '' } = getAccount.select()(state);
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(
          AvailableWriteProviders.ethCompatible,
        );
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getJarContract();

        const data = contract.methods.exit(convertToHex(value)).encodeABI();

        const gasInfo = await sdk.getGasInfo({
          args: [convertToWei(value)],
          contract,
          method: 'exit',
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
