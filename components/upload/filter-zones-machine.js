import formMachineCreator from 'lib/machines/form';
import signIn from 'lib/fetch/auth/signin';

const inputOptionMap = {
  field: {
    label: '球場',
  },
};

const machine = formMachineCreator({ machineId: 'filter-zone-form' })(
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
