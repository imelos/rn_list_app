import {apiSlice} from '@src/API/apiSlice';

type ListApiResponse = any;
type ListApiParams = any;

export const listApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getListItems: builder.query<ListApiResponse, ListApiParams>({
      query: params => {
        console.log(params);
        return {
          url: '/elastic',
          method: 'GET',
          params: {
            limit: 20,
            p: 1,
            q: '',
            world: 'de',
          },
        };
      },
    }),
  }),
});

export const {useGetListItemsQuery} = listApiSlice;
