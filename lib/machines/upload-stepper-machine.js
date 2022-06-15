import { createMachine, assign } from 'xstate';
import { prop, mergeRight, pathOr, filter, compose, not, isNil } from 'ramda';

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
  totalStep: 2,
  flowData: {},
};

const uploadStepperMachine = createMachine(
  {
    id: 'upload-stepper',
    context: {
      title: null,
      stepIndex: null,
      totalStep: 3,
      flowData: {},
    },
    initial: 'prepareImages',
    states: {
      prepareImages: {
        on: {
          START_FLOW: {
            target: 'idle',
            actions: ['storeImageFiles'],
          },
        },
      },
      idle: {
        on: {
          INIT: {
            target: 'imagePreviewer',
            actions: ['storeInitContext'],
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
            target: 'success',
            actions: ['storeCheckoutInfo'],
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
            actions: ['clearZoneCriteria'],
          },
          SELECT_SPACE: {
            target: 'infoSelector',
            actions: ['storeSpace'],
          },
        },
      },
      success: {},
    },
    on: {
      RESET: {
        target: 'prepareImages',
        actions: ['resetContext'],
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
          const { spaceId, photoDatetime } = event;

          const merge = prepareMergeFlowData(context);

          return merge({
            spaceId,
            photoDatetime,
          });
        },
      }),
      storeInitContext: assign({
        flowData: (context, event) => {
          const { fieldId, orientationId, levelId, zoneId, spaceId } = event;

          const payload = { fieldId, orientationId, levelId, zoneId, spaceId };

          const merge = prepareMergeFlowData(context);

          return merge(filterPresent(payload));
        },
      }),
      resetContext: assign(INIT_CONTEXT),
    },
  }
);

export const selectPrepareImages = (state) => state.matches('prepareImages');
export const selectIdle = (state) => state.matches('idle');
export const selectImagePreviewer = (state) => state.matches('imagePreviewer');
export const selectInfoSelector = (state) => state.matches('infoSelector');
export const selectSpaceSelector = (state) => state.matches('spaceSelector');
export const selectSuccess = (state) => state.matches('success');

export default uploadStepperMachine;
