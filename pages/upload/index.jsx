import Head from 'next/head';

import useAuth from 'lib/hooks/user-auth';
import UploadContent from 'components/upload/upload-content';

const UploadPage = () => {
  const { isLoggedIn } = useAuth('/profile/sign-in');

  return (
    <>
      <Head>
        <title>留下紀錄 | 球場坐座</title>
      </Head>
      {isLoggedIn && <UploadContent />}
    </>
  );
};

export default UploadPage;
