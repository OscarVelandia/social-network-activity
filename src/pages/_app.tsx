import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* This is NextJs default code */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />{' '}
    </Provider>
  );
}
export default MyApp;
