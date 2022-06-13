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
import InfoSelector from './info-selector';

const getFormComponent = (state) => {
  if (selectImagePreviewer(state)) {
    return PreviewImages;
  }

  if (selectSpaceSelector(state)) {
    return SelectSpace;
  }

  if (selectInfoSelector) {
    return InfoSelector;
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
