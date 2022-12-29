import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { AppProvider } from '../data/context/AppContext';
import { CountryProvider } from '../data/context/CountryContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CountryProvider>
      <AppProvider>
        <NextNProgress color="hsl(200, 15%, 8%)" />
        <Component {...pageProps} />
      </AppProvider>
    </CountryProvider>
  );
}
