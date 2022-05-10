import { Box } from '@chakra-ui/react';

import RegisterForm from 'components/profile/register-form';
import useAuth from 'lib/hooks/user-auth';

const SignUpPage = () => {
  const { isAnonymous } = useAuth('/profile', false);

  return (
    <Box>
      {isAnonymous && (
        <Box display="flex" flexDir="column">
          <RegisterForm />
        </Box>
      )}
    </Box>
  );
};

export default SignUpPage;
