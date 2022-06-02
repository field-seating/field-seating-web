import { useMachine } from '@xstate/react';

import uploadStepperMachine, {
  selectFilterZone,
  selectSelectSpace,
  selectPreviewImages,
} from 'lib/machines/upload-stepper-machine';

import { getChildProps } from './helpers';
import FilterZones from './filter-zones';
import SelectSpace from './select-space';
import PreviewImages from './preview-images';

const getFormComponent = (state) => {
  if (selectFilterZone(state)) {
    return FilterZones;
  }

  if (selectSelectSpace(state)) {
    return SelectSpace;
  }

  if (selectPreviewImages(state)) {
    return PreviewImages;
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
      flowData={current.context.flowData}
    />
  );
};

export default UploadContent;
