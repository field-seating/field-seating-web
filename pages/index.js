import Head from 'next/head';

import SpaceSelector from 'components/browse/space-selector';

const Home = () => {
  return (
    <>
      <Head>
        <title>球場坐座</title>
        <meta
          name="description"
          content="platform for sharing photos in the fields"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SpaceSelector />
    </>
  );
};

export default Home;
