import { useContext, useCallback } from 'react';
import { useActor } from '@xstate/react';
import { Box } from '@chakra-ui/react';
import { useMachine } from '@xstate/react';
import { isNil, always, ifElse, any } from 'ramda';

import Button from 'components/ui/button';
import DatetimeActorField from 'components/datetime-actor-field';
import { renderSpaceTitle } from 'components/space-viewer/helpers';
import { GlobalStateContext } from 'lib/contexts/global-state';
import { useFetchSpace } from 'lib/fetch/fields/get-space';
import { useFetchZone } from 'lib/fetch/fields/get-zone';
import { useFetchField } from 'lib/fetch/fields/get-field';

import machine from './info-selector-machine';
import Stepper from './stepper';
import { getChildProps } from './helpers';

const anyNil = any(isNil);
const renderSpaceLabel = ifElse(
  anyNil,
  always('選擇座位'),
  ([field, zone, space]) =>
    `${field.name} - ${zone.name} ${renderSpaceTitle(space.spaceType)(space)}`
);

const InfoSelector = () => {
  const [currentForm] = useMachine(machine, { devTools: true });

  const { uploadStepperService } = useContext(GlobalStateContext);
  const [uploadStepperState, sendToUploadStepperActor] =
    useActor(uploadStepperService);

  const {
    stepIndex,
    title,
    totalStep,
    flowData: { spaceId, zoneId, fieldId },
  } = uploadStepperState.context;

  const { forwardTitle, onForward, backTitle, onBack } = getChildProps(
    sendToUploadStepperActor
  )(stepIndex, totalStep);

  const { datetime: datetimeActor } = currentForm.context.inputRefs;

  const toSpaceSelector = useCallback(() => {
    sendToUploadStepperActor('OPEN_SPACE_SELECTOR');
  }, [sendToUploadStepperActor]);

  const { data: field } = useFetchField(fieldId);
  const { data: space } = useFetchSpace(spaceId);
  const { data: zone } = useFetchZone(zoneId);
  const spaceLabel = renderSpaceLabel([field, zone, space]);

  return (
    <Stepper
      forwardTitle={forwardTitle}
      onForward={onForward}
      backTitle={backTitle}
      onBack={onBack}
      title={title}
    >
      <Box mb={8}>
        <Button variant="outline" onClick={toSpaceSelector} size="md">
          {spaceLabel}
        </Button>
      </Box>
      <Box>
        <DatetimeActorField actor={datetimeActor} />
      </Box>
    </Stepper>
  );
};

export default InfoSelector;
