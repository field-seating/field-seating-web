import { createMachine, assign, spawn, send, actions } from 'xstate';

import {
  prop,
  values,
  map,
  equals,
  toPairs,
  reduce,
  compose,
  any,
  all,
} from 'ramda';

import inputMachineCreator from './input-machine-creator';

const { pure } = actions;

const createInputMachine = (machineCreator) =>
  compose(
    reduce(
      (
        acc,
        [name, { validateFunc, label, helpText, defaultValue, placeholder }]
      ) => ({
        ...acc,
        [name]: spawn(
          machineCreator({
            validateFunc,
            label,
            helpText,
            id: name,
            defaultValue,
            placeholder,
          }),
          { name }
        ),
      }),
      {}
    ),
    toPairs
  );

const getValueFromRef = (ref) => {
  return ref.getSnapshot().value;
};

const anyValueEqual = (expectedValue) =>
  compose(any(equals(expectedValue)), map(getValueFromRef), getRefs);

const allValueEqual = (expectedValue) =>
  compose(all(equals(expectedValue)), map(getValueFromRef), getRefs);

const getRefs = compose(values, prop('inputRefs'));

export const EVENT_MAP = {
  SUBMIT: 'SUBMIT',
  INPUT_VALIDATION_DONE: 'INPUT_VALIDATION_DONE',
};

const formMachineCreator =
  ({ machineId }) =>
  (inputOptionMap) =>
    createMachine(
      {
        id: machineId,
        initial: 'setup',
        context: {
          globalErrorMsg: null,
          inputRefs: {},
        },
        states: {
          setup: {
            entry: [
              assign(() => ({
                inputRefs:
                  createInputMachine(inputMachineCreator)(inputOptionMap),
              })),
              'changeRefs',
            ],
            always: 'idle',
          },
          idle: {
            on: {
              [EVENT_MAP.SUBMIT]: {
                target: 'validating',
              },
            },
          },
          validating: {
            entry: 'sendRefsValidate',
            on: {
              [EVENT_MAP.INPUT_VALIDATION_DONE]: [
                {
                  target: 'validating',
                  cond: anyValueEqual('validating'),
                },
                {
                  target: 'loading',
                  cond: allValueEqual('normal'),
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
                actions: assign({
                  globalErrorMsg: (context, event) => event.data,
                }),
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
      },
      {
        actions: {
          sendRefsValidate: pure((context) => {
            const actors = getRefs(context);
            return actors.map((actor) => {
              return send('VALIDATE', { to: actor });
            });
          }),
          changeRefs: pure((context) => {
            const actors = getRefs(context);
            return actors.map((actor) => {
              return send(
                { type: 'CHANGE_REFS', refs: context.inputRefs },
                { to: actor }
              );
            });
          }),
        },
      }
    );

export default formMachineCreator;
