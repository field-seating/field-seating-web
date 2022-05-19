import { createMachine, assign, send, sendParent, actions } from 'xstate';
import { view, lensProp, set, not, compose, equals, values, omit } from 'ramda';

const { choose, pure } = actions;
const valueLens = lensProp('value');
const errorMsgLens = lensProp('errorMsg');
const isValidatedMsgLens = lensProp('isValidated');

export const EVENT_MAP = {
  VALIDATE: 'VALIDATE',
  CHANGE: 'CHANGE',
  FINISH_VALIDATION: 'FINISH_VALIDATION',
  INPUT_VALIDATION_DONE: 'INPUT_VALIDATION_DONE',
};

const inputMachineCreator = ({
  validateFunc = () => true,
  label,
  id,
  helpText,
  placeholder,
  defaultValue,
  type,
}) =>
  createMachine(
    {
      id,
      initial: 'normal',
      context: {
        id,
        value: defaultValue,
        errorMsg: null,
        isValidated: false,
        label,
        helpText,
        placeholder,
        type,
        otherFieldValues: {},
      },
      states: {
        normal: {},
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
        error: {},
      },
      on: {
        [EVENT_MAP.VALIDATE]: {
          target: 'validating',
          actions: ['sendFinishValidation'],
        },
        [EVENT_MAP.CHANGE]: {
          actions: ['changeValue', 'notifyChange', 'validateOrNot'],
        },
        OTHER_FIELD_CHANGE: {
          actions: ['onOtherFieldChange', 'validateOrNot'],
        },
        CHANGE_REFS: {
          actions: ['changeRefs'],
        },
      },
    },
    {
      actions: {
        sendFinishValidation: send(EVENT_MAP.FINISH_VALIDATION),
        validate: assign((context, event) => {
          const isValidated = true;

          const { valid, message } = validateFunc(context, event);

          if (!valid) {
            return {
              isValidated,
              errorMsg: message,
            };
          }
          return {
            isValidated,
            errorMsg: null,
          };
        }),
        notifyChange: pure((context) => {
          return values(context.refs).map((ref) => {
            return send(
              {
                type: 'OTHER_FIELD_CHANGE',
                value: context.value,
                from: id,
              },
              {
                to: ref,
              }
            );
          });
        }),

        changeValue: assign((context, event) =>
          set(valueLens, event.value, context)
        ),
        validateOrNot: choose([
          {
            cond: 'canValidate',
            actions: [send('VALIDATE')],
          },
        ]),
        changeRefs: assign((context, event) => ({
          refs: omit(id)(event.refs),
        })),
        onOtherFieldChange: assign((context, event) => {
          if (event.from === id) {
            return {};
          }
          return {
            otherFieldValues: {
              ...context.otherFieldValues,
              [event.from]: event.value,
            },
          };
        }),
      },
      guards: {
        hasErrorMsg: compose(not, equals(null), view(errorMsgLens)),
        canValidate: view(isValidatedMsgLens),
      },
    }
  );

export const selectError = (state) => state.matches('error');

export default inputMachineCreator;
