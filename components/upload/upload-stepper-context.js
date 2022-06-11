import React, { createContext } from 'react';
import { useInterpret } from '@xstate/react';

import machine from 'lib/machines/upload-stepper-machine';

export const UploadStepperContext = createContext({});

export const UploadStepperProvider = (props) => {
  const service = useInterpret(machine, { devTools: true });

  return (
    <UploadStepperContext.Provider value={service}>
      {props.children}
    </UploadStepperContext.Provider>
  );
};
