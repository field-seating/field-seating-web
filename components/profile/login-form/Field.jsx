import React, { useCallback } from 'react';
import { FormControl } from '@chakra-ui/react';
import { useActor } from '@xstate/react';

import TextField from 'components/ui/TextField';
import FormErrorMessage from 'components/ui/FormErrorMessage';
import FormHelperText from 'components/ui/FormHelperText';
import FormLabel from 'components/ui/FormLabel';

const Field = ({ actor }) => {
  const [state, send] = useActor(actor);
  const onChange = useCallback(
    (evt) => {
      const { value } = evt.target;
      send({ type: 'CHANGE', value });
    },
    [send]
  );

  const isError = state.matches('error');

  const { helpText, errorMsg, label, placeholder, value, type, id } =
    state.context;

  return (
    <FormControl isInvalid={isError}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <TextField
        id={id}
        defaultValue={value}
        placeholder={placeholder}
        type={type}
        onBlur={onChange}
      />
      {!isError ? (
        <FormHelperText>{helpText}</FormHelperText>
      ) : (
        <FormErrorMessage>{errorMsg}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default Field;
