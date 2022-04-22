import { Box } from '@chakra-ui/react';

import useAuth from 'lib/hooks/user-auth';
import Button from 'components/ui/button';

const VerifyPage = () => {
  const { isLoggedIn } = useAuth('/profile/sign-in');

  return (
    <>
      {isLoggedIn && (
        <Box pt="8" px="4">
          <Button variant="outline" size="md">
            傳送驗證信
          </Button>
        </Box>
      )}
    </>
  );
};

export default VerifyPage;
