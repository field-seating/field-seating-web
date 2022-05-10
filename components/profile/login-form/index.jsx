import React, { useCallback, useEffect, useContext } from 'react';
import { useMachine, useActor } from '@xstate/react';
import { Box, Grid, Text } from '@chakra-ui/react';

import { GlobalStateContext } from 'lib/contexts/globalState';
import Button from 'components/ui/button';
import Link from 'components/ui/link';
import useSnackbar from 'components/ui/snackbar';
import { set as setToken } from 'lib/storage/token';
import Field from 'components/input-actor-field';
import {
  selectDisabled,
  selectLoading,
  selectSuccess,
  selectFailure,
} from 'lib/machines/form';

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

  const { authService } = useContext(GlobalStateContext);
  const [, sendToAuthService] = useActor(authService);

  const token = current.context?.responseData?.token;
  const isDisabled = selectDisabled(current);
  const isLoading = selectLoading(current);

  useEffect(() => {
    const globalErrorMsg = current.context.globalErrorMsg;
    if (selectFailure(current)) {
      snackbar({ text: globalErrorMsg, variant: 'error' });
      return;
    }

    if (selectSuccess(current)) {
      setToken(token);
      snackbar({ text: '成功登入' });
      sendToAuthService('SIGNIN');
      return;
    }
  }, [current, snackbar, token, sendToAuthService]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid templateColumns="1fr" gap="4">
          <Field actor={emailActor} />
          <Field actor={passwordActor} />
          <Box display="flex" justifyContent="flex-end">
            <Link size="md" href="/profile/recovery-password">
              {'忘記密碼'}
            </Link>
          </Box>
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
              {'登入'}
            </Button>
          </Box>
          <Box display="flex" justifyContent="center">
            <Text fontSize="sm" color="onSurface.40" mr="1">
              已經有帳號了？
            </Text>
            <Link size="sm" href="/profile/sign-up">
              {'前往註冊'}
            </Link>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default LoginForm;
