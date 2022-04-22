import { useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import useAuth from 'lib/hooks/user-auth';
import Button from 'components/ui/button';
import AppBar from 'components/ui/app-bar';
import useSnackbar from 'components/ui/snackbar';
import usersVerifyEmail from 'lib/fetch/users/verify-email';

const VerifyPage = () => {
  const { isLoggedIn } = useAuth('/profile/sign-in');
  const snackbar = useSnackbar();
  const router = useRouter();

  const onClick = useCallback(async () => {
    try {
      await usersVerifyEmail();
      snackbar({ text: '驗證信件寄出成功' });
      router.push('/profile');
    } catch (err) {
      snackbar({ text: err.response.data?.message, variant: 'error' });
    }
  }, [snackbar, router]);

  return (
    <>
      {isLoggedIn && (
        <Box>
          <AppBar title="驗證信箱" hasBackward backHref="/profile" />
          <Box pt="8" px={[4, 8]}>
            <Button variant="outline" size="md" onClick={onClick}>
              傳送驗證信
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default VerifyPage;
