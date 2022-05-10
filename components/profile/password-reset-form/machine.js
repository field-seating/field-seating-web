import { string } from 'yup';

import formMachineCreator from 'lib/machines/form';
import updatePassword from 'lib/fetch/password/update';

const inputOptionMap = {
  password: {
    validateFunc: (context) => {
      if (!string().min(8).max(30).required().isValidSync(context.value)) {
        return { valid: false, message: '請輸入8 至30 碼' };
      }

      return { valid: true, message: '' };
    },
    label: '新密碼',
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

const machine = formMachineCreator({ machineId: 'password-reset-form' })(
  inputOptionMap
).withConfig({
  services: {
    postRequest: (context) => {
      const password = context.inputRefs.password.getSnapshot().context.value;
      const token = context.customContext.token;

      return updatePassword(token, password);
    },
  },
});

export default machine;
