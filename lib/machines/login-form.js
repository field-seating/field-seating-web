import {
  createMachine,
  assign,
  spawn,
  send,
  actions,
  sendParent,
} from 'xstate';

import { values, map, equals, toPairs, reduce, compose, any, all } from 'ramda';

const { pure, choose } = actions;

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
          if (!validateFunc(context.value)) {
            return {
              ...context,
              isValidated,
              errorMsg: 'has error!',
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

const loginFormMachine = (inputOptionMap) =>
  createMachine({
    id: 'login-form',
    initial: 'setup',
    context: {
      globalErrorMsg: null,
      inputRefs: {},
    },
    states: {
      setup: {
        entry: assign(() => ({
          inputRefs: createInputMachine(inputMachineCreator)(inputOptionMap),
        })),
        always: 'idle',
      },
      idle: {
        on: {
          SUBMIT: {
            target: 'validating',
          },
        },
      },
      validating: {
        entry: pure((context) => {
          const actors = [context.inputRefs.email, context.inputRefs.password];
          return actors.map((actor) => {
            return send('VALIDATE', { to: actor });
          });
        }),
        on: {
          INPUT_VALIDATION_DONE: [
            {
              target: 'validating',
              cond: (context) => {
                return anyValueEqual('validating')(context.inputRefs);
              },
            },
            {
              target: 'loading',
              cond: (context) => {
                return allValueEqual('normal')(context.inputRefs);
              },
            },
            {
              target: 'idle',
            },
          ],
        },
      },
      loading: {
        invoke: {
          id: 'post',
          src: 'postRequest',
          onDone: {
            target: 'success',
          },
          onError: {
            target: 'failure',
            actions: assign({ globalErrorMsg: (context, event) => event.data }),
          },
        },
      },
      success: {
        type: 'final',
      },
      failure: {
        always: 'idle',
      },
    },
  });

const createInputMachine = (machineCreator) =>
  compose(
    reduce((acc, [name, { validateFunc }]) => {
      return {
        ...acc,
        [name]: spawn(machineCreator(validateFunc), { name }),
      };
    }, {}),
    toPairs
  );

const getValueFromRef = (ref) => {
  return ref.getSnapshot().value;
};

const anyValueEqual = (expectedValue) =>
  compose(any(equals(expectedValue)), map(getValueFromRef), values);

const allValueEqual = (expectedValue) =>
  compose(all(equals(expectedValue)), map(getValueFromRef), values);

export default loginFormMachine;
