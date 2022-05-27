import { createMachine, assign } from 'xstate';
import { pathOr } from 'ramda';

const infoMap = {
  filterZone: {
    stepIndex: 1,
    title: '選擇球場資訊',
  },
  selectSpace: {
    stepIndex: 2,
    title: '選擇座位',
  },
  uploadImages: {
    stepIndex: 3,
    title: '上傳照片',
  },
};

const getInfo = (state) => pathOr({}, [state])(infoMap);
const assignInfo = (state) => {
  const { title, stepIndex } = getInfo(state);
  return assign({
    stepIndex,
    title,
  });
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
    initial: 'filterZone',
    states: {
      filterZone: {
        entry: [assignInfo('filterZone')],
        on: {
          NEXT: {
            target: 'selectSpace',
            actions: ['storeZonesCriteria'],
          },
        },
      },
      selectSpace: {
        entry: [assignInfo('selectSpace')],
        on: {
          NEXT: {
            target: 'uploadImages',
          },
          BACK: {
            target: 'filterZone',
          },
        },
      },
      uploadImages: {
        entry: [assignInfo('uploadImages')],
        on: {
          BACK: {
            target: 'selectSpace',
          },
          NEXT: {
            target: 'success',
          },
        },
      },
      success: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      storeZonesCriteria: assign({
        flowData: (context, event) => {
          const { fieldId, orientationId, levelId } = event;
          return {
            fieldId,
            orientationId,
            levelId,
          };
        },
      }),
    },
  }
);

export const selectFilterZone = (state) => state.matches('filterZone');
export const selectSelectSpace = (state) => state.matches('selectSpace');
export const selectUploadImage = (state) => state.matches('uploadImage');
export const selectSuccess = (state) => state.matches('success');

export default uploadStepperMachine;
