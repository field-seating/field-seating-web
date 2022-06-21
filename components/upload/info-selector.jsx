import { useContext, useCallback, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useMachine, useSelector } from '@xstate/react';

import DateActorField from 'components/date-actor-field';
import { GlobalStateContext } from 'lib/contexts/global-state';
import { selectSuccess } from 'lib/machines/form';
import { selectInfoSelector } from 'lib/machines/upload-stepper-machine';

import machine from './info-selector-machine';
import Stepper from './stepper';
import SelectSpaceButton from './select-space-button';
import { getChildProps } from './helpers';

const InfoSelector = () => {
  const [currentForm, sendToForm] = useMachine(machine, { devTools: true });

  const { uploadStepperService } = useContext(GlobalStateContext);

  const {
    stepIndex,
    title,
    totalStep,
    flowData: { spaceId },
  } = uploadStepperService.getSnapshot().context;

  const isInfoSelector = useSelector(uploadStepperService, selectInfoSelector);

  const { forwardTitle, onForward, backTitle, onBack } = getChildProps(
    uploadStepperService.send
  )(stepIndex, totalStep);

  const { datetime: datetimeActor, space: spaceActor } =
    currentForm.context.inputRefs;

  const toSpaceSelector = useCallback(() => {
    uploadStepperService.send('OPEN_SPACE_SELECTOR');
  }, [uploadStepperService]);

  useEffect(() => {
    if (selectSuccess(currentForm) && isInfoSelector) {
      const datetime = datetimeActor.getSnapshot().context.value;

      onForward({ photoDatetime: datetime });
      return;
    }
  }, [currentForm, onForward, datetimeActor, isInfoSelector]);

  const onSubmit = useCallback(() => {
    sendToForm('SUBMIT');
  }, [sendToForm]);

  return (
    <Stepper
      forwardTitle={forwardTitle}
      onForward={onSubmit}
      backTitle={backTitle}
      onBack={onBack}
      title={title}
    >
      <Box mb={8}>
        <SelectSpaceButton
          onClick={toSpaceSelector}
          actor={spaceActor}
          defaultValue={spaceId}
        />
      </Box>
      <Box>
        <DateActorField actor={datetimeActor} />
      </Box>
    </Stepper>
  );
};

export default InfoSelector;
