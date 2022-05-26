import { useMachine, useActor } from '@xstate/react';
import { Grid } from '@chakra-ui/react';
import useSWR from 'swr';

import SelectActorField from 'components/select-actor-field';

import { fieldOptions, fetchOptions } from './fake-data';
import machine from './filter-zones-machine';

const FilterZones = () => {
  const [currentForm] = useMachine(machine);
  const {
    field: fieldActor,
    orientation: orientationActor,
    level: levelActor,
  } = currentForm.context.inputRefs;

  const [fieldState] = useActor(fieldActor);

  // TODO: handle error
  const { data } = useSWR(fieldState.context.value, fetchOptions);

  return (
    <>
      <form>
        <Grid templateColumns="1fr" gap="4">
          <SelectActorField actor={fieldActor} options={fieldOptions} />
          <SelectActorField
            actor={orientationActor}
            options={data?.orientationOptions}
          />
          <SelectActorField actor={levelActor} options={data?.levelOptions} />
        </Grid>
      </form>
    </>
  );
};

export default FilterZones;
