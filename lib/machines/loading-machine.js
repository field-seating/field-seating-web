import { createMachine } from 'xstate';

const machine = createMachine({
  id: 'loading-machine',
  context: {},
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        ACTIVATE: {
          target: 'active',
        },
      },
    },
    active: {
      on: {
        DEACTIVATE: {
          target: 'inactive',
        },
      },
    },
  },
});

export const selectInactive = (state) => state.matches('inactive');
export const selectActive = (state) => state.matches('active');

export default machine;
