import { ProviderManagerSingleton } from 'modules/api';
import { AvailableWriteProviders } from 'modules/provider';
import { web3Api } from 'modules/store';

import { ContractsManager } from '../../core';

export const {
  useLazyAuthDisconnectQuery,
  endpoints: { authDisconnect },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authDisconnect: build.query<boolean, void>({
      queryFn: async () => {
        const instance = await ProviderManagerSingleton.getInstance();
        instance.disconnect(AvailableWriteProviders.ethCompatible);
        ContractsManager.disconnect();
        return { data: true };
      },
      onQueryStarted: (_, { dispatch }) => {
        localStorage.removeItem('walletId');
        dispatch(web3Api.util.resetApiState());
      },
    }),
  }),
});
