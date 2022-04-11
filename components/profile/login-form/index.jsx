import React, { useCallback } from 'react';
import { useMachine } from '@xstate/react';

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
      <Field actor={emailActor} />
      <Field actor={passwordActor} />
      <Field actor={confirmPasswordActor} />
      <Button variant="solid" onClick={onSubmit}>
        {'登入'}
      </Button>
    </>
  );
};

export default LoginForm;
