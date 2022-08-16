import { Box } from '@chakra-ui/react';
import Head from 'next/head';

import RegisterForm from 'components/profile/register-form';
import useAuth, { AUTH_TYPE } from 'lib/hooks/user-auth';

const SignUpPage = () => {
  const { isAnonymous } = useAuth('/profile', AUTH_TYPE.ANONYMOUS);

  const title = '註冊帳號';

  return (
    <>
      <Head>
        <title>{`${title} | 球場坐座`}</title>
      </Head>

      <Box px={[4, 16, 32, 48]} pt={4} h="100%" overflowY="auto">
        {isAnonymous && (
          <Box display="flex" flexDir="column">
            <RegisterForm />
          </Box>
        )}
      </Box>
    </>
  );
};

export default SignUpPage;
