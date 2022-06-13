import formMachineCreator from 'lib/machines/form';
import { number } from 'yup';

const inputOptionMap = {
  field: {
    validateFunc: (context) => {
      const valid = number().required().isValidSync(context.value);

      return {
        valid,
        message: '請選擇場地',
      };
    },
  },
  orientation: {
    validateFunc: (context) => {
      const valid = number().required().isValidSync(context.value);

      return {
        valid,
        message: '請選擇方位',
      };
    },
  },
  level: {
    validateFunc: (context) => {
      const valid = number().required().isValidSync(context.value);

      return {
        valid,
        message: '請選擇樓層',
      };
    },
  },
  zone: {
    validateFunc: (context) => {
      const valid = number().required().isValidSync(context.value);

      return {
        valid,
        message: '請選擇區域',
      };
    },
  },
};

const machine = formMachineCreator({ machineId: 'zone-criteria-form' })(
  inputOptionMap
).withConfig({
  services: {
    postRequest: () => {
      return Promise.resolve();
    },
  },
});

export default machine;
