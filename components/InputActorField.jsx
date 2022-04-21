import React, { useCallback } from 'react';
import { FormControl } from '@chakra-ui/react';
import { useActor } from '@xstate/react';
import { debounce } from 'throttle-debounce';

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

  const onKeyDown = useCallback(
    (evt) => {
      if (evt.key === 'Enter') {
        const { value } = evt.target;
        send({ type: 'CHANGE', value });
      }
    },
    [send]
  );

  const isError = state.matches('error');

  const { helpText, errorMsg, label, placeholder, value, type, id } =
    state.context;

  return (
    <FormControl id={id} isInvalid={isError}>
      <FormLabel>{label}</FormLabel>
      <TextField
        defaultValue={value}
        placeholder={placeholder}
        type={type}
        onBlur={onChange}
        onChange={debounce(1000, onChange)}
        onKeyDown={onKeyDown}
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
