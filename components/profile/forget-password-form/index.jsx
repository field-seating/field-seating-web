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

const ForgetPasswordForm = () => {
  const [current, send] = useMachine(machine);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      send('SUBMIT');
    },
    [send]
  );

  const { email: emailActor } = current.context.inputRefs;

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
      snackbar({ text: '密碼重置信件已寄出，請確認您的信箱' });
      router.push('/profile');
      return;
    }
  }, [current, snackbar, router]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid templateColumns="1fr" gap="4">
          <Field actor={emailActor} />
        </Grid>
        <Box display="flex" mt="16" flexDir="column">
          <Box mb="3">
            <Button
              isLoading={isLoading}
              isDisabled={isDisabled}
              variant="solid"
              type="submit"
              size="lg"
              width="100%"
            >
              {'送出'}
            </Button>
          </Box>
          <Box display="flex" justifyContent="center">
            <Link size="sm" href="/profile/sign-in">
              {'返回登入'}
            </Link>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default ForgetPasswordForm;
