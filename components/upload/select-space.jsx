import { useMachine } from '@xstate/react';
import { Grid } from '@chakra-ui/react';
//import { defaultTo } from 'ramda';

import SelectActorField from 'components/select-actor-field';
import { useFetchZones } from 'lib/fetch/fields/list-zones';

import Stepper from './stepper';
import machine from './select-space-machine';

//const defaultToEmptyObject = defaultTo({});

const SelectSpace = ({
  forwardTitle,
  onForward,
  backTitle,
  onBack,
  title,
  flowData,
}) => {
  const [currentForm] = useMachine(machine);
  const {
    zone: zoneActor,
    row: rowActor,
    column: columnActor,
  } = currentForm.context.inputRefs;

  //const [zoneState] = useActor(zoneActor);
  //const zoneId = zoneState.context.value;

  const { fieldId, orientationId, levelId } = flowData;

  // TODO: handle error
  const { data: fieldOptions } = useFetchZones(fieldId, orientationId, levelId);

  // TODO: handle error
  //const { data } = useFetchRowColOptions(zoneId);

  //const rowOptions = defaultToEmptyObject(data).rowOptions || [];
  //const columnOptions = defaultToEmptyObject(data).columnOptions || [];
  const rowOptions = [];
  const columnOptions = [];

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
          <SelectActorField actor={zoneActor} options={fieldOptions} />
          <SelectActorField actor={rowActor} options={rowOptions} />
          <SelectActorField actor={columnActor} options={columnOptions} />
        </Grid>
      </form>
    </Stepper>
  );
};

export default SelectSpace;
