import { createApi } from '@reduxjs/toolkit/query/react';
import { ClientError, request } from 'graphql-request';

const WOMBAT_BASE_URL =
  'https://api.thegraph.com/subgraphs/name/wombat-exchange/wombat-apr';

const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ body }: { body: string }) => {
    try {
      const result = await request(baseUrl, body);
      return { data: result };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { status: error.response.status, data: error } };
      }
      return { error: { status: 500, data: error } };
    }
  };

export const wombatAprApi = createApi({
  reducerPath: 'wombatAprApi',
  baseQuery: graphqlBaseQuery({
    baseUrl: WOMBAT_BASE_URL,
  }),
  endpoints: () => ({}),
});
