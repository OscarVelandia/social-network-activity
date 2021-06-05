import { useEffect } from 'react';
import Head from 'next/head';
import { Spinner } from '@components';
import { addCommentsToPost, initializeCommentsWithPostIdKey, PostCard } from '@features/posts';
import { useGetCommentsQuery, useGetPostsQuery } from '@services';
import { useAppDispatch, useAppSelector } from '@store';
import styles from '../styles/Home.module.scss';

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
        dispatch(initializeCommentsWithPostIdKey({ comments }));
        dispatch(addCommentsToPost({ posts }));
      }
    },
    [dispatch, getCommentsQuery, getPostsQuery],
  );

  if (getCommentsQuery.isLoading || getPostsQuery.isLoading || !postWithComments) {
    return (
      <div className={styles.spinnerWrapper}>
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
        <h1>Social network activity</h1>
        <div className={styles.cardsWrapper}>
          {postWithComments.map(({ body, comments, id, title }) => {
            return <PostCard key={id} body={body} comments={comments} postId={id} title={title} />;
          })}
        </div>
      </main>
    </div>
  );
}
