import { ProviderManagerSingleton } from 'modules/api';
import { AvailableWriteProviders } from 'modules/provider';

import { web3Api } from '../queries';

export const {
  useGetAccountQuery,
  endpoints: { getAccount },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getAccount: build.query<string, void>({
      queryFn: async () => {
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(
          AvailableWriteProviders.ethCompatible,
        );

        return { data: provider.currentAccount };
      },
    }),
  }),
});
