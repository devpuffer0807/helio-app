import * as SIDfunctions from '@siddomains/sidjs';

import { ProviderManagerSingleton } from 'modules/api';
import { CHAIN_ID, isReactSnap } from 'modules/common';
import { AvailableWriteProviders } from 'modules/provider';

import { web3Api } from '../queries';

export const {
  useGetSpaceIdAccountQuery,
  endpoints: { getSpaceIdAccount },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getSpaceIdAccount: build.query<string, void>({
      queryFn: async () => {
        if (isReactSnap) {
          return { data: '' };
        }

        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(
          AvailableWriteProviders.ethCompatible,
        );
        const { currentProvider } = provider.getWeb3();

        const SID = SIDfunctions.default;

        const sid = new SID({
          provider: currentProvider,
          sidAddress: SIDfunctions.getSidAddress(CHAIN_ID),
        });

        const response = await sid.getName(provider.currentAccount);

        return { data: response.name };
      },
    }),
  }),
});
