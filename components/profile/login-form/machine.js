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
    validateFunc: () => ({ valid: false, message: '請輸入8 至20 碼' }),
    label: '密碼',
    helpText: '不限種類8 至20 碼',
    defaultValue: '',
  },
  confirmPassword: {
    validateFunc: () => ({ valid: false, message: '請重複輸入密碼' }),
    label: '確認密碼',
    helpText: '重複輸入密碼',
    defaultValue: '',
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
