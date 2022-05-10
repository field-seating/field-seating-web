import React, { useEffect, useCallback, useContext } from 'react';
import { useMachine, useActor } from '@xstate/react';
import { Box, Grid, useDisclosure } from '@chakra-ui/react';

import { GlobalStateContext } from 'lib/contexts/globalState';
import Button from 'components/ui/button';
import Field from 'components/input-actor-field';
import useSnackbar from 'components/ui/snackbar';
import Prompt from 'components/ui/prompt';
import {
  selectDisabled,
  selectLoading,
  selectSuccess,
  selectFailure,
} from 'lib/machines/form';

import machine from './machine';

const InfoForm = () => {
  const [current, send] = useMachine(machine, { devTools: true });
  const { authService } = useContext(GlobalStateContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const [state, sendToAuthService] = useActor(authService);

  const snackbar = useSnackbar();

  const { name: nameActor } = current.context.inputRefs;

  const isDisabled = selectDisabled(current);
  const isLoading = selectLoading(current);

  const login = useCallback(() => {
    sendToAuthService('SIGNIN');
  }, [sendToAuthService]);

  useEffect(() => {
    const globalErrorMsg = current.context.globalErrorMsg;
    if (selectFailure(current)) {
      snackbar({ text: globalErrorMsg, variant: 'error' });
      return;
    }

    if (selectSuccess(current)) {
      snackbar({ text: '成功更新' });
      login();
      return;
    }
  }, [current, snackbar, login]);

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <Grid templateColumns="1fr" gap="4">
          <Field actor={nameActor} defaultValue={state.context.name} />
        </Grid>
        <Box display="flex" mt={10} justifyContent="flex-end">
          <Button
            isLoading={isLoading}
            isDisabled={isDisabled}
            variant="solid"
            type="submit"
            size="lg"
          >
            {'送出修改'}
          </Button>
        </Box>
      </form>
      <Prompt
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        title="確定修改個人資訊？"
      />
    </>
  );
};

export default InfoForm;
