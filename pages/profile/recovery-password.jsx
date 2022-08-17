import { Box } from '@chakra-ui/react';

import RecoveryPasswordForm from 'components/profile/recovery-password-form';
import useAuth, { AUTH_TYPE } from 'lib/hooks/user-auth';

const RecoveryPasswordPage = () => {
  const { isAnonymous } = useAuth('/profile', AUTH_TYPE.ANONYMOUS);

  return (
    <Box px={[4, 16, 32, 48]} py={4}>
      {isAnonymous && (
        <Box display="flex" flexDir="column">
          <RecoveryPasswordForm />
        </Box>
      )}
    </Box>
  );
};

export default RecoveryPasswordPage;
