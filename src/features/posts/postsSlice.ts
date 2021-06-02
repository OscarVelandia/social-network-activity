import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostComment } from '@services';

interface PostWithComments extends Post {
  comments: PostComment[];
}

interface InitialState {
  postWithComments: PostWithComments[];
}

const initialState: InitialState = {
  postWithComments: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postWithComments(state, action: PayloadAction<PostWithComments[]>) {
      console.log(action.payload);
    },
    addNewComment(state, action: PayloadAction<PostComment>) {
      // state.postWithComments.map +=
      console.log(action.payload);
    },
  },
});

export const { addNewComment, postWithComments } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
