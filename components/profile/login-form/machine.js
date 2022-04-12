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
    helpText: '請確認可接收認證信',
    placeholder: '輸入信箱',
    defaultValue: '',
  },
  password: {
    validateFunc: (context) => {
      if (!string().min(8).max(20).required().isValidSync(context.value)) {
        return { valid: false, message: '請輸入8 至20 碼' };
      }

      return { valid: true, message: '' };
    },
    label: '密碼',
    helpText: '不限種類8 至20 碼',
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
