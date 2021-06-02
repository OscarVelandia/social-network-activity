import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '@features/posts';
import { postsAndCommentsApi } from '@services';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    [postsAndCommentsApi.reducerPath]: postsAndCommentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(postsAndCommentsApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
