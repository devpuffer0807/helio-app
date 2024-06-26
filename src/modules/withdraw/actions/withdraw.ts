import BigNumber from 'bignumber.js';

import { ProviderManagerSingleton } from 'modules/api';
import { convertToHex, convertToWei } from 'modules/common';
import {
  CollateralToken,
  ContractsManager,
  getCollateralToken,
} from 'modules/core';
import { IWeb3SendResult } from 'modules/provider';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';
import { getAccountData } from 'modules/store/actions/getAccountData';
import { getNativeBalance } from 'modules/store/actions/getNativeBalance';
import { getStakedTokenBalance } from 'modules/store/actions/getStakedTokenBalance';

export const {
  useLazyWithdrawWithdrawQuery,
  endpoints: { withdrawWithdraw },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    withdrawWithdraw: build.query<
      IWeb3SendResult,
      {
        token: CollateralToken;
        strategy: string;
        amount: BigNumber;
        tokenIndex: number;
      }
    >({
      queryFn: async (
        { token, strategy, amount, tokenIndex },
        { getState },
      ) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider();
        const sdk = await ContractsManager.getInstance();

        switch (token) {
          case CollateralToken.Eth: {
            const ethProviderContract = await sdk.getEthProviderContract();

            const gasInfo =
              tokenIndex === 0
                ? await sdk.getGasInfo({
                    args: [account, convertToWei(amount)],
                    contract: ethProviderContract,
                    method: 'releaseInETH',
                  })
                : await sdk.getGasInfo({
                    args: [account, convertToWei(amount)],
                    contract: ethProviderContract,
                    method: 'releaseInBETH',
                  });

            const data =
              tokenIndex === 0
                ? ethProviderContract.methods
                    .releaseInETH(account, convertToHex(amount))
                    .encodeABI()
                : ethProviderContract.methods
                    .releaseInBETH(account, convertToHex(amount))
                    .encodeABI();

            const result: IWeb3SendResult = await provider.sendTransactionAsync(
              account,
              ethProviderContract.options.address,
              {
                data,
                gasLimit: gasInfo.gasLimit.toString(),
              },
            );

            return {
              data: result,
            };
          }

          case CollateralToken.Second: {
            const interactionContract = await sdk.getInteractionContract();
            const { address } = getCollateralToken(token);

            const gasInfo = await sdk.getGasInfo({
              args: [account, address, convertToWei(amount)],
              contract: interactionContract,
              method: 'withdraw',
            });

            const data = interactionContract.methods
              .withdraw(account, address, convertToHex(amount))
              .encodeABI();

            const result: IWeb3SendResult = await provider.sendTransactionAsync(
              account,
              interactionContract.options.address,
              {
                data,
                gasLimit: gasInfo.gasLimit.toString(),
              },
            );

            return {
              data: result,
            };
          }

          case CollateralToken.SnBNB: {
            const interactionContract = await sdk.getInteractionContract();
            const { address } = getCollateralToken(token);

            const gasInfo = await sdk.getGasInfo({
              args: [account, address, convertToWei(amount)],
              contract: interactionContract,
              method: 'withdraw',
            });

            const data = interactionContract.methods
              .withdraw(account, address, convertToHex(amount))
              .encodeABI();

            const result: IWeb3SendResult = await provider.sendTransactionAsync(
              account,
              interactionContract.options.address,
              {
                data,
                gasLimit: gasInfo.gasLimit.toString(),
              },
            );

            return {
              data: result,
            };
          }

          case CollateralToken.WBETH: {
            const interactionContract = await sdk.getInteractionContract();
            const { address } = getCollateralToken(token);

            const gasInfo = await sdk.getGasInfo({
              args: [account, address, convertToWei(amount)],
              contract: interactionContract,
              method: 'withdraw',
            });

            const data = interactionContract.methods
              .withdraw(account, address, convertToHex(amount))
              .encodeABI();

            const result: IWeb3SendResult = await provider.sendTransactionAsync(
              account,
              interactionContract.options.address,
              {
                data,
                gasLimit: gasInfo.gasLimit.toString(),
              },
            );

            return {
              data: result,
            };
          }

          default: {
            const contract = await sdk.getProviderContract();

            const isNative = strategy === '';

            const gasInfo = await sdk.getGasInfo({
              args: !isNative
                ? [strategy, account, convertToWei(amount)]
                : [account, convertToWei(amount)],
              contract,
              method: !isNative ? 'releaseInToken' : 'release',
            });
            const data = !isNative
              ? contract.methods
                  .releaseInToken(strategy, account, convertToHex(amount))
                  .encodeABI()
              : contract.methods
                  .release(account, convertToHex(amount))
                  .encodeABI();

            const result: IWeb3SendResult = await provider.sendTransactionAsync(
              account,
              contract.options.address,
              {
                data,
                gasLimit: gasInfo.gasLimit.toString(),
              },
            );

            return {
              data: result,
            };
          }
        }
      },
      onQueryStarted: async ({ token }, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        void data.receiptPromise.once('receipt', () => {
          void dispatch(
            getStakedTokenBalance.initiate(undefined, {
              subscribe: false,
              forceRefetch: true,
            }),
          );
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
