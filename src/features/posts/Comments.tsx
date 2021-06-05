import { PostComment } from '@services';
import styles from './Comments.module.scss';

interface CommentsProps {
  comments: PostComment[];
}

export const Comments = ({ comments }: CommentsProps) => {
  return (
    <div className={styles.allCommentsContainer}>
      {comments.map(({ id, body, name }) => {
        return (
          <div key={id} className={styles.commentContainer}>
            <p>{body}</p>
            <div>{name}</div>
          </div>
        );
      })}
    </div>
  );
};
