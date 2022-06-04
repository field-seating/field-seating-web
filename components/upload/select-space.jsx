import { useMemo, useCallback, useEffect } from 'react';
import { useMachine, useActor } from '@xstate/react';
import { Grid } from '@chakra-ui/react';
import { defaultTo } from 'ramda';

import SelectActorField from 'components/select-actor-field';
import { useFetchZones } from 'lib/fetch/fields/list-zones';
import { useFetchSpaces } from 'lib/fetch/fields/list-spaces';
import useSnackbar from 'components/ui/snackbar';
import {
  //selectDisabled,
  //selectLoading,
  selectSuccess,
  selectFailure,
} from 'lib/machines/form';

import Stepper from './stepper';
import machine from './select-space-machine';
import { spacesToRowOptions, spacesToColumnOptions } from './helpers';

const defaultToEmptyArray = defaultTo([]);

const SelectSpace = ({
  forwardTitle,
  onForward,
  backTitle,
  onBack,
  title,
  flowData,
}) => {
  const { fieldId, orientationId, levelId } = flowData;

  const [currentForm, send] = useMachine(machine, { devTools: true });
  const {
    zone: zoneActor,
    row: rowActor,
    column: columnActor,
  } = currentForm.context.inputRefs;

  const [zoneState] = useActor(zoneActor);
  const zoneId = zoneState.context.value;

  const [rowState] = useActor(rowActor);
  const rowId = rowState.context.value;

  const [columnState] = useActor(columnActor);
  const columnId = columnState.context.value;

  const onSubmit = useCallback(() => {
    send('SUBMIT');
  }, [send]);

  const snackbar = useSnackbar();

  useEffect(() => {
    const globalErrorMsg = currentForm.context.globalErrorMsg;
    if (selectFailure(currentForm)) {
      snackbar({ text: globalErrorMsg, variant: 'error' });
      return;
    }

    if (selectSuccess(currentForm)) {
      onForward({
        rowId,
        columnId,
        zoneId,
      });
      return;
    }
  }, [currentForm, snackbar, rowId, columnId, zoneId, onForward]);

  // TODO: handle error
  const { data: zones } = useFetchZones(fieldId, orientationId, levelId);

  // TODO: handle error
  const { data: spaces } = useFetchSpaces(zoneId);

  const zoneOptions = defaultToEmptyArray(zones);

  const { rowSpaceMap, rowOptions } = useMemo(
    () => spacesToRowOptions(defaultToEmptyArray(spaces)),
    [spaces]
  );

  const columnOptions = spacesToColumnOptions(rowSpaceMap[Number(rowId)]);

  return (
    <Stepper
      forwardTitle={forwardTitle}
      onForward={onSubmit}
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
