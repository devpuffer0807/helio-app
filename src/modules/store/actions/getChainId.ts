import { ProviderManagerSingleton } from 'modules/api';
import { AvailableWriteProviders } from 'modules/provider';

import { web3Api } from '../queries';

export const {
  useGetChainIdQuery,
  endpoints: { getChainId },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getChainId: build.query<number, void>({
      queryFn: async () => {
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(
          AvailableWriteProviders.ethCompatible,
        );
        const chainId = await provider.getWeb3().eth.getChainId();

        return { data: chainId };
      },
    }),
  }),
});
