import Head from 'next/head';
import { Layout } from '../components/template/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Search Country</title>
        <meta
          name="description"
          content="Country search site that provides information such as: federative name, population, continent, capital, main currencies, languages spoken and bordering countries"
        />
        <link rel="shortcut icon" href="./globe-americas.svg" />
      </Head>
      <Layout title="Where in the world?"></Layout>
    </>
  );
}
