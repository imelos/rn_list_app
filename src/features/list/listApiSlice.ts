import {apiSlice} from '@src/API/apiSlice';

type BaseResponse = {
  code: number;
  errors: unknown[];
  status: string;
};

type ListApiParams = {
  limit: number;
  p: number;
  q: string;
  world: string;
};

type ListApiResponse = BaseResponse & {data: {items: any[]}};

export const listApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getListItems: builder.query<ListApiResponse, ListApiParams>({
      query: params => {
        return {
          url: '/elastic',
          method: 'GET',
          params: params,
        };
      },
    }),
  }),
});

export const {useGetListItemsQuery} = listApiSlice;
