import { ProviderManagerSingleton } from 'modules/api';
import { EWalletId } from 'modules/provider';
import { web3Api } from 'modules/store';

import { getApplicationData } from '../utils';

interface SwitchNetworkArgs {
  chainId: number;
  walletId: EWalletId;
}

export const {
  useLazyAuthUpdateConnectedNetworkQuery,
  endpoints: { authUpdateConnectedNetwork },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authUpdateConnectedNetwork: build.query<number, SwitchNetworkArgs>({
      queryFn: async ({ walletId, chainId }) => {
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(walletId);
        provider.currentChain = chainId;

        return { data: chainId };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        void getApplicationData(dispatch);
      },
    }),
  }),
});
