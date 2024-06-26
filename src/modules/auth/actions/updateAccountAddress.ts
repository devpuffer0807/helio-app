import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { EWalletId } from 'modules/provider';
import { web3Api } from 'modules/store';

import { getApplicationData } from '../utils';

interface UpdateAccountArgs {
  address: string;
  walletId: EWalletId;
}

export const {
  useLazyAuthUpdateAccountAddressQuery,
  endpoints: { authUpdateAccountAddress },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authUpdateAccountAddress: build.query<string, UpdateAccountArgs>({
      queryFn: async ({ walletId, address }) => {
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(walletId);
        provider.currentAccount = address;

        return { data: address };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        void getApplicationData(dispatch);
      },
    }),
  }),
});
