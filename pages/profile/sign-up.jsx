import { Box } from '@chakra-ui/react';

import RegisterForm from 'components/profile/register-form';
import useAuth from 'lib/hooks/userAuth';

const SignUpPage = () => {
  const { isAnonymous } = useAuth('/profile', false);

  return (
    <Box px={[4, 16]} py={4}>
      {isAnonymous && (
        <Box display="flex" flexDir="column">
          <RegisterForm />
        </Box>
      )}
    </Box>
  );
};

export default SignUpPage;
