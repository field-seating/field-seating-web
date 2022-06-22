import { createMachine } from 'xstate';

const machine = createMachine({
  id: 'photo-preview-card',
  initial: 'loading',
  states: {
    loading: {
      on: {
        LOADED: {
          target: 'success',
        },
        ERROR: {
          target: 'failure',
        },
      },
    },
    failure: {},
    success: {},
  },
});

export const selectLoaded = (state) => state.matches('success');

export default machine;
