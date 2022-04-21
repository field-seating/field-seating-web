import { Box } from '@chakra-ui/react';

import LoginForm from 'components/profile/login-form';
import ProfileHeader from 'components/profile/ProfileHeader';
import useAuth from 'lib/hooks/userAuth';

const SignInPage = () => {
  const { isAnonymous } = useAuth('/profile', false);

  return (
    <>
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
