import { useContext, useEffect } from 'react';
import { FormControl, Box } from '@chakra-ui/react';
import { useActor } from '@xstate/react';
import { isNil, always, ifElse, any } from 'ramda';

import Button from 'components/ui/button';
import { renderSpaceTitle } from 'components/space-viewer/helpers';
import { useFetchSpace } from 'lib/fetch/fields/get-space';
import { useFetchZone } from 'lib/fetch/fields/get-zone';
import { useFetchField } from 'lib/fetch/fields/get-field';
import { GlobalStateContext } from 'lib/contexts/global-state';
import FormErrorMessage from 'components/ui/form-error-message';
import { selectError } from 'lib/machines/input-machine-creator';

const anyNil = any(isNil);
const renderSpaceLabel = ifElse(
  anyNil,
  always('選擇座位'),
  ([field, zone, space]) =>
    `${field.name} - ${zone.name} ${renderSpaceTitle(space.spaceType)(space)}`
);

const SelectSpaceButton = ({ onClick, actor, defaultValue }) => {
  const { uploadStepperService } = useContext(GlobalStateContext);
  const [uploadStepperState] = useActor(uploadStepperService);

  const [state, send] = useActor(actor);

  useEffect(() => {
    if (defaultValue) {
      send({ type: 'CHANGE', value: defaultValue });
    }
  }, [defaultValue, send]);

  const {
    flowData: { zoneId, fieldId },
  } = uploadStepperState.context;

  const { value: spaceId, errorMsg, id } = state.context;
  const isError = selectError(state);

  const { data: field } = useFetchField(fieldId);
  const { data: space } = useFetchSpace(spaceId);
  const { data: zone } = useFetchZone(zoneId);
  const spaceLabel = renderSpaceLabel([field, zone, space]);

  return (
    <FormControl id={id} isInvalid={isError}>
      <Button variant="outline" onClick={onClick} size="md">
        {spaceLabel}
      </Button>
      <Box h={4}>
        {isError && <FormErrorMessage>{errorMsg}</FormErrorMessage>}
      </Box>
    </FormControl>
  );
};

export default SelectSpaceButton;
