import { useContext } from 'react';
import { useActor } from '@xstate/react';

import {
  selectImagePreviewer,
  selectInfoSelector,
  selectSpaceSelector,
  selectFailure,
} from 'lib/machines/upload-stepper-machine';
import { GlobalStateContext } from 'lib/contexts/global-state';

import PreviewImages from './preview-images';
import SpaceSelector from './space-selector';
import InfoSelector from './info-selector';

const getFormComponent = (state) => {
  if (selectImagePreviewer(state)) {
    return PreviewImages;
  }

  if (selectSpaceSelector(state)) {
    return SpaceSelector;
  }

  if (selectInfoSelector(state)) {
    return InfoSelector;
  }

  if (selectFailure(state)) {
    return InfoSelector;
  }

  return InfoSelector;
};

const UploadContent = () => {
  const { uploadStepperService } = useContext(GlobalStateContext);
  const [uploadStepperState] = useActor(uploadStepperService);

  const Component = getFormComponent(uploadStepperState);

  return <Component />;
};

export default UploadContent;
