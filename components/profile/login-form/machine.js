import { string } from 'yup';

import formMachineCreator from 'lib/machines/form';
import signIn from 'lib/fetch/auth/signin';

const inputOptionMap = {
  email: {
    validateFunc: (context) => {
      const valid = string().required().email().isValidSync(context.value);

      return {
        valid,
        message: '請輸入正確信箱格式',
      };
    },
    label: '電子信箱',
    placeholder: 'mail@featseating.com',
    defaultValue: '',
    type: 'email',
  },
  password: {
    validateFunc: (context) => {
      if (!string().min(8).max(20).required().isValidSync(context.value)) {
        return { valid: false, message: '密碼格式不符' };
      }

      return { valid: true, message: '' };
    },
    label: '密碼',
    defaultValue: '',
    type: 'password',
  },
};

const machine = formMachineCreator({ machineId: 'login-form' })(
  inputOptionMap
).withConfig({
  services: {
    postRequest: (context) => {
      const email = context.inputRefs.email.getSnapshot().context.value;
      const password = context.inputRefs.password.getSnapshot().context.value;
      return signIn(email, password);
    },
  },
});

export default machine;
