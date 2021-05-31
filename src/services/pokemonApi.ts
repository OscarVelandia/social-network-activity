import { createApi, fetchBaseQuery } from '@rtk-incubator/rtk-query/react';

interface MoveBattleStyle {
  id: number;
  name: string;
  names: Array<{
    name: string;
    language: {
      name: 'en' | 'fr';
      url: string;
    };
  }>;
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (builder) => ({
    getMoveBattleStyleByName: builder.query<MoveBattleStyle, string | number>({
      query: (name) => `move-battle-style/${name}`,
    }),
  }),
});

export const { useGetMoveBattleStyleByNameQuery } = pokemonApi;
