import BigNumber from 'bignumber.js';

import { ProviderManagerSingleton } from 'modules/api';
import { convertToWei } from 'modules/common';
import { ContractsManager, PancakeDepositProxyStable } from 'modules/core';
import { AvailableWriteProviders, IWeb3SendResult } from 'modules/provider';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';
import { getLoanTokenBalance } from 'modules/store/actions/getLoanTokenBalance';

import { PANCAKE_STABLE_SWAP } from '../../../consts';
import { DepositPairArgs } from '../types';
import { getPancakeSwapHayBusdStable } from './getPancakeSwapHayBusdStable';

const SLIPPAGE = 0.001;

export const {
  useLazyDepositPancakeSwapHayBusdStableQuery,
  endpoints: { depositPancakeSwapHayBusdStable },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    depositPancakeSwapHayBusdStable: build.query<
      IWeb3SendResult,
      DepositPairArgs
    >({
      queryFn: async (
        { firstAmount, secondAmount },
        { getState, dispatch },
      ) => {
        const state: RootState = getState();
        const { data: currentAccount = '' } = getAccount.select()(state);
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(
          AvailableWriteProviders.ethCompatible,
        );
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getPancakeDepositProxyStableContract();

        const contractStableSwap = await sdk.getPancakeStableSwapContract();

        const tokenAmount = await contractStableSwap.methods
          .calc_token_amount(
            [convertToWei(firstAmount), convertToWei(secondAmount)],
            true,
          )
          .call();

        const minMintAmount = new BigNumber(tokenAmount)
          .multipliedBy(1 - SLIPPAGE)
          .integerValue()
          .toString();

        const gasInfo = await sdk.getGasInfo<
          PancakeDepositProxyStable,
          'depositToFarming'
        >({
          args: [
            PANCAKE_STABLE_SWAP,
            convertToWei(firstAmount),
            convertToWei(secondAmount),
            minMintAmount,
          ],
          contract,
          method: 'depositToFarming',
        });

        const data = contract.methods
          .depositToFarming(
            PANCAKE_STABLE_SWAP,
            convertToWei(firstAmount),
            convertToWei(secondAmount),
            minMintAmount,
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
          void dispatch(
            getPancakeSwapHayBusdStable.initiate(undefined, options),
          );
          void dispatch(getLoanTokenBalance.initiate(undefined, options));
        });

        return { data: result };
      },
    }),
  }),
});
