import { assign, createMachine } from 'xstate';

import { serverUserStatusMap } from 'lib/constants/userStatus';
import { get as getToken, clear as clearToken } from 'lib/storage/token';

import { getDataFromSuccessfulApiEvent } from './helpers';

const authMachine = createMachine(
  {
    id: 'auth-service',
    context: {
      token: null,
      role: null,
      status: null,
    },
    initial: 'setup',
    states: {
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
          LOGOUT: {
            target: 'anonymous',
          },
        },
      },
    },
  },
  {
    actions: {
      storeUserData: assign((context, event) => {
        const data = getDataFromSuccessfulApiEvent(event);
        return {
          token: data.token,
          role: data.user.role,
          status: data.user.status,
        };
      }),
      clearToken: () => {
        clearToken();
      },
    },
    services: {
      loadToken: () => {
        const tokenFromStorage = getToken();

        if (!tokenFromStorage) {
          return Promise.reject('error');
        }
        return Promise.resolve({
          data: {
            token: 'token',
            user: { role: 'role', status: 'active' },
          },
        });
      },
    },
    guards: {
      isVerified: (context, event) => {
        const data = getDataFromSuccessfulApiEvent(event);
        return data.user.status === serverUserStatusMap.ACTIVE;
      },
    },
  }
);

export default authMachine;
