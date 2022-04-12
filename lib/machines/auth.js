import { assign, createMachine } from 'xstate';

import { serverUserStatusMap } from 'lib/constants/userStatus';

import { getDataFromSuccessfulApiEvent } from './helpers';

const authMachine = createMachine(
  {
    id: 'auth-service',
    context: {
      token: null,
      role: null,
      status: null,
    },
    initial: 'idle',
    states: {
      idle: {
        invoke: {
          id: 'loadToken',
          src: 'loadToken',
          onDone: [
            {
              target: 'login',
              cond: 'isVerified',
              actions: ['storeUserData'],
            },
            {
              target: 'unverified',
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
            target: 'login',
          },
        },
      },
      unverified: {
        on: {
          SIGNIN: {},
          LOGOUT: {
            target: 'anonymous',
          },
        },
      },
      login: {
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
    },
    services: {
      loadToken: () => {
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
