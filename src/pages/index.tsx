import Head from 'next/head';
import { useAppDispatch, useAppSelector } from '@store';
import { addNewComment, postWithComments } from '@features/posts';
import { useGetCommentsQuery, postsAndCommentsApi } from '@services';
import styles from '../styles/Home.module.css';

export default function Home() {
  const postWithComments = useAppSelector((state) => state.posts.postWithComments);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <Head>
        <title>Social network activity</title>
        <meta name="description" content="Autofi social network activity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div />
      </main>
    </div>
  );
}
