import { ProviderManagerSingleton } from 'modules/api';
import { convertToWei, HUNDRED } from 'modules/common';
import { ContractsManager, PancakeDepositProxy } from 'modules/core';
import { AvailableWriteProviders, IWeb3SendResult } from 'modules/provider';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';
import { getLoanTokenBalance } from 'modules/store/actions/getLoanTokenBalance';

import { DepositPairArgs } from '../types';
import { getPancakeSwapHayBusd } from './getPancakeSwapHayBusd';

const SLIPPAGE = 1;

export const {
  useLazyDepositPancakeSwapHayBusdQuery,
  endpoints: { depositPancakeSwapHayBusd },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    depositPancakeSwapHayBusd: build.query<IWeb3SendResult, DepositPairArgs>({
      queryFn: async (
        { firstAddress, firstAmount, secondAddress, secondAmount },
        { getState, dispatch },
      ) => {
        const state: RootState = getState();
        const { data: currentAccount = '' } = getAccount.select()(state);
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(
          AvailableWriteProviders.ethCompatible,
        );
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getPancakeDepositProxyContract();

        const firstMinAmount = firstAmount.minus(
          firstAmount.multipliedBy(SLIPPAGE).div(HUNDRED),
        );
        const secondMinAmount = secondAmount.minus(
          secondAmount.multipliedBy(SLIPPAGE).div(HUNDRED),
        );

        const gasInfo = await sdk.getGasInfo<
          PancakeDepositProxy,
          'depositToFarming'
        >({
          args: [
            firstAddress,
            secondAddress,
            convertToWei(firstAmount),
            convertToWei(secondAmount),
            convertToWei(firstMinAmount),
            convertToWei(secondMinAmount),
          ],
          contract,
          method: 'depositToFarming',
        });

        const data = contract.methods
          .depositToFarming(
            firstAddress,
            secondAddress,
            convertToWei(firstAmount),
            convertToWei(secondAmount),
            convertToWei(firstMinAmount),
            convertToWei(secondMinAmount),
          )
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
          const options = {
            subscribe: false,
            forceRefetch: true,
          };
          void dispatch(getPancakeSwapHayBusd.initiate(undefined, options));
          void dispatch(getLoanTokenBalance.initiate(undefined, options));
        });

        return { data: result };
      },
    }),
  }),
});
