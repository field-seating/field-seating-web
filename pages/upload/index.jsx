import Head from 'next/head';
import { useSelector } from '@xstate/react';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import useAuth from 'lib/hooks/user-auth';
import UploadContent from 'components/upload/upload-content';
import { GlobalStateContext } from 'lib/contexts/global-state';
import {
  selectIdle,
  selectPrepareImages,
} from 'lib/machines/upload-stepper-machine';

const UploadPage = () => {
  const { isLoggedIn } = useAuth('/profile/sign-in');
  const router = useRouter();

  const { uploadStepperService } = useContext(GlobalStateContext);

  const isNotReady = useSelector(uploadStepperService, selectPrepareImages);
  const isIdle = useSelector(uploadStepperService, selectIdle);

  useEffect(() => {
    if (isNotReady) {
      router.push('/');
    }

    return () => uploadStepperService.send('RESET');
  }, [isNotReady, uploadStepperService, router]);

  useEffect(() => {
    if (isIdle) {
      uploadStepperService.send({ type: 'INIT' });
    }
  }, [isIdle, uploadStepperService]);

  return (
    <>
      <Head>
        <title>留下紀錄 | 球場坐座</title>
      </Head>
      {isLoggedIn && !isNotReady && <UploadContent />}
    </>
  );
};

export default UploadPage;
