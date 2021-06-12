import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type EmailInput = `${string}@${string}.${string}`;

export interface PostComment {
  postId: number;
  id: number;
  name: string;
  email: EmailInput;
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
