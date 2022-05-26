import React, { useCallback, useEffect } from 'react';
import { FormControl, Box } from '@chakra-ui/react';
import { useActor } from '@xstate/react';

import Select from 'components/ui/select';
import FormErrorMessage from 'components/ui/form-error-message';
import FormHelperText from 'components/ui/form-helper-text';
import FormLabel from 'components/ui/form-label';
import { selectError } from 'lib/machines/input-machine-creator';

const SelectActorField = ({ actor, defaultValue, size, options }) => {
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

  const isError = selectError(state);

  const { helpText, errorMsg, label, value, id, placeholder } = state.context;

  return (
    <FormControl id={id} isInvalid={isError}>
      <FormLabel>{label}</FormLabel>
      <Select
        size={size}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </Select>
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

SelectActorField.defaultProps = {
  options: [],
};

export default SelectActorField;
