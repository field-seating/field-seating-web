import { createMachine } from 'xstate';

const authMachine = createMachine(
  {
    id: 'auth-service',
    context: {
      token: null,
      role: null,
    },
    initial: 'anonymous',
    states: {
      anonymous: {
        on: {
          SIGNIN: {},
        },
      },
      unverified: {
        on: {
          SIGNIN: {},
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
    actions: {},
  }
);

export default authMachine;
