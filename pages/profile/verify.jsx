import { Box } from '@chakra-ui/react';

import useAuth from 'lib/hooks/user-auth';
import Button from 'components/ui/button';
import AppBar from 'components/ui/app-bar';

const VerifyPage = () => {
  const { isLoggedIn } = useAuth('/profile/sign-in');

  return (
    <>
      {isLoggedIn && (
        <Box>
          <AppBar title="驗證信箱" hasBackward backHref="/profile" />
          <Box pt="8" px={[4, 8]}>
            <Button variant="outline" size="md">
              傳送驗證信
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default VerifyPage;
