import { useMachine } from '@xstate/react';
import { Grid } from '@chakra-ui/react';

import SelectActorField from 'components/select-actor-field';
import uploadStepperMachine from 'lib/machines/upload-stepper-machine';

import { fieldOptions } from './fake-data';
import machine from './machine';

const UploadContent = () => {
  useMachine(uploadStepperMachine, { devTools: true });
  const [currentForm] = useMachine(machine);
  const { field: fieldActor } = currentForm.context.inputRefs;
  return (
    <>
      <form>
        <Grid templateColumns="1fr" gap="4">
          <SelectActorField actor={fieldActor} options={fieldOptions} />
        </Grid>
      </form>
    </>
  );
};

export default UploadContent;
