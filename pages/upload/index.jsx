import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { isNil, isEmpty } from 'ramda';
import Router from 'next/router';

import useAuth from 'lib/hooks/user-auth';
import UploadContent from 'components/upload/upload-content';
import ImageUploadContext from 'lib/contexts/image-upload';

const UploadPage = () => {
  const { isLoggedIn } = useAuth('/profile/sign-in');

  const { images } = useContext(ImageUploadContext);
  const invalidImages = isNil(images) || isEmpty(images);

  useEffect(() => {
    if (invalidImages) {
      Router.push('/');
    }
  }, [invalidImages]);

  return (
    <>
      <Head>
        <title>留下紀錄 | 球場坐座</title>
      </Head>
      {isLoggedIn && !invalidImages && <UploadContent />}
    </>
  );
};

export default UploadPage;
