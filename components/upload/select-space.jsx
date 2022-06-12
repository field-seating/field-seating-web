import { useContext, useCallback } from 'react';
import { useMachine, useActor } from '@xstate/react';

import { useFetchSpaces } from 'lib/fetch/fields/list-spaces';
import { GlobalStateContext } from 'lib/contexts/global-state';
import SpaceViewer from 'components/space-viewer';
//import { selectSuccess, selectFailure } from 'lib/machines/form';

import machine from './select-space-machine';

const SelectSpace = () => {
  const { uploadStepperService } = useContext(GlobalStateContext);
  const [uploadStepperState] = useActor(uploadStepperService);

  const [currentForm] = useMachine(machine, { devTools: true });

  const { zoneId } = uploadStepperState.context.flowData;
  const { space: spaceService } = currentForm.context.inputRefs;
  const [, sendToSpaceActor] = useActor(spaceService);

  const onSpaceSelect = useCallback(
    (spaceId) => {
      sendToSpaceActor({ type: 'CHANGE', value: spaceId });
    },
    [sendToSpaceActor]
  );

  // TODO: handle error
  const { data: spaces } = useFetchSpaces(zoneId);

  return <SpaceViewer spaces={spaces} onSpaceSelect={onSpaceSelect} />;
};

export default SelectSpace;
