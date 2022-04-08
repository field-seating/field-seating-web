import { createMachine, assign, send, sendParent, actions } from 'xstate';

const { choose } = actions;

const inputMachineCreator = (validateFunc) =>
  createMachine(
    {
      id: 'input',
      initial: 'normal',
      context: {
        value: '',
        errorMsg: null,
        isValidated: false,
      },
      states: {
        normal: {
          on: {
            VALIDATE: {
              target: 'validating',
              actions: [send('VALIDATED')],
            },
            CHANGE: {
              actions: ['changeValue', 'validateOrNot'],
            },
          },
        },
        validating: {
          entry: 'validate',
          exit: sendParent('INPUT_VALIDATION_DONE'),
          on: {
            VALIDATED: [
              {
                target: 'error',
                cond: 'hasErrorMsg',
              },
              {
                target: 'normal',
              },
            ],
          },
        },
        error: {
          on: {
            CHANGE: {
              actions: ['changeValue', send('VALIDATE')],
            },
            VALIDATE: {
              target: 'validating',
              actions: [send('VALIDATED')],
            },
          },
        },
      },
    },
    {
      actions: {
        validate: assign((context) => {
          const isValidated = true;

          const { valid, message } = validateFunc(context.value);

          if (!valid) {
            return {
              ...context,
              isValidated,
              errorMsg: message,
            };
          }
          return {
            ...context,
            isValidated,
            errorMsg: null,
          };
        }),
        changeValue: assign((context, event) => {
          return {
            ...context,
            value: event.value,
          };
        }),
        clearError: assign((context) => ({
          ...context,
          errorMsg: null,
        })),
        validateOrNot: choose([
          {
            cond: (context) => context.isValidated,
            actions: [send('VALIDATE')],
          },
        ]),
      },
      guards: {
        hasErrorMsg: (context) => {
          return context.errorMsg !== null;
        },
      },
    }
  );

export default inputMachineCreator;
