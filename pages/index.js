import Head from 'next/head';

import SpaceSelector from 'components/browse/space-selector';

const Home = () => {
  return (
    <>
      <Head>
        <title>選擇座位 | 球場坐座</title>
      </Head>
      <SpaceSelector />
    </>
  );
};

export default Home;
