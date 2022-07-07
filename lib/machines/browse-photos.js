import { createMachine, assign } from 'xstate';
import { mergeRight } from 'ramda';

const INIT_CONTEXT = {
  zoneId: null,
  spaceId: null,
  fieldId: null,
  orientationId: null,
  levelId: null,
};

const browsePhotosMachine = createMachine(
  {
    id: 'browse-photos',
    context: INIT_CONTEXT,
    initial: 'idle',
    states: {
      idle: {
        on: {
          INIT: {
            target: 'spaceSelector',
          },
        },
      },
      spaceSelector: {
        on: {
          SAVE_SPACE_CRITERIA: {
            actions: ['storeSapceCriteria'],
          },
          SELECT_SPACE: {
            target: 'idle',
            actions: ['storeSpace', 'redirectToPhotoPage'],
          },
        },
      },
    },
    on: {
      RESET: {
        target: 'idle',
        actions: ['resetContext'],
      },
    },
  },
  {
    actions: {
      storeSapceCriteria: assign((context, event) => {
        const { fieldId, orientationId, levelId, zoneId } = event;

        const merge = mergeRight(context);

        return merge({
          fieldId,
          orientationId,
          levelId,
          zoneId,
        });
      }),
      storeSpace: assign((context, event) => {
        const { spaceId } = event;

        const merge = mergeRight(context);

        return merge({
          spaceId,
        });
      }),
      redirectToPhotoPage: (context) => {
        console.log('context', context);
      },
      resetContext: assign(INIT_CONTEXT),
    },
    services: {
      transiteToPhotoPage: () => {
        return Promise.resolve();
      },
    },
  }
);

export const selectIdle = (state) => state.matches('idle');
export const selectSpaceSelector = (state) => state.matches('spaceSelector');
export const selectSuccess = (state) => state.matches('success');
export const selectFailure = (state) => state.matches('failure');
export const selectLoading = (state) => state.matches('loading');

export default browsePhotosMachine;
