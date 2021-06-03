import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostComment } from '@services';

interface AddCommentsToPostPayload {
  comments: PostComment[];
  posts: Post[];
}

interface PostWithComments extends Post {
  comments: PostComment[];
}

interface InitialState {
  postWithComments: PostWithComments[] | null;
}

const initialState: InitialState = {
  postWithComments: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addNewComment(state, action: PayloadAction<PostComment>) {
      // state.postWithComments.map +=
      console.log(action.payload);
    },
    addCommentsToPost(state, action: PayloadAction<AddCommentsToPostPayload>) {
      const { comments, posts } = action.payload;

      const commentsWithPostIdKey = comments.reduce<{ [key: number]: PostComment[] }>(
        (commentsWithKey, comment) => {
          const { postId } = comment;

          commentsWithKey[postId] =
            commentsWithKey[postId]?.length > 0
              ? commentsWithKey[postId].concat(comment)
              : [comment];

          return commentsWithKey;
        },
        {},
      );

      state.postWithComments = posts.map((post) => ({
        ...post,
        comments: commentsWithPostIdKey[post.id],
      }));
    },
  },
});

export const { addNewComment, addCommentsToPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
