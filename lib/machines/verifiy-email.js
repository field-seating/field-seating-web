import { createMachine, assign } from 'xstate';
import verfiyEmail from 'lib/fetch/verify-email';
import { getDataFromFailurefulApiEvent } from 'lib/machines/helpers';

const verifyEmailMachine = createMachine(
  {
    id: 'verify-email',
    context: {
      globalErrorMsg: null,
    },
    initial: 'init',
    states: {
      init: {
        on: {
          VERIFY: {
            target: 'loading',
          },
        },
      },
      loading: {
        invoke: {
          id: 'verify-email-request',
          src: 'verifyEmail',
          onDone: {
            target: 'success',
          },
          onError: {
            target: 'failure',
            actions: ['storeErrorMessage'],
          },
        },
      },
      success: {
        type: 'final',
      },
      failure: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      storeErrorMessage: assign({
        globalErrorMsg: (context, event) =>
          getDataFromFailurefulApiEvent(event).message,
      }),
    },
    services: {
      verifyEmail: async (context, event) => {
        await verfiyEmail(event.token);
      },
    },
  }
);

export default verifyEmailMachine;
