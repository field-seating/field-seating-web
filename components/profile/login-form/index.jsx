import React, { useContext, useCallback, useEffect } from 'react';
import { useActor, useMachine } from '@xstate/react';
import { Box, Grid } from '@chakra-ui/react';

import Button from 'components/ui/Button';
import useSnackbar from 'components/ui/Snackbar';
import { GlobalStateContext } from 'lib/contexts/globalState';
import { set as setToken } from 'lib/storage/token';

import Field from './Field';
import machine from './machine';

const LoginForm = () => {
  const [current, send] = useMachine(machine);
  const onSubmit = useCallback(() => {
    send('SUBMIT');
  }, [send]);

  const { email: emailActor, password: passwordActor } =
    current.context.inputRefs;

  const { authService } = useContext(GlobalStateContext);
  const [, sendToAuthService] = useActor(authService);
  const snackbar = useSnackbar();

  const globalErrorMsg = current.context.globalErrorMsg;
  const token = current.context?.responseData?.data?.token;
  const isIdle = current.matches('idle');

  useEffect(() => {
    if (globalErrorMsg) {
      snackbar({ text: globalErrorMsg, variant: 'error' });
    }
  }, [snackbar, globalErrorMsg]);

  useEffect(() => {
    if (token) {
      setToken(token);
      snackbar({ text: '已發送認證信' });
      sendToAuthService('SIGNIN');
    }
  }, [snackbar, token, sendToAuthService]);

  return (
    <>
      <Grid templateColumns="1fr" gap="4">
        <Field actor={emailActor} />
        <Field actor={passwordActor} />
        <Box display="flex" justifyContent="flex-end">
          <Button variant="link">{'前往註冊'}</Button>
        </Box>
      </Grid>
      <Box display="flex" mt={10} justifyContent="flex-end">
        <Button
          isDisabled={!isIdle}
          variant="solid"
          onClick={onSubmit}
          size="lg"
        >
          {'登入'}
        </Button>
      </Box>
    </>
  );
};

export default LoginForm;
