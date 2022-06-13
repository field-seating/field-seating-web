import { useContext, useCallback } from 'react';
import { useActor } from '@xstate/react';

import { useFetchSpaces } from 'lib/fetch/fields/list-spaces';
import { GlobalStateContext } from 'lib/contexts/global-state';
import SpaceViewer from 'components/space-viewer';
import AppBar from 'components/ui/app-bar';

const SelectSpace = () => {
  const { uploadStepperService } = useContext(GlobalStateContext);
  const [uploadStepperState, sendToUploadStepperActor] =
    useActor(uploadStepperService);

  const { zoneId } = uploadStepperState.context.flowData;

  const onSpaceSelect = useCallback((spaceId) => {
    console.log('select spaceId: ', spaceId);
  }, []);

  const onBack = useCallback(() => {
    sendToUploadStepperActor('BACK');
  }, [sendToUploadStepperActor]);

  // TODO: handle error
  const { data: spaces } = useFetchSpaces(zoneId);

  return (
    <>
      <AppBar title="" hasBackward onBack={onBack}>
        <SpaceViewer spaces={spaces} onSpaceSelect={onSpaceSelect} />;
      </AppBar>
    </>
  );
};

export default SelectSpace;
