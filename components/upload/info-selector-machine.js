import { isValid } from 'date-fns';
import { number } from 'yup';

import formMachineCreator from 'lib/machines/form';
import { formatForDatetimeLocal } from 'lib/utils/datetime';

const inputOptionMap = {
  space: {
    label: '空間',
    validateFunc: (context) => {
      const valid = number().required().isValidSync(context.value);

      return {
        valid,
        message: '請選擇座位',
      };
    },
    placeholder: '選擇座位',
  },
  datetime: {
    validateFunc: (context) => {
      const valid = isValid(new Date(context.value));

      return {
        valid,
        message: '請選擇打卡時間',
      };
    },
    defaultValue: formatForDatetimeLocal(new Date()),
    label: '打卡時間',
    helpText: '預設為當下時間',
  },
};

const machine = formMachineCreator({ machineId: 'info-selector-form' })(
  inputOptionMap
).withConfig({
  services: {
    postRequest: () => {
      return Promise.resolve();
    },
  },
});

export default machine;
