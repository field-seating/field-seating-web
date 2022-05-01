import React, { useEffect, useCallback, useContext } from 'react';
import { useMachine, useActor } from '@xstate/react';
import { Box, Grid } from '@chakra-ui/react';

import { GlobalStateContext } from 'lib/contexts/globalState';
import Button from 'components/ui/button';
import Field from 'components/input-actor-field';
import useSnackbar from 'components/ui/snackbar';

import machine from './machine';

const InfoForm = () => {
  const [current, send] = useMachine(machine, { devTools: true });
  const { authService } = useContext(GlobalStateContext);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      send('SUBMIT');
    },
    [send]
  );

  const [state] = useActor(authService);

  const snackbar = useSnackbar();

  const { name: nameActor } = current.context.inputRefs;

  const globalErrorMsg = current.context.globalErrorMsg;
  const isIdle = current.matches('idle');
  const isLoading = current.matches('loading');

  useEffect(() => {
    if (globalErrorMsg) {
      snackbar({ text: globalErrorMsg, variant: 'error' });
    }
  }, [snackbar, globalErrorMsg]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid templateColumns="1fr" gap="4">
          <Field actor={nameActor} defaultValue={state.context.name} />
        </Grid>
        <Box display="flex" mt={10} justifyContent="flex-end">
          <Button
            isLoading={isLoading}
            isDisabled={!isIdle}
            variant="solid"
            type="submit"
            size="lg"
          >
            {'送出修改'}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default InfoForm;
