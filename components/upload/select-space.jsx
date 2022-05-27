import { useMachine, useActor } from '@xstate/react';
import { Grid } from '@chakra-ui/react';

import SelectActorField from 'components/select-actor-field';
import { useFetchFields } from 'lib/fetch/fields/list-fields';
import { useFetchOrientations } from 'lib/fetch/fields/list-orientations';

import Stepper from './stepper';
import machine from './filter-zones-machine';

const SelectSpace = ({ forwardTitle, onForward, backTitle, onBack, title }) => {
  const [currentForm] = useMachine(machine);
  const { field: fieldActor, orientation: orientationActor } =
    currentForm.context.inputRefs;

  const [fieldState] = useActor(fieldActor);
  const fieldId = fieldState.context.value;

  // TODO: handle error
  const { data: fieldOptions } = useFetchFields();

  // TODO: handle error
  const { data: orientationOptions } = useFetchOrientations(fieldId);

  return (
    <Stepper
      forwardTitle={forwardTitle}
      onForward={onForward}
      backTitle={backTitle}
      onBack={onBack}
      title={title}
    >
      <form>
        <Grid templateColumns="1fr" gap="4">
          <SelectActorField actor={fieldActor} options={fieldOptions} />
          <SelectActorField
            actor={orientationActor}
            options={orientationOptions}
          />
        </Grid>
      </form>
    </Stepper>
  );
};

export default SelectSpace;
