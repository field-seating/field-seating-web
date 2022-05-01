import { string } from 'yup';

import formMachineCreator from 'lib/machines/form';
import updateMe from 'lib/fetch/users/update-me';

const inputOptionMap = {
  name: {
    validateFunc: (context) => {
      const valid = string().trim().required().isValidSync(context.value);

      return {
        valid,
        message: '使用者名稱不可留空',
      };
    },
    label: '使用者名稱',
    placeholder: 'GoCobras',
    defaultValue: '',
    type: 'text',
  },
};

const machine = formMachineCreator({ machineId: 'info-form' })(
  inputOptionMap
).withConfig({
  services: {
    postRequest: (context) => {
      const name = context.inputRefs.name.getSnapshot().context.value;
      return updateMe({ name });
    },
  },
});

export default machine;
