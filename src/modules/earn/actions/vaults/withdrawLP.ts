import BigNumber from 'bignumber.js';

import { ProviderManagerSingleton } from 'modules/api';
import { convertToHex } from 'modules/common';
import { ContractsManager, Farming } from 'modules/core';
import { AvailableWriteProviders, IWeb3SendResult } from 'modules/provider';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';

import { findBoostedVaultEntryByPid } from '../../utils/findBoostedVaultEntryByPid';

interface WithdrawLPArgs {
  value: BigNumber;
  poolId: string;
}

export const { useLazyWithdrawLPQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    withdrawLP: build.query<IWeb3SendResult, WithdrawLPArgs>({
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

        const gasInfo = await sdk.getGasInfo<Farming, 'withdraw'>({
          args: [poolId, convertToHex(value), true],
          contract,
          method: 'withdraw',
        });

        const data = contract.methods
          .withdraw(poolId, convertToHex(value), true)
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
          const vaultEntry = findBoostedVaultEntryByPid(poolId);

          if (vaultEntry) {
            void dispatch(
              vaultEntry.getInfo.initiate(undefined, { forceRefetch: true }),
            );
          }
        });

        return { data: result };
      },
    }),
  }),
});
