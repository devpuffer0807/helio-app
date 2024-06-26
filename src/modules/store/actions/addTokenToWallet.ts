import { ProviderManagerSingleton } from 'modules/api';
import { AvailableWriteProviders, ITokenInfo } from 'modules/provider';

import { web3Api } from '../queries';

export const {
  useLazyAddTokenToWalletQuery,
  endpoints: { addTokenToWallet },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    addTokenToWallet: build.query<boolean, ITokenInfo>({
      queryFn: async token => {
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(
          AvailableWriteProviders.ethCompatible,
        );

        return { data: await provider.addTokenToWallet(token) };
      },
    }),
  }),
});
