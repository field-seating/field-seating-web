import React, { useCallback, useEffect, useContext } from 'react';
import { useMachine, useActor } from '@xstate/react';
import { Box, Grid, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { GlobalStateContext } from 'lib/contexts/globalState';
import Button from 'components/ui/button';
import Link from 'components/ui/link';
import useSnackbar from 'components/ui/snackbar';
import Prompt from 'components/ui/prompt';
import {
  selectDisabled,
  selectLoading,
  selectSuccess,
  selectFailure,
} from 'lib/machines/form';

import Field from 'components/input-actor-field';
import machine from './machine';

const PasswordResetForm = () => {
  const [current, send] = useMachine(machine, { devTools: true });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { authService } = useContext(GlobalStateContext);
  const [, sendToAuthService] = useActor(authService);

  const logout = useCallback(() => {
    sendToAuthService('LOGOUT');
  }, [sendToAuthService]);

  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onOpen();
    },
    [onOpen]
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      send('SUBMIT');
    },
    [send]
  );

  const { password: passwordActor, confirmPassword: confirmPasswordActor } =
    current.context.inputRefs;

  const snackbar = useSnackbar();
  const router = useRouter();
  const { token } = router.query;

  const isDisabled = selectDisabled(current);
  const isLoading = selectLoading(current);

  useEffect(() => {
    const globalErrorMsg = current.context.globalErrorMsg;
    if (selectFailure(current)) {
      snackbar({ text: globalErrorMsg, variant: 'error' });
      return;
    }

    if (selectSuccess(current)) {
      snackbar({ text: '密碼已更新，請重新登入' });
      logout();
      router.push('/profile');
      return;
    }
  }, [current, snackbar, router, logout]);

  useEffect(() => {
    if (token) {
      send({
        type: 'UPDATE_CUSTOM_CONTEXT',
        context: { token },
      });
    }
  }, [token, send]);

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <Grid templateColumns="1fr" gap="4">
          <Field actor={passwordActor} />
          <Field actor={confirmPasswordActor} />
        </Grid>
        <Box display="flex" mt={10} flexDir="column">
          <Box mb="3">
            <Button
              isLoading={isLoading}
              isDisabled={isDisabled}
              variant="solid"
              type="submit"
              size="lg"
              width="100%"
            >
              {'更新密碼'}
            </Button>
          </Box>
          <Box display="flex" justifyContent="center">
            <Link size="sm" href="/profile">
              {'離開'}
            </Link>
          </Box>
        </Box>
      </form>
      <Prompt
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        title="確定重設密碼？"
      />
    </>
  );
};

export default PasswordResetForm;
