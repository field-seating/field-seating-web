import { Box } from '@chakra-ui/react';
import Head from 'next/head';

import LoginForm from 'components/profile/login-form';
import ProfileHeader from 'components/profile/profile-header';
import useAuth from 'lib/hooks/user-auth';

const SignInPage = () => {
  const { isAnonymous } = useAuth('/profile', false);

  const title = '登入';
  return (
    <>
      <Head>
        <title>{`${title} | 球場坐座`}</title>
      </Head>
      {isAnonymous && (
        <Box display="flex" flexDir="column">
          <LoginForm />
        </Box>
      )}
    </>
  );
};

SignInPage.getLayout = (children) => <ProfileHeader>{children}</ProfileHeader>;

export default SignInPage;
