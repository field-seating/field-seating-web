import { Box } from '@chakra-ui/react';

import RecoveryPasswordForm from 'components/profile/recovery-password-form';
import useAuth from 'lib/hooks/user-auth';

const RecoveryPasswordPage = () => {
  const { isAnonymous } = useAuth('/profile', false);

  return (
    <>
      {isAnonymous && (
        <Box display="flex" flexDir="column">
          <RecoveryPasswordForm />
        </Box>
      )}
    </>
  );
};

export default RecoveryPasswordPage;
