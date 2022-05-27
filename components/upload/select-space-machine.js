import formMachineCreator from 'lib/machines/form';
import { number } from 'yup';

const inputOptionMap = {
  zone: {
    label: '區',
    validateFunc: (context) => {
      const valid = number().required().isValidSync(context.value);

      return {
        valid,
        message: '請選擇區域',
      };
    },
    placeholder: '選擇區域',
  },
  row: {
    label: '第幾排',
    validateFunc: (context) => {
      const valid = number().required().isValidSync(context.value);

      return {
        valid,
        message: '請選擇排',
      };
    },
    placeholder: '選擇排',
  },
  column: {
    label: '第幾列',
    validateFunc: (context) => {
      const valid = number().required().isValidSync(context.value);

      return {
        valid,
        message: '請選擇列',
      };
    },
    placeholder: '選擇幾列',
  },
};

const machine = formMachineCreator({ machineId: 'filter-zone-form' })(
  inputOptionMap
).withConfig({
  services: {
    postRequest: () => {
      return Promise.resolve();
    },
  },
});

export default machine;
