import React, { createContext } from 'react';
import { useInterpret } from '@xstate/react';

import authMachine from 'lib/machines/auth';
import uploadStepperMachine from 'lib/machines/upload-stepper-machine';

export const GlobalStateContext = createContext({});

export const GlobalStateProvider = (props) => {
  const authService = useInterpret(authMachine, { devTools: true });
  const uploadStepperService = useInterpret(uploadStepperMachine, {
    devTools: true,
  });

  return (
    <GlobalStateContext.Provider value={{ authService, uploadStepperService }}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};
