import React, { useCallback, useEffect, useContext } from 'react';
import { useMachine, useActor } from '@xstate/react';
import { Box, Grid } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { GlobalStateContext } from 'lib/contexts/globalState';
import Button from 'components/ui/button';
import Link from 'components/ui/link';
import useSnackbar from 'components/ui/snackbar';
import { set as setToken } from 'lib/storage/token';
import Field from 'components/input-actor-field';

import machine from './machine';

const LoginForm = () => {
  const [current, send] = useMachine(machine);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      send('SUBMIT');
    },
    [send]
  );

  const { email: emailActor, password: passwordActor } =
    current.context.inputRefs;

  const snackbar = useSnackbar();
  const router = useRouter();

  const { authService } = useContext(GlobalStateContext);
  const [, sendToAuthService] = useActor(authService);

  const globalErrorMsg = current.context.globalErrorMsg;
  const token = current.context?.responseData?.token;
  const isIdle = current.matches('idle');
  const isLoading = current.matches('loading');

  useEffect(() => {
    if (globalErrorMsg) {
      snackbar({ text: globalErrorMsg, variant: 'error' });
    }
  }, [snackbar, globalErrorMsg]);

  useEffect(() => {
    if (token) {
      setToken(token);
      snackbar({ text: '成功登入' });
      sendToAuthService('SIGNIN');
    }
  }, [snackbar, token, router, sendToAuthService]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid templateColumns="1fr" gap="4">
          <Field actor={emailActor} />
          <Field actor={passwordActor} />
          <Box display="flex" justifyContent="flex-end">
            <Link size="md" href="/profile/sign-up">
              {'前往註冊'}
            </Link>
          </Box>
        </Grid>
        <Box display="flex" mt={10} justifyContent="flex-end">
          <Button
            isLoading={isLoading}
            isDisabled={!isIdle}
            variant="solid"
            type="submit"
            size="lg"
          >
            {'登入'}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default LoginForm;
