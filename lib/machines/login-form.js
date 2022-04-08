import { createMachine, assign, spawn, send, actions } from 'xstate';

import { values, map, equals, toPairs, reduce, compose, any, all } from 'ramda';

import inputMachineCreator from './input-machine-creator';

const { pure } = actions;

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
