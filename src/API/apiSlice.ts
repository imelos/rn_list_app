import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {token} from './token';

export type BaseResponse = {
  code: number;
  errors: unknown[];
  status: string;
};

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.eduki.com/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: builder => ({}),
});
