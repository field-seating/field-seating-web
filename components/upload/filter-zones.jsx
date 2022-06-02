import { useCallback, useEffect } from 'react';
import { useMachine, useActor } from '@xstate/react';
import { Grid } from '@chakra-ui/react';
import { defaultTo } from 'ramda';

import SelectActorField from 'components/select-actor-field';
import { useFetchFields } from 'lib/fetch/fields/list-fields';
import { useFetchOrientations } from 'lib/fetch/fields/list-orientations';
import { useFetchLevels } from 'lib/fetch/fields/list-levels';
import {
  //selectDisabled,
  //selectLoading,
  selectSuccess,
  selectFailure,
} from 'lib/machines/form';
import useSnackbar from 'components/ui/snackbar';

import Stepper from './stepper';
import machine from './filter-zones-machine';
import { getDefaultValue } from './helpers';

const defaultToEmptyArray = defaultTo([]);

const FilterZones = ({
  forwardTitle,
  onForward,
  backTitle,
  onBack,
  title,
  flowData,
}) => {
  const [currentForm, send] = useMachine(machine, { devTools: true });
  const {
    field: fieldActor,
    orientation: orientationActor,
    level: levelActor,
  } = currentForm.context.inputRefs;

  const [fieldState] = useActor(fieldActor);
  const fieldId = fieldState.context.value;

  const [orientationState] = useActor(orientationActor);
  const orientationId = orientationState.context.value;

  const [levelState] = useActor(levelActor);
  const levelId = levelState.context.value;

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      send('SUBMIT');
    },
    [send]
  );

  const snackbar = useSnackbar();

  useEffect(() => {
    const globalErrorMsg = currentForm.context.globalErrorMsg;
    if (selectFailure(currentForm)) {
      snackbar({ text: globalErrorMsg, variant: 'error' });
      return;
    }

    if (selectSuccess(currentForm)) {
      onForward({
        fieldId,
        orientationId,
        levelId,
      });
      return;
    }
  }, [currentForm, snackbar, fieldId, orientationId, levelId, onForward]);

  // TODO: handle error
  const { data: fields } = useFetchFields();

  // TODO: handle error
  const { data: orientations } = useFetchOrientations(fieldId);
  const { data: levels } = useFetchLevels(fieldId);

  const fieldOptions = defaultToEmptyArray(fields);
  const orientationOptions = defaultToEmptyArray(orientations);
  const levelOptions = defaultToEmptyArray(levels);

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
          <SelectActorField
            actor={fieldActor}
            options={fieldOptions}
            defaultValue={getDefaultValue(flowData.fieldId, fieldOptions)}
          />
          <SelectActorField
            actor={orientationActor}
            options={orientationOptions}
            defaultValue={getDefaultValue(
              flowData.orientationId,
              orientationOptions
            )}
          />
          <SelectActorField
            actor={levelActor}
            options={levelOptions}
            defaultValue={getDefaultValue(flowData.levelId, levelOptions)}
          />
        </Grid>
      </form>
    </Stepper>
  );
};

export default FilterZones;
