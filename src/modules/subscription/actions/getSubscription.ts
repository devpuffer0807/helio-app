import axios from 'axios';

import { AXIOS_DEFAULT_CONFIG } from 'modules/api/AnalyticsApi';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';

interface SubscriptionResponse {
  user: string;
  telegramName: string;
  isSubscribed: boolean;
}

export const {
  useSubscriptionSubscriptionQuery,
  endpoints: { subscriptionSubscription },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    subscriptionSubscription: build.query<SubscriptionResponse, void>({
      queryFn: async (_, { getState }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);

        const api = axios.create({ ...AXIOS_DEFAULT_CONFIG });

        const { data } = await api.get<SubscriptionResponse>(
          `/subscription/${account}`,
        );
        return { data };
      },
    }),
  }),
});
