import BigNumber from 'bignumber.js';

import { ProviderManagerSingleton } from 'modules/api';
import { convertToWei, getSafeHexAmount, ZERO } from 'modules/common';
import {
  CollateralToken,
  ContractsManager,
  getCollateralToken,
} from 'modules/core';
import { AvailableWriteProviders, IWeb3SendResult } from 'modules/provider';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';
import { getAccountData } from 'modules/store/actions/getAccountData';
import { getNativeBalance } from 'modules/store/actions/getNativeBalance';

export const {
  useLazyCollateralDepositQuery,
  endpoints: { collateralDeposit },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    collateralDeposit: build.query<
      IWeb3SendResult,
      { token: CollateralToken; amount: BigNumber }
    >({
      queryFn: async ({ token, amount }, { getState, dispatch }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(
          AvailableWriteProviders.ethCompatible,
        );

        const sdk = await ContractsManager.getInstance();

        const { data: balance = ZERO } = await dispatch(
          getNativeBalance.initiate(
            { token },
            {
              subscribe: true,
              forceRefetch: true,
            },
          ),
        );

        const result = await (async () => {
          switch (token) {
            case CollateralToken.Main: {
              const providerContract = await sdk.getProviderContract();

              const gasInfo = await sdk.getGasInfo({
                value: amount,
                contract: providerContract,
                method: 'provide',
              });

              const maxSafeAmount = balance.minus(gasInfo.gasRatio);
              const safeAmount = getSafeHexAmount(
                amount.isGreaterThan(maxSafeAmount) ? maxSafeAmount : amount,
              );

              const data = providerContract.methods.provide().encodeABI();

              return provider.sendTransactionAsync(
                account,
                providerContract.options.address,
                {
                  data,
                  value: safeAmount,
                  gasLimit: gasInfo.gasLimit.toString(),
                },
              );
            }
            case CollateralToken.Eth: {
              const ethProviderContract = await sdk.getEthProviderContract();

              const gasInfo = await sdk.getGasInfo({
                args: [convertToWei(amount)],
                contract: ethProviderContract,
                method: 'provideInETH',
              });

              const safeAmount = getSafeHexAmount(amount);

              const data = ethProviderContract.methods
                .provideInETH(safeAmount)
                .encodeABI();

              return provider.sendTransactionAsync(
                account,
                ethProviderContract.options.address,
                {
                  data,
                  gasLimit: gasInfo.gasLimit.toString(),
                },
              );
            }
            default: {
              const interactionContract = await sdk.getInteractionContract();
              const { address } = getCollateralToken(token);

              const gasInfo = await sdk.getGasInfo({
                args: [account, address, convertToWei(amount)],
                contract: interactionContract,
                method: 'deposit',
              });

              const maxSafeAmount = balance.minus(gasInfo.gasRatio);
              const safeAmount = getSafeHexAmount(
                amount.isGreaterThan(maxSafeAmount) ? maxSafeAmount : amount,
              );

              const data = interactionContract.methods
                .deposit(account, address, safeAmount)
                .encodeABI();

              return provider.sendTransactionAsync(
                account,
                interactionContract.options.address,
                {
                  data,
                  gasLimit: gasInfo.gasLimit.toString(),
                },
              );
            }
          }
        })();

        return { data: result };
      },
      onQueryStarted: async ({ token }, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        void data.receiptPromise.once('receipt', () => {
          void dispatch(
            getNativeBalance.initiate(
              { token },
              {
                subscribe: false,
                forceRefetch: true,
              },
            ),
          );
          void dispatch(
            getAccountData.initiate(
              { token },
              {
                subscribe: false,
                forceRefetch: true,
              },
            ),
          );
        });
      },
    }),
  }),
});
