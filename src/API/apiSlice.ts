import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {RootState} from '@src/app/configureStore';
import {BaseQueryFn, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';

import {token} from './token';

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
