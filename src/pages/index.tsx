import { useCallback, useEffect } from 'react';
import Head from 'next/head';
import { addNewComment, addCommentsToPost } from '@features/posts';
import { useGetCommentsQuery, useGetPostsQuery } from '@services';
import { useAppDispatch, useAppSelector } from '@store';
import { Spinner } from '@components';
import styles from '../styles/Home.module.css';

export default function Home() {
  const dispatch = useAppDispatch();
  const postWithComments = useAppSelector((state) => state.posts.postWithComments);
  const getCommentsQuery = useGetCommentsQuery();
  const getPostsQuery = useGetPostsQuery();

  useEffect(
    function dispatchAddCommentsToPost() {
      const { data: comments } = getCommentsQuery;
      const { data: posts } = getPostsQuery;

      if (comments && posts) {
        dispatch(addCommentsToPost({ comments, posts }));
      }
    },
    [dispatch, getCommentsQuery, getPostsQuery],
  );

  if (getCommentsQuery.isLoading || getPostsQuery.isLoading || !postWithComments) {
    return (
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Social network activity</title>
        <meta name="description" content="Autofi social network activity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Hola</h1>
        {postWithComments.map(({ id, title, comments }) => {
          return (
            <div key={id}>
              <div>
                <h2>{title}</h2>
                {/* <button onClick={() => setPostToShowComments(id)} type="button">
             Show comments
           </button> */}
              </div>
              {comments.map((comment) => {
                return <p key={comment.id}>{JSON.stringify(comment)}</p>;
              })}
            </div>
          );
        })}
      </main>
    </div>
  );
}
