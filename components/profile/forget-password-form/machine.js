import { string } from 'yup';

import formMachineCreator from 'lib/machines/form';
import recoveryPassword from 'lib/fetch/password/recovery';

const inputOptionMap = {
  email: {
    validateFunc: (context) => {
      const valid = string().required().email().isValidSync(context.value);

      return {
        valid,
        message: '請輸入正確的信箱格式',
      };
    },
    label: '電子信箱',
    helpText: '輸入您註冊時所使用的信箱',
    placeholder: 'mail@fieldtseating.com',
    defaultValue: '',
    type: 'email',
  },
};

const machine = formMachineCreator({ machineId: 'forget-password-form' })(
  inputOptionMap
).withConfig({
  services: {
    postRequest: (context) => {
      const email = context.inputRefs.email.getSnapshot().context.value;
      return recoveryPassword(email);
    },
  },
});

export default machine;
