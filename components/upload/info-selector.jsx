import { useContext } from 'react';
import { useActor } from '@xstate/react';
import { Box } from '@chakra-ui/react';
import { useMachine } from '@xstate/react';

import DatetimeActorField from 'components/datetime-actor-field';
import { GlobalStateContext } from 'lib/contexts/global-state';

import machine from './info-selector-machine';
import Stepper from './stepper';
import { getChildProps } from './helpers';
import Button from 'components/ui/button';

const InfoSelector = () => {
  const [currentForm] = useMachine(machine, { devTools: true });

  const { uploadStepperService } = useContext(GlobalStateContext);
  const [uploadStepperState, sendToUploadStepperActor] =
    useActor(uploadStepperService);

  const { stepIndex, title, totalStep } = uploadStepperState.context;

  const { forwardTitle, onForward, backTitle, onBack } = getChildProps(
    sendToUploadStepperActor
  )(stepIndex, totalStep);

  const { datetime: datetimeActor } = currentForm.context.inputRefs;

  return (
    <Stepper
      forwardTitle={forwardTitle}
      onForward={onForward}
      backTitle={backTitle}
      onBack={onBack}
      title={title}
    >
      <Box mb={8}>
        <Button size="md">選擇座位</Button>
      </Box>
      <Box>
        <DatetimeActorField actor={datetimeActor} />
      </Box>
    </Stepper>
  );
};

export default InfoSelector;
