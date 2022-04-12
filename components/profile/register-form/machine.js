import { string } from 'yup';

import formMachineCreator from 'lib/machines/form';

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
  confirmPassword: {
    validateFunc: (context) => {
      if (context.value !== context.otherFieldValues.password) {
        return { valid: false, message: '與密碼不同' };
      }

      return { valid: true, message: '' };
    },
    label: '確認密碼',
    helpText: '重複輸入密碼',
    defaultValue: '',
    type: 'password',
  },
};

const machine = formMachineCreator({ machineId: 'login-form' })(
  inputOptionMap
).withConfig({
  services: {
    postRequest: () => Promise.resolve('success'),
  },
});

export default machine;
