import React, { createContext } from 'react';
import { useInterpret } from '@xstate/react';

import authMachine from 'lib/machines/auth';
import uploadStepperMachine, {
  selectLoading,
  selectFailure,
  selectSuccess,
} from 'lib/machines/upload-stepper-machine';
import loadingMachine from 'lib/machines/loading-machine';
import browsePhotosMachine from 'lib/machines/browse-photos';

export const GlobalStateContext = createContext({});

export const GlobalStateProvider = (props) => {
  const authService = useInterpret(authMachine, { devTools: true });
  const uploadStepperService = useInterpret(uploadStepperMachine, {
    devTools: true,
  });

  const loadingService = useInterpret(loadingMachine, {
    devTools: true,
  });

  const browsePhotosService = useInterpret(browsePhotosMachine, {
    devTools: true,
  });

  uploadStepperService.onTransition((state) => {
    if (!state.changed) {
      return;
    }

    if (selectLoading(state)) {
      loadingService.send('ACTIVATE');
    }

    if (selectSuccess(state) || selectFailure(state)) {
      loadingService.send('DEACTIVATE');
    }
  });

  return (
    <GlobalStateContext.Provider
      value={{
        authService,
        uploadStepperService,
        loadingService,
        browsePhotosService,
      }}
    >
      {props.children}
    </GlobalStateContext.Provider>
  );
};
