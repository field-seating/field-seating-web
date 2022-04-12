import { interpret } from 'xstate';

import authMachine from './auth';

describe('authMachine', () => {
  it('should turn to anonymous when loadToken fails', (done) => {
    const service = interpret(
      authMachine.withConfig({
        services: {
          loadToken: () => Promise.reject(new Error('load token failure')),
        },
      })
    ).onTransition((state) => {
      if (state.matches('anonymous')) {
        done();
      }
    });
    service.start();
  });

  it('should turn to login when loadToken success with active status', (done) => {
    const service = interpret(
      authMachine.withConfig({
        services: {
          loadToken: () =>
            Promise.resolve({
              data: {
                token: 'token',
                user: { role: 'role', status: 'active' },
              },
            }),
        },
      })
    ).onTransition((state) => {
      if (state.matches('login')) {
        done();
      }
    });
    service.start();
  });

  it('should turn to unverified when loadToken success with non-active status', (done) => {
    const service = interpret(
      authMachine.withConfig({
        services: {
          loadToken: () =>
            Promise.resolve({
              data: {
                token: 'token',
                user: { role: 'role', status: 'inactive' },
              },
            }),
        },
      })
    ).onTransition((state) => {
      if (state.matches('unverified')) {
        done();
      }
    });
    service.start();
  });
});
