import type { AppProps } from 'next/app';
import { AppProvider } from '../data/context/AppContext';
import { CountryProvider } from '../data/context/CountryContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CountryProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </CountryProvider>
  );
}
