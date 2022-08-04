import { Box } from '@chakra-ui/react';
import Head from 'next/head';

import InfoForm from 'components/profile/info-form';
import AppBar from 'components/ui/app-bar';

import useAuth from 'lib/hooks/user-auth';

const InfoPage = () => {
  const { isLoggedIn } = useAuth('/profile/sign-in');

  const title = '驗證信箱';

  return (
    <>
      <Head>
        <title>{`${title} | 球場坐座`}</title>
      </Head>
      {isLoggedIn && (
        <Box>
          <AppBar title={title} hasBackward backHref="/profile" />
          <Box pt="8" px={[4, 8]}>
            <InfoForm />
          </Box>
        </Box>
      )}
    </>
  );
};

export default InfoPage;
