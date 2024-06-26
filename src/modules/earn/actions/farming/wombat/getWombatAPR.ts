import { gql } from 'graphql-request';

import { wombatAprApi } from 'modules/api/WombatAprApi';

export interface WombatAPR {
  womBaseAPR: string;
  medianBoostedAPR: string;
  totalBonusTokenAPR: string;
}

export const {
  useGetWombatAPRQuery,
  endpoints: { getWombatAPR },
} = wombatAprApi.injectEndpoints({
  endpoints: build => ({
    getWombatAPR: build.query<WombatAPR, void>({
      query: () => ({
        body: gql`
          query {
            asset(id: "0x1fa71df4b344ffa5755726ea7a9a56fbbee0d38b") {
              womBaseAPR
              medianBoostedAPR
              totalBonusTokenAPR
            }
          }
        `,
      }),
      transformResponse: response => response.asset,
    }),
  }),
});
