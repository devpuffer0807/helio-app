import { gql } from 'graphql-request';

import { wombatTvlApi } from 'modules/api/WombatTvlApi';

export interface WombatTVL {
  liability: string;
}

export const {
  useGetWombatTVLQuery,
  endpoints: { getWombatTVL },
} = wombatTvlApi.injectEndpoints({
  endpoints: build => ({
    getWombatTVL: build.query<WombatTVL, void>({
      query: () => ({
        body: gql`
          query {
            asset(id: "0x1fa71df4b344ffa5755726ea7a9a56fbbee0d38b") {
              liability
            }
          }
        `,
      }),
      transformResponse: response => response.asset,
    }),
  }),
});
