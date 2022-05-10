import { useCallback, useContext } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useActor } from '@xstate/react';

import { GlobalStateContext } from 'lib/contexts/globalState';
import useAuth from 'lib/hooks/user-auth';
import Button from 'components/ui/button';
import AppBar from 'components/ui/app-bar';
import useSnackbar from 'components/ui/snackbar';
import Prompt from 'components/ui/prompt';
import recoveryPassword from 'lib/fetch/password/recovery';

const PasswordManagementPage = () => {
  const { isLoggedIn } = useAuth('/profile/sign-in');
  const { authService } = useContext(GlobalStateContext);
  const [state] = useActor(authService);
  const snackbar = useSnackbar();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const email = state.context.email;

  const onSubmit = useCallback(async () => {
    try {
      await recoveryPassword(email);
      snackbar({ text: '密碼重置信件已寄出，請確認您的信箱' });
      router.push('/profile');
    } catch (err) {
      snackbar({ text: err.response.data?.message, variant: 'error' });
    }
  }, [snackbar, router, email]);

  return (
    <>
      {isLoggedIn && (
        <Box>
          <AppBar title="密碼管理" hasBackward backHref="/profile" />
          <Box pt="8" px={[4, 8]}>
            <Button variant="outline" size="md" onClick={onOpen}>
              重置密碼
            </Button>
          </Box>
          <Prompt
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            title="確定重置密碼？"
          />
        </Box>
      )}
    </>
  );
};

export default PasswordManagementPage;
