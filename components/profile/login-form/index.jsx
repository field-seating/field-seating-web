import React, { useCallback } from 'react';
import { useMachine } from '@xstate/react';
import { Box, Grid } from '@chakra-ui/react';

import Button from 'components/ui/Button';

import Field from './Field';
import machine from './machine';

const LoginForm = () => {
  const [current, send] = useMachine(machine);
  const onSubmit = useCallback(() => {
    send('SUBMIT');
  }, [send]);

  const {
    email: emailActor,
    password: passwordActor,
    confirmPassword: confirmPasswordActor,
  } = current.context.inputRefs;

  return (
    <>
      <Grid templateColumns="1fr" gap="4">
        <Field actor={emailActor} />
        <Field actor={passwordActor} />
        <Field actor={confirmPasswordActor} />
        <Box display="flex" justifyContent="flex-end">
          <Button variant="link">{'前往註冊'}</Button>
        </Box>
      </Grid>
      <Box display="flex" mt={10} justifyContent="flex-end">
        <Button variant="solid" onClick={onSubmit} size="lg">
          {'登入'}
        </Button>
      </Box>
    </>
  );
};

export default LoginForm;
