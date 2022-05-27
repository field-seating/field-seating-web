import { useMachine } from '@xstate/react';

import uploadStepperMachine, {
  selectFilterZone,
  selectSelectSpace,
} from 'lib/machines/upload-stepper-machine';

import Stepper from './stepper';
import { getFooterOptions } from './helpers';
import FilterZones from './filter-zones';
import SelectSpace from './select-space';

const getFormComponent = (state) => {
  if (selectFilterZone(state)) {
    return <FilterZones />;
  }

  if (selectSelectSpace(state)) {
    return <SelectSpace />;
  }
  return null;
};

const UploadContent = () => {
  const [current, send] = useMachine(uploadStepperMachine, { devTools: true });

  const { stepIndex, title, totalStep } = current.context;

  const { back, forward } = getFooterOptions(send)(stepIndex, totalStep);

  return (
    <Stepper back={back} forward={forward} stepIndex={stepIndex} title={title}>
      {getFormComponent(current)}
    </Stepper>
  );
};

export default UploadContent;
