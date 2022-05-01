import React, { useCallback, useEffect } from 'react';
import { FormControl, Box } from '@chakra-ui/react';
import { useActor } from '@xstate/react';
import { debounce } from 'throttle-debounce';

import TextField from 'components/ui/text-field';
import FormErrorMessage from 'components/ui/form-error-message';
import FormHelperText from 'components/ui/form-helper-text';
import FormLabel from 'components/ui/form-label';

const Field = ({ actor, defaultValue }) => {
  const [state, send] = useActor(actor);
  const onChange = useCallback(
    (evt) => {
      const { value } = evt.target;
      send({ type: 'CHANGE', value });
    },
    [send]
  );

  useEffect(() => {
    if (defaultValue) {
      send({ type: 'CHANGE', value: defaultValue });
    }
  }, [defaultValue, send]);

  const isError = state.matches('error');

  const { helpText, errorMsg, label, placeholder, value, type, id } =
    state.context;

  return (
    <FormControl id={id} isInvalid={isError}>
      <FormLabel>{label}</FormLabel>
      <TextField
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      />
      <Box h={4}>
        {!isError ? (
          <FormHelperText>{helpText}</FormHelperText>
        ) : (
          <FormErrorMessage>{errorMsg}</FormErrorMessage>
        )}
      </Box>
    </FormControl>
  );
};

export default Field;
