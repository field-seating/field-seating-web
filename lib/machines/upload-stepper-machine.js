import { createMachine, assign } from 'xstate';
import { pathOr } from 'ramda';

const infoMap = {
  previewImages: {
    stepIndex: 1,
    title: '預覽照片',
  },
  filterZone: {
    stepIndex: 2,
    title: '選擇球場資訊',
  },
  selectSpace: {
    stepIndex: 3,
    title: '選擇座位',
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
    initial: 'previewImages',
    states: {
      previewImages: {
        entry: [assignInfo('previewImages')],
        on: {
          NEXT: {
            target: 'filterZone',
          },
        },
      },
      filterZone: {
        entry: [assignInfo('filterZone')],
        on: {
          BACK: {
            target: 'previewImages',
          },
          NEXT: {
            target: 'selectSpace',
            actions: ['storeZonesCriteria'],
          },
        },
      },
      selectSpace: {
        entry: [assignInfo('selectSpace')],
        on: {
          BACK: {
            target: 'filterZone',
          },
          NEXT: {
            target: 'success',
            actions: ['storeSpaceCriteria'],
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
      storeSpaceCriteria: assign({
        flowData: (context, event) => {
          const { spaceId, zoneId, photoDatetime, columnId, rowId } = event;
          return {
            spaceId,
            zoneId,
            photoDatetime,
            columnId,
            rowId,
          };
        },
      }),
    },
  }
);

export const selectPreviewImages = (state) => state.matches('previewImages');
export const selectFilterZone = (state) => state.matches('filterZone');
export const selectSelectSpace = (state) => state.matches('selectSpace');
export const selectSuccess = (state) => state.matches('success');

export default uploadStepperMachine;
