import { ProviderManagerSingleton } from 'modules/api';
import { convertToWei } from 'modules/common';
import { ContractsManager, Farming } from 'modules/core';
import { AvailableWriteProviders, IWeb3SendResult } from 'modules/provider';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';

import { DepositLPArgs } from '../types';
import { getPancakeSwapHayBusd } from './getPancakeSwapHayBusd';

export const {
  useLazyDepositPancakeSwapHayBusdLPQuery,
  endpoints: { depositPancakeSwapHayBusdLP },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    depositPancakeSwapHayBusdLP: build.query<IWeb3SendResult, DepositLPArgs>({
      queryFn: async (args, { getState, dispatch }) => {
        const { value, poolId } = args;
        const state: RootState = getState();
        const { data: currentAccount = '' } = getAccount.select()(state);
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(
          AvailableWriteProviders.ethCompatible,
        );
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getFarmingContract();

        const gasInfo = await sdk.getGasInfo<Farming, 'deposit'>({
          args: [poolId, convertToWei(value), false, currentAccount],
          contract,
          method: 'deposit',
        });

        const data = contract.methods
          .deposit(poolId, convertToWei(value), false, currentAccount)
          .encodeABI();

        const result = await provider.sendTransactionAsync(
          currentAccount,
          contract.options.address,
          {
            data,
            gasLimit: gasInfo.gasLimit.toString(),
          },
        );

        void result?.receiptPromise?.once('confirmation', () => {
          void dispatch(
            getPancakeSwapHayBusd.initiate(undefined, {
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
