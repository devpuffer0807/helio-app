import { ProviderManagerSingleton } from 'modules/api';
import { CHAIN_ID } from 'modules/common';
import {
  AvailableWriteProviders,
  EEthereumNetworkId,
  EWalletId,
} from 'modules/provider';
import { web3Api } from 'modules/store';

import { AuthError } from '../consts';
import { getApplicationData } from '../utils';

export const {
  useLazyAuthSwitchNetworkQuery,
  endpoints: { authSwitchNetwork },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authSwitchNetwork: build.query<
      EEthereumNetworkId,
      number | EEthereumNetworkId
    >({
      queryFn: async (currentChainId, { getState }) => {
        if (currentChainId === CHAIN_ID) {
          return {
            error: {
              data: AuthError.NetworkIsAlreadyActive,
              status: 0,
            },
          };
        }

        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(
          AvailableWriteProviders.ethCompatible,
        );

        if (typeof CHAIN_ID !== 'number') {
          return {
            error: {
              data: AuthError.UnsupportedChainId,
              status: 0,
              params: {
                chainId: CHAIN_ID,
              },
            },
          };
        }
        await provider.switchNetwork(CHAIN_ID);

        const state = getState() as RootState;

        const { data: getChainId } =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (web3Api.endpoints as any).getChainId.select()(state);
        const { walletId } = state.auth;

        const isCoin98Wallet = walletId === EWalletId.coin98;

        /**
         * This is a temporary solution for the case when a user uses the app
         * with a Coin98 wallet. Since there is a network switching error in this wallet,
         * we decided to reload the window after a successful network change.
         *
         * It should be removed as soon as the network switching is done smoothly using
         * Coin98 wallet.
         */

        if (isCoin98Wallet && getChainId !== CHAIN_ID) {
          window.location.reload();
        }

        return { data: CHAIN_ID };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        void getApplicationData(dispatch);
      },
    }),
  }),
});
