import { useEffect } from 'react';
import Head from 'next/head';
import { addNewComment, addCommentsToPost, PostCard } from '@features/posts';
import { useGetCommentsQuery, useGetPostsQuery } from '@services';
import { useAppDispatch, useAppSelector } from '@store';
import { Spinner } from '@components';
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
        dispatch(addCommentsToPost({ comments, posts }));
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

  const PostWithComments = postWithComments.map(({ body, comments, id, title }) => {
    return <PostCard key={id} body={body} comments={comments} title={title} />;
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Social network activity</title>
        <meta name="description" content="Autofi social network activity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Hola</h1>
        <div className={styles.cardsWrapper}>{PostWithComments}</div>
      </main>
    </div>
  );
}
