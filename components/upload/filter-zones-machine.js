import formMachineCreator from 'lib/machines/form';
import { number } from 'yup';

const inputOptionMap = {
  field: {
    label: '球場',
    validateFunc: (context) => {
      const valid = number().required().isValidSync(context.value);

      return {
        valid,
        message: '請選擇球場',
      };
    },
    placeholder: '選擇球場',
  },
  orientation: {
    label: '方位',
    validateFunc: (context) => {
      const valid = number().required().isValidSync(context.value);

      return {
        valid,
        message: '請選擇方位',
      };
    },
    placeholder: '選擇方位',
  },
  level: {
    label: '樓層',
    validateFunc: (context) => {
      const valid = number().required().isValidSync(context.value);

      return {
        valid,
        message: '請選擇樓層',
      };
    },
    placeholder: '選擇樓層',
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
