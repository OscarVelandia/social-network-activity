import { useEffect, useState } from 'react';
import { Modal, SubmitEvent, TextButton } from '@components';
import {
  addCommentsToPost,
  Comments,
  addNewComment,
  AddNewCommentPayload,
  NewCommentForm,
} from '@features/posts';
import { EmailInput, Post, PostComment, useGetPostsQuery } from '@services';
import { useAppDispatch } from '@store';
import styles from './PostCard.module.scss';

export type NewCommentFormInputs = Omit<AddNewCommentPayload, 'postId'>;

const DEFAULT_FORM_VALUES = {
  name: '',
  body: '',
  email: '' as EmailInput, // Will be an EmailInput because the input validation, but it needs a default value
};

interface PostCardProps {
  body: string;
  comments: PostComment[];
  postId: number;
  title: string;
}

export function PostCard({ body, comments, postId, title }: PostCardProps) {
  const dispatch = useAppDispatch();
  const getPostsQuery = useGetPostsQuery(undefined, { selectFromResult: (posts) => posts });
  const [shouldShowComments, setShouldShowComments] = useState(false);
  const [newCommentForm, setNewCommentForm] = useState<NewCommentFormInputs>(DEFAULT_FORM_VALUES);

  useEffect(
    function toggleOverflow() {
      document.body.style.overflow = shouldShowComments ? 'hidden' : 'auto';
    },
    [shouldShowComments],
  );

  function handleInputChange(inputValue: { [key: string]: string }) {
    setNewCommentForm((old) => ({ ...old, ...inputValue }));
  }

  function resetForm() {
    setNewCommentForm(DEFAULT_FORM_VALUES);
  }

  function handleFormSubmit(event: SubmitEvent) {
    event.preventDefault();

    dispatch(addNewComment({ ...newCommentForm, postId }));
    // At this moment the data is in cache
    dispatch(addCommentsToPost({ posts: getPostsQuery.data as Post[] }));
    resetForm();
  }

  return (
    <>
      <div className={styles.postContainer}>
        <div>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
        <TextButton
          fontSize="1rem"
          onClick={() => setShouldShowComments(true)}
          text={`View all ${comments.length} comments`}
        />
      </div>
      <Modal
        contentContainerTagName="form"
        isOpen={shouldShowComments}
        title={title}
        onCloseClick={() => setShouldShowComments(false)}
        onSubmitClick={handleFormSubmit}
        width="50vw"
        height="70vh"
        shouldShowButtons={false}
      >
        <div className={styles.commentsAndInputContainer}>
          <Comments comments={comments} />
          <NewCommentForm onInputChange={handleInputChange} newCommentForm={newCommentForm} />
        </div>
      </Modal>
    </>
  );
}
