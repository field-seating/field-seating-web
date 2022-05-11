import React, { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import authMachine from 'lib/machines/auth';

export const GlobalStateContext = createContext({});

export const GlobalStateProvider = (props) => {
  const authService = useInterpret(authMachine, { devTools: true });

  return (
    <GlobalStateContext.Provider value={{ authService }}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};
