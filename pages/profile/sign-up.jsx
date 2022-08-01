import { Box } from '@chakra-ui/react';

import RegisterForm from 'components/profile/register-form';
import useAuth from 'lib/hooks/user-auth';

const SignUpPage = () => {
  const { isAnonymous } = useAuth('/profile', false);

  return (
    <Box px={[4, 16, 32, 48]} pt={4} h="100%" overflowY="auto">
      {isAnonymous && (
        <Box display="flex" flexDir="column">
          <RegisterForm />
        </Box>
      )}
    </Box>
  );
};

export default SignUpPage;
