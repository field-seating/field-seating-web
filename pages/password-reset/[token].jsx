import { Box } from '@chakra-ui/react';

import PasswordResetForm from 'components/profile/password-reset-form';

const PasswordResetPage = () => {
  return (
    <Box>
      <Box display="flex" flexDir="column">
        <PasswordResetForm />
      </Box>
    </Box>
  );
};

export default PasswordResetPage;
