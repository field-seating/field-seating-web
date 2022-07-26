import { createMachine, assign } from 'xstate';
import { prop, mergeRight, pathOr, filter, compose, not, isNil } from 'ramda';
import getSpace from 'lib/fetch/fields/get-space';
import getZone from 'lib/fetch/fields/get-zone';
import { uploadPhotos } from 'lib/utils/tracking/event';

import postPhotos from 'lib/fetch/photos/post-photos';

const infoMap = {
  imagePreviewer: {
    stepIndex: 1,
    title: '預覽照片',
  },
  infoSelector: {
    stepIndex: 2,
    title: '打卡資訊',
  },
};

const prepareMergeFlowData = compose(mergeRight, prop('flowData'));

const getInfo = (state) => pathOr({}, [state])(infoMap);

const assignInfo = (state) => {
  const { title, stepIndex } = getInfo(state);
  return assign({
    stepIndex,
    title,
  });
};

const filterPresent = filter(compose(not, isNil));

const INIT_CONTEXT = {
  title: null,
  stepIndex: null,
  totalStep: 3,
  flowData: {},
};

const uploadStepperMachine = createMachine(
  {
    id: 'upload-stepper',
    context: INIT_CONTEXT,
    initial: 'prepareImages',
    states: {
      prepareImages: {},
      idle: {
        on: {
          INIT: {
            target: 'prepareInitContext',
          },
        },
      },
      prepareInitContext: {
        invoke: {
          id: 'prepare-context',
          src: 'fetchContext',
          onDone: {
            target: 'imagePreviewer',
            actions: ['storeInitContext'],
          },
          onError: {
            target: 'imagePreviewer',
          },
        },
      },
      imagePreviewer: {
        entry: [assignInfo('imagePreviewer')],
        on: {
          NEXT: {
            target: 'infoSelector',
          },
        },
      },
      infoSelector: {
        entry: [assignInfo('infoSelector')],
        on: {
          OPEN_SPACE_SELECTOR: {
            target: 'spaceSelector',
          },
          BACK: {
            target: 'imagePreviewer',
          },
          NEXT: {
            target: 'loading',
            actions: ['storeCheckoutInfo', 'activateLoading'],
          },
        },
      },
      spaceSelector: {
        on: {
          SAVE_SPACE_CRITERIA: {
            actions: ['storeSapceCriteria'],
          },
          BACK: {
            target: 'infoSelector',
            //actions: ['clearZoneCriteria'],
          },
          SELECT_SPACE: {
            target: 'infoSelector',
            actions: ['storeSpace'],
          },
        },
      },
      loading: {
        invoke: {
          id: 'upload-photos',
          src: 'uploadPhotos',
          onDone: {
            target: 'success',
            actions: ['trackUploadSuccess'],
          },
          onError: {
            target: 'failure',
          },
        },
      },
      success: {
        entry: ['deactivateLoading'],
      },
      failure: {
        entry: ['deactivateLoading'],
        after: {
          1: { target: 'infoSelector' },
        },
      },
    },
    on: {
      RESET: {
        target: 'prepareImages',
        actions: ['resetContext'],
      },
      START_FLOW: {
        target: 'idle',
        actions: ['storeImageFiles'],
      },
    },
  },
  {
    actions: {
      storeImageFiles: assign({
        flowData: (context, event) => {
          const { imageFiles } = event;

          const merge = prepareMergeFlowData(context);

          return merge({ imageFiles });
        },
      }),
      storeSapceCriteria: assign({
        flowData: (context, event) => {
          const { fieldId, orientationId, levelId, zoneId } = event;

          const merge = prepareMergeFlowData(context);

          return merge({
            fieldId,
            orientationId,
            levelId,
            zoneId,
          });
        },
      }),
      clearZoneCriteria: assign({
        flowData: (context) => {
          const merge = prepareMergeFlowData(context);

          return merge({
            fieldId: null,
            orientationId: null,
            levelId: null,
            zoneId: null,
          });
        },
      }),
      storeSpace: assign({
        flowData: (context, event) => {
          const { spaceId } = event;

          const merge = prepareMergeFlowData(context);

          return merge({
            spaceId,
          });
        },
      }),
      storeCheckoutInfo: assign({
        flowData: (context, event) => {
          const { photoDatetime } = event;

          const merge = prepareMergeFlowData(context);

          return merge({
            photoDatetime,
          });
        },
      }),
      storeInitContext: assign({
        flowData: (context, event) => {
          const { fieldId, orientationId, levelId, zoneId, spaceId } =
            event.data;

          const payload = { fieldId, orientationId, levelId, zoneId, spaceId };

          const merge = prepareMergeFlowData(context);

          return merge(filterPresent(payload));
        },
      }),
      resetContext: assign(INIT_CONTEXT),
      trackUploadSuccess: (context) => {
        const numOfPhotos = context.flowData?.imageFiles?.length;
        uploadPhotos({ numOfPhotos });
      },
    },
    services: {
      uploadPhotos: (context) => {
        const { spaceId, photoDatetime, imageFiles } = context.flowData;

        return postPhotos(imageFiles, spaceId, photoDatetime);
      },
      fetchContext: async (_, event) => {
        const spaceId = event.spaceId;

        if (isNil(spaceId)) {
          throw new Error('no space id');
        }

        const spaceData = await getSpace(spaceId);
        const { zoneId } = spaceData;

        const zoneData = await getZone(zoneId);

        const { fieldId, orientationId, levelId } = zoneData;

        return {
          spaceId,
          fieldId,
          orientationId,
          levelId,
          zoneId,
        };
      },
    },
  }
);

export const selectPrepareImages = (state) => state.matches('prepareImages');
export const selectIdle = (state) => state.matches('idle');
export const selectImagePreviewer = (state) => state.matches('imagePreviewer');
export const selectInfoSelector = (state) => state.matches('infoSelector');
export const selectSpaceSelector = (state) => state.matches('spaceSelector');
export const selectSuccess = (state) => state.matches('success');
export const selectFailure = (state) => state.matches('failure');
export const selectLoading = (state) => state.matches('loading');

export default uploadStepperMachine;
