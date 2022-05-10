import { Box } from '@chakra-ui/react';

import PasswordResetForm from 'components/profile/password-reset-form';

const PasswordResetPage = () => {
  return (
    <Box px={[4, 16, 32, 48]} py={4}>
      <Box display="flex" flexDir="column">
        <PasswordResetForm />
      </Box>
    </Box>
  );
};

export default PasswordResetPage;
