import React, { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import { useRouter } from 'next/router';

import authMachine from 'lib/machines/auth';
import uploadStepperMachine from 'lib/machines/upload-stepper-machine';
import loadingMachine from 'lib/machines/loading-machine';
import browsePhotosMachine from 'lib/machines/browse-photos';

export const GlobalStateContext = createContext({});

export const GlobalStateProvider = (props) => {
  const router = useRouter();

  const authService = useInterpret(authMachine, { devTools: true });
  const uploadStepperService = useInterpret(uploadStepperMachine, {
    devTools: true,
    actions: {
      activateLoading: () => {
        loadingService.send('ACTIVATE');
      },
      deactivateLoading: () => {
        loadingService.send('DEACTIVATE');
      },
    },
  });

  const loadingService = useInterpret(loadingMachine, {
    devTools: true,
  });

  const browsePhotosService = useInterpret(browsePhotosMachine, {
    devTools: true,
    actions: {
      pushToSpacePhotos: (context) => {
        const spaceId = context.spaceId;
        router.push(`/spaces/${spaceId}/photos`);
      },
    },
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
