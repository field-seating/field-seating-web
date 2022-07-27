import React, { useCallback, useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { Box, Grid, Text } from '@chakra-ui/react';
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
        </Grid>
        <Box display="flex" mt={8} flexDir="column">
          <Box mb="3">
            <Box mb="2">
              <Text color="onSurface.40" fontSize="xs">
                請先參閱我們的
                <Link size="xs" href="/privacy" isExternal>
                  隱私權條款
                </Link>
              </Text>
              <Text color="onSurface.40" fontSize="xs">
                若註冊則視為同意
              </Text>
            </Box>
            <Button
              isLoading={isLoading}
              isDisabled={isDisabled}
              variant="solid"
              type="submit"
              size="lg"
              width="100%"
            >
              {'確定註冊'}
            </Button>
          </Box>
          <Box display="flex" justifyContent="center">
            <Link size="sm" href="/profile/sign-in">
              {'前往登入'}
            </Link>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default RegisterForm;
