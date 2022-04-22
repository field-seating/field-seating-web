import React, { useCallback, useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { Box, Grid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { isNil } from 'ramda';

import Button from 'components/ui/button';
import Link from 'components/ui/link';
import useSnackbar from 'components/ui/snackbar';

import Field from 'components/InputActorField';
import machine from './machine';

const RegisterForm = () => {
  const [current, send] = useMachine(machine);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      send('SUBMIT');
    },
    [send]
  );

  const {
    name: nameActor,
    email: emailActor,
    password: passwordActor,
    confirmPassword: confirmPasswordActor,
  } = current.context.inputRefs;

  const snackbar = useSnackbar();
  const router = useRouter();

  const globalErrorMsg = current.context.globalErrorMsg;
  const responseData = current.context.responseData;
  const isIdle = current.matches('idle');
  const isLoading = current.matches('loading');

  useEffect(() => {
    if (globalErrorMsg) {
      snackbar({ text: globalErrorMsg, variant: 'error' });
    }
  }, [snackbar, globalErrorMsg]);

  useEffect(() => {
    if (!isNil(responseData)) {
      snackbar({ text: '註冊成功，已寄出認證信' });
      router.push('/profile');
    }
  }, [snackbar, responseData, router]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid templateColumns="1fr" gap="4">
          <Field actor={nameActor} />
          <Field actor={emailActor} />
          <Field actor={passwordActor} />
          <Field actor={confirmPasswordActor} />
          <Box display="flex" justifyContent="flex-end">
            <Link href="/profile/sign-in">{'前往登入'}</Link>
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
            {'確定註冊'}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default RegisterForm;
