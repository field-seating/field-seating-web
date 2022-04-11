import React, { useCallback } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useActor } from '@xstate/react';

import TextField from 'components/ui/TextField';

const Field = ({ actor }) => {
  const [state, send] = useActor(actor);
  const isError = state.matches('error');
  const onChange = useCallback(
    (evt) => {
      const { value } = evt.target;
      send({ type: 'CHANGE', value });
    },
    [send]
  );

  return (
    <FormControl isInvalid={isError}>
      <FormLabel htmlFor={state.id}>{state.context.label}</FormLabel>
      <TextField
        id={state.id}
        defaultValue={state.context.value}
        onBlur={onChange}
      />
      {!isError ? (
        <FormHelperText>{state.context.helpText}</FormHelperText>
      ) : (
        <FormErrorMessage>{state.context.errorMsg}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default Field;
