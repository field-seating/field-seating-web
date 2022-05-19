import { createMachine, assign } from 'xstate';

const titleMap = {
  filterZone: '選擇球場資訊',
  selectSpace: '選擇座位',
  uploadImages: '上傳照片',
};

const assignTitle = (title) =>
  assign({
    title,
  });

const uploadStepperMachine = createMachine(
  {
    id: 'upload-stepper',
    context: {
      title: null,
      stepIndex: 1,
    },
    initial: 'filterZone',
    states: {
      filterZone: {
        entry: [assignTitle(titleMap.filterZone)],
        on: {
          NEXT: {
            target: 'selectSpace',
            actions: ['increaseStepIndex'],
          },
        },
      },
      selectSpace: {
        entry: [assignTitle(titleMap.selectSpace)],
        on: {
          NEXT: {
            target: 'uploadImages',
            actions: ['increaseStepIndex'],
          },
          BACK: {
            target: 'filterZone',
            actions: ['decreaseStepIndex'],
          },
        },
      },
      uploadImages: {
        entry: [assignTitle(titleMap.uploadImages)],
        on: {
          BACK: {
            target: 'selectSpace',
            actions: ['decreaseStepIndex'],
          },
          SUBMIT: {
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
      increaseStepIndex: assign((context) => ({
        stepIndex: context.stepIndex + 1,
      })),
      decreaseStepIndex: assign((context) => ({
        stepIndex: context.stepIndex - 1,
      })),
    },
  }
);

export const selectFilterZone = (state) => state.matches('filterZone');
export const selectSelectSpace = (state) => state.matches('selectSpace');
export const selectUploadImage = (state) => state.matches('uploadImage');
export const selectSuccess = (state) => state.matches('success');

export default uploadStepperMachine;
