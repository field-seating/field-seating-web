import { interpret } from 'xstate';
import formMachineCreator from './form';

const isAnswer = (context) => {
  const valid = context.value === 'answer';

  if (valid) {
    return {
      valid,
      message: null,
    };
  }

  return {
    valid,
    message: 'has error!',
  };
};

describe('formMachine', () => {
  it('should pass', (done) => {
    const inputOptionMap = {
      email: { validateFunc: isAnswer, subscribeCandidates: ['password'] },
      password: { validateFunc: isAnswer, notifyCandidates: ['email'] },
    };

    const service = interpret(
      formMachineCreator({ machineId: 'login-form' })(
        inputOptionMap
      ).withConfig({
        services: {
          postRequest: () => Promise.resolve('success'),
        },
      })
    ).onTransition((state) => {
      if (state.matches('success')) {
        done();
      }
    });

    service.start();
    expect(service.state.value).toBe('idle');

    service.state.context.inputRefs.email.send({
      type: 'CHANGE',
      value: 'i am not an email',
    });
    expect(service.state.context.inputRefs.email.state.context.value).toBe(
      'i am not an email'
    );
    expect(service.state.context.inputRefs.email.state.value).toBe('normal');

    service.send('SUBMIT');
    expect(service.state.value).toBe('idle');
    expect(service.state.context.inputRefs.email.state.context.errorMsg).toBe(
      'has error!'
    );

    service.state.context.inputRefs.email.send({
      type: 'CHANGE',
      value: 'answer',
    });
    expect(service.state.context.inputRefs.email.state.value).toBe('normal');
    expect(service.state.context.inputRefs.email.state.context.errorMsg).toBe(
      null
    );

    service.send('SUBMIT');
    expect(service.state.value).toBe('idle');
    expect(service.state.context.inputRefs.email.state.value).toBe('normal');
    expect(service.state.context.inputRefs.password.state.value).toBe('error');

    service.state.context.inputRefs.password.send({
      type: 'CHANGE',
      value: 'not an answer',
    });
    expect(service.state.value).toBe('idle');
    expect(service.state.context.inputRefs.email.state.value).toBe('normal');
    expect(service.state.context.inputRefs.password.state.value).toBe('error');

    service.state.context.inputRefs.password.send({
      type: 'CHANGE',
      value: 'answer',
    });
    expect(service.state.context.inputRefs.password.state.value).toBe('normal');

    service.state.context.inputRefs.password.send({
      type: 'CHANGE',
      value: 'not an answer',
    });
    expect(service.state.context.inputRefs.password.state.value).toBe('error');

    service.send('SUBMIT');
    expect(service.state.value).toBe('idle');

    service.state.context.inputRefs.password.send({
      type: 'CHANGE',
      value: 'answer',
    });
    service.send('SUBMIT');
    expect(service.state.context.inputRefs.email.state.value).toBe('normal');
    expect(service.state.context.inputRefs.password.state.value).toBe('normal');
    expect(service.state.context.inputRefs.email.state.context.errorMsg).toBe(
      null
    );
    expect(
      service.state.context.inputRefs.password.state.context.errorMsg
    ).toBe(null);
  });

  describe('validationt rule with other field', () => {
    it('should pass', (done) => {
      const inputOptionMap = {
        password: {
          validateFunc: (context) => {
            const valid =
              context.value === 'answer' &&
              context.value === context.otherFieldValues.confirmPassword;

            return {
              valid,
              message: 'should be same as others',
            };
          },
        },
        confirmPassword: {
          validateFunc: (context) => {
            const valid = context.value === context.otherFieldValues.password;
            return {
              valid,
              message: 'should be same as password',
            };
          },
        },
      };

      const service = interpret(
        formMachineCreator({ machineId: 'login-form' })(
          inputOptionMap
        ).withConfig({
          services: {
            postRequest: () => {
              return Promise.resolve('success');
            },
          },
        })
      ).onTransition((state) => {
        if (state.matches('success')) {
          done();
        }
      });

      service.start();
      service.state.context.inputRefs.password.send({
        type: 'CHANGE',
        value: 'answer',
      });
      service.send('SUBMIT');
      expect(service.state.context.inputRefs.password.state.value).toBe(
        'error'
      );
      expect(service.state.context.inputRefs.confirmPassword.state.value).toBe(
        'error'
      );

      service.state.context.inputRefs.confirmPassword.send({
        type: 'CHANGE',
        value: 'answer',
      });
      expect(service.state.context.inputRefs.password.state.value).toBe(
        'normal'
      );
      expect(service.state.context.inputRefs.confirmPassword.state.value).toBe(
        'normal'
      );

      service.send('SUBMIT');
      expect(service.state.context.inputRefs.password.state.value).toBe(
        'normal'
      );
      expect(service.state.context.inputRefs.confirmPassword.state.value).toBe(
        'normal'
      );
    });
  });

  describe('update the context', () => {
    it('should update the context', () => {
      const inputOptionMap = {
        password: {
          validateFunc: (context) => {
            const valid =
              context.value === 'answer' &&
              context.value === context.otherFieldValues.confirmPassword;

            return {
              valid,
              message: 'should be same as others',
            };
          },
        },
      };

      const service = interpret(
        formMachineCreator({ machineId: 'login-form' })(
          inputOptionMap
        ).withConfig({
          services: {
            postRequest: () => {
              return Promise.resolve('success');
            },
          },
        })
      );

      service.start();
      expect(service.state.context.customContext).toEqual({});

      service.send({ type: 'UPDATE_CUSTOM_CONTEXT', context: { token: 123 } });
      expect(service.state.context.customContext).toEqual({ token: 123 });
    });
  });
});
