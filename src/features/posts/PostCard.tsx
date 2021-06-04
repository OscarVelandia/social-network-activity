import { useEffect, useState } from 'react';
import { Modal, TextButton } from '@components';
import { PostComment } from '@services';
import styles from './PostCard.module.scss';

interface PostCardProps {
  body: string;
  comments: PostComment[];
  title: string;
}

export const PostCard = ({ body, comments, title }: PostCardProps) => {
  const [shouldShowComments, setShouldShowComments] = useState(false);

  useEffect(
    function toggleOverflow() {
      document.body.style.overflow = shouldShowComments ? 'hidden' : 'auto';
    },
    [shouldShowComments],
  );

  const Comments = comments.map(({ id, body: commentBody, name }) => {
    return (
      <div className={styles.commentWrapper}>
        <p key={id}>{commentBody}</p>
        <div>{name}</div>
      </div>
    );
  });

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.5rem',
        }}
      >
        <h2>{title}</h2>
        <p>{body}</p>
        <TextButton
          fontSize="1rem"
          onClick={() => setShouldShowComments(true)}
          text={`View all ${comments.length} comments`}
        />
      </div>
      <Modal
        isOpen={shouldShowComments}
        title="Users comments"
        onCloseClick={() => setShouldShowComments(false)}
        width="50vw"
        height="70vh"
      >
        {Comments}
      </Modal>
    </div>
  );
};
