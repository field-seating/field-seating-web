import { useMachine } from '@xstate/react';

import uploadStepperMachine, {
  selectFilterZone,
  selectSelectSpace,
} from 'lib/machines/upload-stepper-machine';

import { getChildProps } from './helpers';
import FilterZones from './filter-zones';
import SelectSpace from './select-space';

const getFormComponent = (state) => {
  if (selectFilterZone(state)) {
    return FilterZones;
  }

  if (selectSelectSpace(state)) {
    return SelectSpace;
  }
  return null;
};

const UploadContent = () => {
  const [current, send] = useMachine(uploadStepperMachine, { devTools: true });

  const { stepIndex, title, totalStep } = current.context;

  const { forwardTitle, onForward, backTitle, onBack } = getChildProps(send)(
    stepIndex,
    totalStep
  );

  const Component = getFormComponent(current);

  return (
    <Component
      forwardTitle={forwardTitle}
      onForward={onForward}
      backTitle={backTitle}
      onBack={onBack}
      title={`${stepIndex}：${title}`}
    />
  );
};

export default UploadContent;
