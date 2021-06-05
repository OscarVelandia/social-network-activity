import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostComment } from '@services';

interface AddCommentsWithPostIdKeyPayload {
  comments: PostComment[];
}

interface AddCommentsToPostPayload {
  posts: Post[];
}

export type AddNewCommentPayload = Omit<PostComment, 'id'>;

interface PostWithComments extends Post {
  comments: PostComment[];
}

interface CommentsWithPostIdKey {
  [key: number]: PostComment[];
}

interface InitialState {
  postWithComments: PostWithComments[] | null;
  commentsWithPostIdKey: CommentsWithPostIdKey | null;
}

const initialState: InitialState = {
  postWithComments: null,
  commentsWithPostIdKey: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addNewComment(state, action: PayloadAction<AddNewCommentPayload>) {
      if (!state.commentsWithPostIdKey) {
        return console.error('commentsWithPostIdKey state has no value.');
      }

      const { body, email, name, postId } = action.payload;
      const newComment: PostComment = {
        body,
        email,
        postId,
        name,
        id: state.commentsWithPostIdKey[postId].length + 1,
      };

      state.commentsWithPostIdKey[postId].unshift(newComment);
    },
    addCommentsToPost(state, action: PayloadAction<AddCommentsToPostPayload>) {
      const { posts } = action.payload;

      state.postWithComments = posts.map((post) => ({
        ...post,
        comments: state.commentsWithPostIdKey?.[post.id] || [],
      }));
    },
    initializeCommentsWithPostIdKey(state, action: PayloadAction<AddCommentsWithPostIdKeyPayload>) {
      const commentsWithPostIdKey = action.payload.comments.reduce<{
        // key is postId PostComment property
        [key: number]: PostComment[];
      }>((commentsWithKey, comment) => {
        const { postId } = comment;

        commentsWithKey[postId] =
          commentsWithKey[postId]?.length > 0 ? commentsWithKey[postId].concat(comment) : [comment];

        return commentsWithKey;
      }, {});

      state.commentsWithPostIdKey = commentsWithPostIdKey;
    },
  },
});

export const { addNewComment, addCommentsToPost, initializeCommentsWithPostIdKey } =
  postsSlice.actions;
export const postsReducer = postsSlice.reducer;
