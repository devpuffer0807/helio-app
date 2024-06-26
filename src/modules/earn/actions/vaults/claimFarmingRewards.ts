import { ProviderManagerSingleton } from 'modules/api';
import { ContractsManager, Farming } from 'modules/core';
import { AvailableWriteProviders, IWeb3SendResult } from 'modules/provider';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';

import { findBoostedVaultEntryByPid } from '../../utils/findBoostedVaultEntryByPid';

export const {
  useLazyClaimFarmingRewardsQuery,
  endpoints: { claimFarmingRewards },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    claimFarmingRewards: build.query<IWeb3SendResult, string>({
      queryFn: async (pid, { getState, dispatch }) => {
        const state: RootState = getState();
        const { data: currentAccount = '' } = getAccount.select()(state);
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(
          AvailableWriteProviders.ethCompatible,
        );
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getFarmingContract();
        const gasInfo = await sdk.getGasInfo<Farming, 'claim'>({
          contract,
          method: 'claim',
          args: [currentAccount, [pid]],
        });

        const data = contract.methods.claim(currentAccount, [pid]).encodeABI();

        const result = await provider.sendTransactionAsync(
          currentAccount,
          contract.options.address,
          {
            data,
            gasLimit: gasInfo.gasLimit.toString(),
          },
        );

        void result?.receiptPromise?.once('confirmation', () => {
          const vaultEntry = findBoostedVaultEntryByPid(pid);

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
