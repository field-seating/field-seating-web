import { createMachine, assign, send, sendParent, actions } from 'xstate';
import { view, lensProp, set, not, compose, equals } from 'ramda';

const { choose } = actions;
const valueLens = lensProp('value');
const errorMsgLens = lensProp('errorMsg');
const isValidatedMsgLens = lensProp('isValidated');

export const EVENT_MAP = {
  VALIDATE: 'VALIDATE',
  CHANGE: 'CHANGE',
  FINISH_VALIDATION: 'FINISH_VALIDATION',
  INPUT_VALIDATION_DONE: 'INPUT_VALIDATION_DONE',
};

const inputMachineCreator = (validateFunc) =>
  createMachine(
    {
      id: 'input',
      initial: 'normal',
      context: {
        value: null,
        errorMsg: null,
        isValidated: false,
      },
      states: {
        normal: {
          on: {
            [EVENT_MAP.VALIDATE]: {
              target: 'validating',
              actions: ['sendFinishValidation'],
            },
            [EVENT_MAP.CHANGE]: {
              actions: ['changeValue', 'validateOrNot'],
            },
          },
        },
        validating: {
          entry: 'validate',
          exit: sendParent(EVENT_MAP.INPUT_VALIDATION_DONE),
          on: {
            [EVENT_MAP.FINISH_VALIDATION]: [
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
            [EVENT_MAP.CHANGE]: {
              actions: ['changeValue', 'sendValidate'],
            },
            [EVENT_MAP.VALIDATE]: {
              target: 'validating',
              actions: ['sendFinishValidation'],
            },
          },
        },
      },
    },
    {
      actions: {
        sendFinishValidation: send(EVENT_MAP.FINISH_VALIDATION),
        sendValidate: send(EVENT_MAP.VALIDATE),
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
        changeValue: assign((context, event) =>
          set(valueLens, event.value, context)
        ),
        validateOrNot: choose([
          {
            cond: view(isValidatedMsgLens),
            actions: [send('VALIDATE')],
          },
        ]),
      },
      guards: {
        hasErrorMsg: compose(not, equals(null), view(errorMsgLens)),
      },
    }
  );

export default inputMachineCreator;
