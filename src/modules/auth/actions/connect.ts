import { ProviderManagerSingleton } from 'modules/api';
import { AvailableWriteProviders, EWalletId } from 'modules/provider';
import { web3Api } from 'modules/store';

import { setWalletId } from '../store';
import { getApplicationData } from '../utils';

export const {
  useLazyAuthConnectQuery,
  endpoints: { authConnect },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authConnect: build.query<boolean, EWalletId>({
      queryFn: async walletId => {
        const instance = await ProviderManagerSingleton.getInstance();

        let isSelectedProvider = true;
        await instance
          .getProvider(AvailableWriteProviders.ethCompatible, walletId)
          .catch(() => {
            // need for trust wallet mobile
            isSelectedProvider = false;
            return { data: false };
          });

        return { data: isSelectedProvider };
      },
      onQueryStarted: async (walletId, { dispatch, queryFulfilled }) => {
        const connectResult = await queryFulfilled;
        if (connectResult.data) {
          localStorage.setItem('walletId', walletId);
          dispatch(setWalletId(walletId));
          void getApplicationData(dispatch);
        } else {
          localStorage.removeItem('walletId');
        }
      },
    }),
  }),
});
