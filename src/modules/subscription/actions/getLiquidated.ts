import axios from 'axios';
import BigNumber from 'bignumber.js';

import { AXIOS_DEFAULT_CONFIG } from 'modules/api/AnalyticsApi';
import { convertFromWei, ZERO } from 'modules/common';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';

interface LiquidatedUserResponse {
  ts: number;
  userAddress: string;
  liquidationCost: BigNumber;
}

interface LiquidatedUserApiResponse
  extends Omit<LiquidatedUserResponse, 'liquidationCost'> {
  liquidationCost: string;
}

export const {
  useSubscriptionGetLiquidatedQuery,
  endpoints: { subscriptionGetLiquidated },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    subscriptionGetLiquidated: build.query<LiquidatedUserResponse, void>({
      queryFn: async (_, { getState }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);

        const api = axios.create({ ...AXIOS_DEFAULT_CONFIG });

        const { data } = await api.get<LiquidatedUserApiResponse>(
          `/liquidated/${account}`,
        );

        return {
          data: {
            ts: data.ts ?? '',
            userAddress: data.userAddress ?? '',
            liquidationCost: data.liquidationCost
              ? convertFromWei(data.liquidationCost)
              : ZERO,
          },
        };
      },
    }),
  }),
});
