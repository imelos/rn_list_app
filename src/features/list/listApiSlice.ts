import {apiSlice} from '@src/API/apiSlice';

export type BaseResponse = {
  code: number;
  errors: unknown[];
  status: string;
};

export type ListApiParams = {
  limit: number;
  p: number;
  q: string;
  world: string;
};

export type ListItemProps = {
  firstPreviewImage: {watermarked: string};
  title: string;
  author: {details: {publicName: string}};
  price: number;
  id: number;
};

export type ListApiResponse = BaseResponse & {
  data: {items: {materials: ListItemProps[]}};
};

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

export const {useGetListItemsQuery, useLazyGetListItemsQuery} = listApiSlice;
