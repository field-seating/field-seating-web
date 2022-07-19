import { useContext, useCallback } from 'react';
import { useActor } from '@xstate/react';
import { Box, useDisclosure } from '@chakra-ui/react';
import { always, any, ifElse, isNil } from 'ramda';

import { useFetchSpaces } from 'lib/fetch/fields/list-spaces';
import { useFetchField } from 'lib/fetch/fields/get-field';
import { useFetchZone } from 'lib/fetch/fields/get-zone';
import { GlobalStateContext } from 'lib/contexts/global-state';
import SpaceViewer from 'components/space-viewer';
import AppBar from 'components/ui/app-bar';
import ZoneCriteriaDrawer from 'components/zone-criteria-drawer';

const anyNil = any(isNil);
const renderTitle = ifElse(
  anyNil,
  always(''),
  ([field, zone]) => `${field.name} ${zone.name}`
);

const SpaceSelector = () => {
  const { uploadStepperService } = useContext(GlobalStateContext);
  const [uploadStepperState, sendToUploadStepperActor] =
    useActor(uploadStepperService);

  const { zoneId, fieldId, levelId, orientationId } =
    uploadStepperState.context.flowData;

  const onSpaceSelect = useCallback(
    (spaceId) => {
      sendToUploadStepperActor({ type: 'SELECT_SPACE', spaceId });
    },
    [sendToUploadStepperActor]
  );

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

  const { data: spaces } = useFetchSpaces(zoneId);
  const { data: field } = useFetchField(fieldId);
  const { data: zone } = useFetchZone(zoneId);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const title = renderTitle([field, zone]);

  return (
    <>
      <Box display="flex" flexDir="column" height="100%">
        <AppBar
          title={title}
          hasBackward
          onBack={onBack}
          hasMenu
          onMenu={onOpen}
        />
        <Box flex="1" width="100%" overflowX="auto" pt={[4, 8]} px={[4, 8]}>
          <SpaceViewer spaces={spaces || []} onSpaceSelect={onSpaceSelect} />
        </Box>
      </Box>
      <ZoneCriteriaDrawer
        isOpen={isOpen}
        onClose={onClose}
        onSave={onSave}
        defaultFieldId={fieldId}
        defaultLevelId={levelId}
        defaultOrientationId={orientationId}
        defaultZoneId={zoneId}
      />
    </>
  );
};

export default SpaceSelector;
