import Head from 'next/head';

const DefaultHead = () => {
  const title = '球場坐座';
  const desc =
    '透過群眾上傳，提升看球體驗。照片更多，共享更多看球視野！操作更快，手機上傳一指搞定！';

  const ogImage = 'https://www.fieldseating.com/images/og-image-1.png';

  return (
    <Head>
      <title></title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:locale" content="zh_TW" />
      <meta name="twitter:card" content="summary"></meta>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
      <meta property="og:image" content={ogImage} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  );
};
export default DefaultHead;
