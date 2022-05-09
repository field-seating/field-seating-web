import { assign, createMachine } from 'xstate';

import { serverUserStatusMap } from 'lib/constants/userStatus';
import { get as getToken, clear as clearToken } from 'lib/storage/token';
import getMe from 'lib/fetch/users/get-me';

import { getDataFromSuccessfulApiEvent } from './helpers';

const defaultContext = {
  token: null,
  role: null,
  status: null,
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
              target: 'login.active',
              cond: 'isVerified',
              actions: ['storeUserData'],
            },
            {
              target: 'login.inactive',
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
      login: {
        initial: 'inactive',
        states: {
          active: {},
          inactive: {},
        },
        on: {
          SIGNIN: {
            target: 'setup',
          },
          LOGOUT: {
            target: 'anonymous',
            actions: ['clearToken', 'resetContext'],
          },
        },
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
    },
  }
);

export const selectInit = (state) => state.matches('init');
export const selectLogin = (state) => state.matches('login');
export const selectAnonymous = (state) => state.matches('anonymous');
export const selectLoginActive = (state) => state.matches('login.active');
export const selectLoginInactive = (state) => state.matches('login.inactive');

export default authMachine;
