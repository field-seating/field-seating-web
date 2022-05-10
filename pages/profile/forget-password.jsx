import { Box } from '@chakra-ui/react';

import ForgetPasswordForm from 'components/profile/forget-password-form';
import useAuth from 'lib/hooks/user-auth';

const ForgetPasswordPage = () => {
  const { isAnonymous } = useAuth('/profile', false);

  return (
    <>
      {isAnonymous && (
        <Box display="flex" flexDir="column">
          <ForgetPasswordForm />
        </Box>
      )}
    </>
  );
};

export default ForgetPasswordPage;
