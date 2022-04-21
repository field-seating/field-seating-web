import { Box, Heading } from '@chakra-ui/react';

import LoginForm from 'components/profile/login-form';
import useAuth from 'lib/hooks/userAuth';

const SignInPage = () => {
  const { isAnonymous } = useAuth('/profile', false);

  return (
    <>
      {isAnonymous && (
        <Box display="flex" flexDir="column" px={[4, 16]} py={4}>
          <Box h={90}>
            <Heading as="h2" size="lg" color="onSurface.main">
              {`你好，歡迎加入`}
            </Heading>
          </Box>
          <Box display="flex" flexDir="column">
            <LoginForm />
          </Box>
        </Box>
      )}
    </>
  );
};

export default SignInPage;
