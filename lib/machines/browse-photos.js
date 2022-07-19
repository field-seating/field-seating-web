import { createMachine, assign } from 'xstate';
import { isNil, mergeRight } from 'ramda';
import getZone from 'lib/fetch/fields/get-zone';

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
      idle: {},
      loading: {
        invoke: {
          id: 'store-context',
          src: 'fetchContext',
          onDone: {
            target: 'spaceSelector',
            actions: ['storeContext'],
          },
          onError: {
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
            target: 'spacePhotosPage',
            actions: ['storeSpace', 'pushToSpacePhotos'],
          },
        },
      },
      spacePhotosPage: {},
    },
    on: {
      INIT: {
        target: 'loading',
      },
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
      resetContext: assign(INIT_CONTEXT),
      storeContext: assign((context, event) => {
        const { fieldId, orientationId, levelId, zoneId } = event.data;

        const merge = mergeRight(context);

        return merge({
          fieldId,
          orientationId,
          levelId,
          zoneId,
        });
      }),
    },
    services: {
      fetchContext: async (_, event) => {
        const zoneId = event.zoneId;

        if (isNil(zoneId)) {
          throw new Error('no zone id');
        }

        const zoneData = await getZone(zoneId);

        const { fieldId, orientationId, levelId } = zoneData;

        return {
          fieldId,
          orientationId,
          levelId,
          zoneId,
        };
      },
    },
  }
);

export const selectIdle = (state) => state.matches('idle');
export const selectSpaceSelector = (state) => state.matches('spaceSelector');
export const selectSpacePhotosPage = (state) =>
  state.matches('spacePhotosPage');

export default browsePhotosMachine;
