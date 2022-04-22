import { string } from 'yup';

import formMachineCreator from 'lib/machines/form';
import signUp from 'lib/fetch/users/signup';

const inputOptionMap = {
  name: {
    validateFunc: (context) => {
      const valid = string()
        .required()
        .min(1)
        .max(20)
        .isValidSync(context.value);

      return {
        valid,
        message: '名稱不可超過20 字元',
      };
    },
    label: '使用者名稱',
    helpText: '作為顯示使用',
    placeholder: 'GoCobras',
    defaultValue: '',
  },
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
    placeholder: 'mail@fieldtseating.com',
    defaultValue: '',
    type: 'email',
  },
  password: {
    validateFunc: (context) => {
      if (!string().min(8).max(30).required().isValidSync(context.value)) {
        return { valid: false, message: '請輸入8 至30 碼' };
      }

      return { valid: true, message: '' };
    },
    label: '密碼',
    helpText: '不限種類8 至30 碼',
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

const machine = formMachineCreator({ machineId: 'signup-form' })(
  inputOptionMap
).withConfig({
  services: {
    postRequest: (context) => {
      const name = context.inputRefs.name.getSnapshot().context.value;
      const email = context.inputRefs.email.getSnapshot().context.value;
      const password = context.inputRefs.password.getSnapshot().context.value;
      return signUp(name, email, password);
    },
  },
});

export default machine;
