import { useContext, useCallback } from 'react';
import { useActor } from '@xstate/react';
import { Box, useDisclosure } from '@chakra-ui/react';

import { useFetchSpaces } from 'lib/fetch/fields/list-spaces';
import { GlobalStateContext } from 'lib/contexts/global-state';
import SpaceViewer from 'components/space-viewer';
import AppBar from 'components/ui/app-bar';
import ZoneCriteriaDrawer from './zone-criteria-drawer';

const SpaceSelector = () => {
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

  const onSave = useCallback(
    ({ fieldId, orientationId, levelId, zoneId }) => {
      sendToUploadStepperActor({
        type: 'SAVE_SPACE_CRITERIA',
        fieldId,
        orientationId,
        levelId,
        zoneId,
      });
      onClose();
    },
    [sendToUploadStepperActor, onClose]
  );

  // TODO: handle error
  const { data: spaces } = useFetchSpaces(zoneId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box display="flex" flexDir="column" height="100%">
        <AppBar title="" hasBackward onBack={onBack} hasMenu onMenu={onOpen} />
        <Box flex="1" width="100%" overflowX="auto" pt={[4, 8]} pl={[4, 8]}>
          <SpaceViewer spaces={spaces || []} onSpaceSelect={onSpaceSelect} />
        </Box>
      </Box>
      <ZoneCriteriaDrawer isOpen={isOpen} onClose={onClose} onSave={onSave} />
    </>
  );
};

export default SpaceSelector;
