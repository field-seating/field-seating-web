import { assign, createMachine } from 'xstate';

import { serverUserStatusMap } from 'lib/constants/userStatus';
import { get as getToken, clear as clearToken } from 'lib/storage/token';
import getUserInfo from 'lib/fetch/users/getInfo';

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
        return data;
      }),
      clearToken: () => {
        clearToken();
      },
    },
    services: {
      loadToken: async () => {
        try {
          const tokenFromStorage = getToken();

          if (!tokenFromStorage) {
            throw new Error('no token');
          }

          return await getUserInfo();
        } catch (err) {
          console.log(err);
          throw err;
        }
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

export default authMachine;
