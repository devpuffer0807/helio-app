import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const web3Api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: () => ({}),
});
