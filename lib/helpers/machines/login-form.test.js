import { interpret } from 'xstate';
import loginFormMachine from './login-form';

describe('loginFormMachine', () => {
  it('should pass', (done) => {
    const service = interpret(
      loginFormMachine.withConfig({
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
    expect(service.state.value).toBe('idle');

    service.state.context.inputRefs.email.send({
      type: 'CHANGE',
      value: 'i am not an email',
    });
    expect(service.state.context.inputRefs.email.state.context.value).toBe(
      'i am not an email'
    );

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
});
