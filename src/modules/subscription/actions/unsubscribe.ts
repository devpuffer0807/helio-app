import axios from 'axios';

import { ProviderManagerSingleton } from 'modules/api';
import { AXIOS_DEFAULT_CONFIG } from 'modules/api/AnalyticsApi';
import { AvailableWriteProviders } from 'modules/provider';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';

import { SUBSCRIBE_MESSAGE, SUBSCRIBE_PASSWORD } from './subscribe';

interface UnsubscribeResponse {
  signature: string;
}

export const {
  useLazySubscriptionUnsubscribeQuery,
  endpoints: { subscriptionUnsubscribe },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    subscriptionUnsubscribe: build.query<UnsubscribeResponse, void>({
      queryFn: async (_, { getState }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(
          AvailableWriteProviders.ethCompatible,
        );
        const signature = await provider
          .getWeb3()
          .eth.personal.sign(SUBSCRIBE_MESSAGE, account, SUBSCRIBE_PASSWORD);

        const api = axios.create({ ...AXIOS_DEFAULT_CONFIG });

        const { data } = await api.put<UnsubscribeResponse>(
          `/subscription/${account}/unsubscribe`,
          {
            signature,
          },
        );
        return { data };
      },
    }),
  }),
});
