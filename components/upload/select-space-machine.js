import formMachineCreator from 'lib/machines/form';
import { number } from 'yup';

const inputOptionMap = {
  space: {
    validateFunc: (context) => {
      const valid = number().required().isValidSync(context.value);

      return {
        valid,
        message: '請選擇座位',
      };
    },
  },
};

const machine = formMachineCreator({ machineId: 'select-space-form' })(
  inputOptionMap
).withConfig({
  services: {
    postRequest: () => {
      return Promise.resolve();
    },
  },
});

export default machine;
