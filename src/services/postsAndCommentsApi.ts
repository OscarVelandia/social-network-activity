import { createApi, fetchBaseQuery } from '@rtk-incubator/rtk-query/react';

export interface PostComment {
  postId: number;
  id: number;
  name: string;
  email: `${string}@${string}.${string}`;
  body: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const postsAndCommentsApi = createApi({
  reducerPath: 'postsAndCommentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: (builder) => ({
    getComments: builder.query<PostComment[], void>({
      query: () => `comments`,
    }),
    getPosts: builder.query<Post[], void>({
      query: () => `posts`,
    }),
  }),
});

export const { useGetCommentsQuery, useGetPostsQuery } = postsAndCommentsApi;
