import { useContext } from 'react';
import { useActor } from '@xstate/react';

import {
  selectImagePreviewer,
  selectInfoSelector,
  selectSpaceSelector,
} from 'lib/machines/upload-stepper-machine';
import { GlobalStateContext } from 'lib/contexts/global-state';

import PreviewImages from './preview-images';
import SelectSpace from './select-space';

const getFormComponent = (state) => {
  if (selectImagePreviewer(state)) {
    return PreviewImages;
  }

  if (selectSpaceSelector(state)) {
    return SelectSpace;
  }

  if (selectInfoSelector) {
    return () => null;
  }

  return () => null;
};

const UploadContent = () => {
  const { uploadStepperService } = useContext(GlobalStateContext);
  const [uploadStepperState] = useActor(uploadStepperService);

  const Component = getFormComponent(uploadStepperState);

  return <Component />;
};

export default UploadContent;
