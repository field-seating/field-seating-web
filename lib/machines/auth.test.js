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
    service.send('SIGNIN');
  });

  it('should turn to active when loadToken success with active status', (done) => {
    const service = interpret(
      authMachine.withConfig({
        services: {
          loadToken: () =>
            Promise.resolve({
              data: {
                data: {
                  token: 'token',
                  role: 'role',
                  status: 'active',
                },
              },
            }),
        },
      })
    ).onTransition((state) => {
      if (state.matches('loginActive')) {
        done();
      }
    });
    service.start();
    service.send('SIGNIN');
  });

  it('should turn to inactive when loadToken success with non-active status', (done) => {
    const service = interpret(
      authMachine.withConfig({
        services: {
          loadToken: () =>
            Promise.resolve({
              data: {
                data: {
                  token: 'token',
                  role: 'role',
                  status: 'unverified',
                },
              },
            }),
        },
      })
    ).onTransition((state) => {
      if (state.matches('loginInactive')) {
        done();
      }
    });
    service.start();
    service.send('SIGNIN');
  });

  it('should turn to admin when loadToken success with admin status', (done) => {
    const service = interpret(
      authMachine.withConfig({
        services: {
          loadToken: () =>
            Promise.resolve({
              data: {
                data: {
                  token: 'token',
                  role: 'admin',
                  status: 'active',
                },
              },
            }),
        },
      })
    ).onTransition((state) => {
      if (state.matches('loginAdmin')) {
        done();
      }
    });
    service.start();
    service.send('SIGNIN');
  });
});
