import { useMachine } from '@xstate/react';
import { Grid } from '@chakra-ui/react';

import SelectActorField from 'components/select-actor-field';

import { fieldOptions } from './fake-data';
import machine from './machine';

const UploadContent = () => {
  const [current] = useMachine(machine);
  const { field: fieldActor } = current.context.inputRefs;
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
