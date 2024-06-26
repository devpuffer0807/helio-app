import axios from 'axios';

import { ProviderManagerSingleton } from 'modules/api';
import { AXIOS_DEFAULT_CONFIG } from 'modules/api/AnalyticsApi';
import { AvailableWriteProviders } from 'modules/provider';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';

export const SUBSCRIBE_MESSAGE = 'one-time-password';
export const SUBSCRIBE_PASSWORD = 'password';

interface SubscribeResponse {
  user: string;
  password: string;
  validUntil: number;
}

export const {
  useLazySubscriptionSubscribeQuery,
  endpoints: { subscriptionSubscribe },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    subscriptionSubscribe: build.query<SubscribeResponse, void>({
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

        const { data } = await api.post<SubscribeResponse>(
          `/subscription/${account}/otp`,
          {
            signature,
          },
        );
        return { data };
      },
    }),
  }),
});
