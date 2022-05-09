import React, { useCallback, useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { Box, Grid } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Button from 'components/ui/button';
import Link from 'components/ui/link';
import useSnackbar from 'components/ui/snackbar';
import {
  selectDisabled,
  selectLoading,
  selectSuccess,
  selectFailure,
} from 'lib/machines/form';

import Field from 'components/input-actor-field';
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

  const isDisabled = selectDisabled(current);
  const isLoading = selectLoading(current);

  useEffect(() => {
    const globalErrorMsg = current.context.globalErrorMsg;
    if (selectFailure(current)) {
      snackbar({ text: globalErrorMsg, variant: 'error' });
      return;
    }

    if (selectSuccess(current)) {
      snackbar({ text: '註冊成功，已寄出認證信' });
      router.push('/profile');
      return;
    }
  }, [current, snackbar, router]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid templateColumns="1fr" gap="4">
          <Field actor={nameActor} />
          <Field actor={emailActor} />
          <Field actor={passwordActor} />
          <Field actor={confirmPasswordActor} />
          <Box display="flex" justifyContent="flex-end">
            <Link size="md" href="/profile/sign-in">
              {'前往登入'}
            </Link>
          </Box>
        </Grid>
        <Box display="flex" mt={10} justifyContent="flex-end">
          <Button
            isLoading={isLoading}
            isDisabled={isDisabled}
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
