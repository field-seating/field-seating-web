import {
  createMachine,
  assign,
  spawn,
  send,
  actions,
  sendParent,
} from 'xstate';

const { pure, choose } = actions;

const inputMachine = (validateFunc) =>
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

const loginFormMachine = createMachine(
  {
    id: 'login-form',
    initial: 'setup',
    context: {
      globalErrorMsg: null,
      emailRef: null,
      passwordRef: null,
    },
    states: {
      setup: {
        entry: assign({
          emailRef: () => {
            return spawn(inputMachine(isAnswer), {
              name: 'email',
            });
          },
          passwordRef: () => {
            return spawn(inputMachine(isAnswer), {
              name: 'password',
            });
          },
        }),
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
          const actors = [context.emailRef, context.passwordRef];
          return actors.map((actor) => {
            return send('VALIDATE', { to: actor });
          });
        }),
        on: {
          INPUT_VALIDATION_DONE: [
            {
              target: 'validating',
              cond: (context) => {
                const getValue = (ref) => {
                  return ref.getSnapshot().value;
                };

                const emailValue = getValue(context.emailRef);
                const passwordValue = getValue(context.passwordRef);

                if (
                  emailValue === 'validationg' ||
                  passwordValue === 'validating'
                ) {
                  return true;
                }
                return false;
              },
            },
            {
              target: 'loading',
              cond: (context) => {
                const getValue = (ref) => {
                  return ref.getSnapshot().value;
                };

                const emailValue = getValue(context.emailRef);
                const passwordValue = getValue(context.passwordRef);

                return emailValue === 'normal' && passwordValue === 'normal';
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
  },
  {
    services: {
      postRequest: () => {
        return Promise.resolve('success');
      },
    },
  }
);

export default loginFormMachine;
