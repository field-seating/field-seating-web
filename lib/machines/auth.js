import { assign, createMachine } from 'xstate';

import { serverUserStatusMap, roleMap } from 'lib/constants/userStatus';
import { get as getToken, clear as clearToken } from 'lib/storage/token';
import getMe from 'lib/fetch/users/get-me';

import { getDataFromSuccessfulApiEvent } from './helpers';

const defaultContext = {
  token: null,
  role: null,
  status: null,
  email: null,
  id: null,
};

const authMachine = createMachine(
  {
    id: 'auth-service',
    context: defaultContext,
    initial: 'init',
    states: {
      init: {
        on: {
          SIGNIN: {
            target: 'setup',
          },
        },
      },
      setup: {
        invoke: {
          id: 'loadToken',
          src: 'loadToken',
          onDone: [
            {
              target: 'loginAdmin',
              cond: 'isAdmin',
              actions: ['storeUserData'],
            },
            {
              target: 'loginActive',
              cond: 'isVerified',
              actions: ['storeUserData'],
            },
            {
              target: 'loginInactive',
              actions: ['storeUserData'],
            },
          ],
          onError: {
            target: 'anonymous',
            actions: ['clearToken'],
          },
        },
      },
      anonymous: {
        on: {
          SIGNIN: {
            target: 'setup',
          },
        },
      },
      loginActive: {
        on: {
          SIGNIN: {
            target: 'setup',
          },
        },
      },
      loginAdmin: {
        on: {
          SIGNIN: {
            target: 'setup',
          },
        },
      },
      loginInactive: {
        on: {
          SIGNIN: {
            target: 'setup',
          },
        },
      },
    },
    on: {
      LOGOUT: {
        target: 'anonymous',
        actions: ['clearToken', 'resetContext'],
      },
    },
  },
  {
    actions: {
      storeUserData: assign((context, event) => {
        const data = getDataFromSuccessfulApiEvent(event);
        return data;
      }),
      clearToken: () => {
        clearToken();
      },
      resetContext: assign(defaultContext),
    },
    services: {
      loadToken: async () => {
        const tokenFromStorage = getToken();

        if (!tokenFromStorage) {
          throw new Error('no token');
        }

        return await getMe();
      },
    },
    guards: {
      isVerified: (context, event) => {
        const data = getDataFromSuccessfulApiEvent(event);
        return data.status === serverUserStatusMap.ACTIVE;
      },
      isAdmin: (context, event) => {
        const data = getDataFromSuccessfulApiEvent(event);
        return (
          data.status === serverUserStatusMap.ACTIVE &&
          data.role === roleMap.ADMIN
        );
      },
    },
  }
);

export const selectInit = (state) => state.matches('init');
export const selectSetup = (state) => state.matches('setup');
export const selectLogin = (state) => {
  return (
    selectLoginAdmin(state) ||
    selectLoginActive(state) ||
    selectLoginInactive(state)
  );
};
export const selectAnonymous = (state) => state.matches('anonymous');
export const selectLoginActive = (state) => {
  return state.matches('loginActive');
};
export const selectLoginInactive = (state) => state.matches('loginInactive');

export const selectLoginAdmin = (state) => {
  return state.matches('loginAdmin');
};

export const selectReadyNotActive = (state) =>
  selectAnonymous(state) || selectLoginInactive(state);
export const selectPreparing = (state) =>
  selectInit(state) || selectSetup(state);

export default authMachine;
