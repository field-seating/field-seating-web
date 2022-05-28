import { useMemo } from 'react';
import { useMachine, useActor } from '@xstate/react';
import { Grid } from '@chakra-ui/react';
import { defaultTo } from 'ramda';

import SelectActorField from 'components/select-actor-field';
import { useFetchZones } from 'lib/fetch/fields/list-zones';
import { useFetchSpaces } from 'lib/fetch/fields/list-spaces';

import Stepper from './stepper';
import machine from './select-space-machine';
import { spacesToRowOptions, spacesToColOptions } from './helpers';

const defaultToEmptyArray = defaultTo([]);

const SelectSpace = ({
  forwardTitle,
  onForward,
  backTitle,
  onBack,
  title,
  flowData,
}) => {
  const [currentForm] = useMachine(machine, { devTools: true });
  const {
    zone: zoneActor,
    row: rowActor,
    column: columnActor,
  } = currentForm.context.inputRefs;

  const [zoneState] = useActor(zoneActor);
  const zoneId = zoneState.context.value;

  const [rowState] = useActor(rowActor);
  const rowId = rowState.context.value;

  const { fieldId, orientationId, levelId } = flowData;

  // TODO: handle error
  const { data: zones } = useFetchZones(fieldId, orientationId, levelId);

  // TODO: handle error
  const { data: spaces } = useFetchSpaces(zoneId);

  const zoneOptions = defaultToEmptyArray(zones);

  const { rowSpaceMap, rowOptions } = useMemo(
    () => spacesToRowOptions(defaultToEmptyArray(spaces)),
    [spaces]
  );

  const columnOptions = spacesToColOptions(rowSpaceMap[Number(rowId)]);

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
          <SelectActorField actor={zoneActor} options={zoneOptions} />
          <SelectActorField actor={rowActor} options={rowOptions} />
          <SelectActorField actor={columnActor} options={columnOptions} />
        </Grid>
      </form>
    </Stepper>
  );
};

export default SelectSpace;
