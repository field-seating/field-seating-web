import { useEffect, useCallback, useRef } from 'react';
import { useMachine, useActor } from '@xstate/react';
import { Grid } from '@chakra-ui/react';
import { defaultTo, head, isEmpty } from 'ramda';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';

import SelectActorField from 'components/select-actor-field';
import useSnackbar from 'components/ui/snackbar';
import Button from 'components/ui/button';
import { useFetchFields } from 'lib/fetch/fields/list-fields';
import { useFetchOrientations } from 'lib/fetch/fields/list-orientations';
import { useFetchLevels } from 'lib/fetch/fields/list-levels';
import { selectSuccess, selectFailure } from 'lib/machines/form';

import machine from './form-machine';
import { useFetchZones } from 'lib/fetch/fields/list-zones';

const defaultToEmptyArray = defaultTo([]);
const getDefaultValue = (valueInContext, options) => {
  if (valueInContext) {
    return valueInContext;
  }

  if (!isEmpty(options)) {
    return head(options).id;
  }
  return null;
};

const ZoneCriteriaDrawer = ({
  isOpen,
  onClose,
  onSave,
  defaultFieldId,
  defaultLevelId,
  defaultOrientationId,
  defaultZoneId,
}) => {
  const [currentForm, sendToForm] = useMachine(machine, { devTools: true });
  const {
    field: fieldActor,
    orientation: orientationActor,
    level: levelActor,
    zone: zoneActor,
  } = currentForm.context.inputRefs;

  const [fieldState] = useActor(fieldActor);
  const fieldId = fieldState.context.value;

  const [orientationState] = useActor(orientationActor);
  const orientationId = orientationState.context.value;

  const [levelState] = useActor(levelActor);
  const levelId = levelState.context.value;

  const [zoneState] = useActor(zoneActor);
  const zoneId = zoneState.context.value;

  const snackbar = useSnackbar();

  useEffect(() => {
    const globalErrorMsg = currentForm.context.globalErrorMsg;
    if (selectFailure(currentForm)) {
      snackbar({ text: globalErrorMsg, variant: 'error' });
      return;
    }

    if (selectSuccess(currentForm)) {
      onSave({
        fieldId,
        orientationId,
        levelId,
        zoneId,
      });
      return;
    }
  }, [onSave, currentForm, snackbar, fieldId, orientationId, levelId, zoneId]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      sendToForm('SUBMIT');
    },
    [sendToForm]
  );

  const { data: fields } = useFetchFields();
  const { data: orientations } = useFetchOrientations(fieldId);
  const { data: levels } = useFetchLevels(fieldId);
  const { data: zones } = useFetchZones(fieldId, orientationId, levelId);

  const fieldOptions = defaultToEmptyArray(fields);
  const orientationOptions = defaultToEmptyArray(orientations);
  const levelOptions = defaultToEmptyArray(levels);
  const zoneOptions = defaultToEmptyArray(zones);

  const ref = useRef();

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      initialFocusRef={ref}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
          <form>
            <Grid mt={8} templateColumns="1fr" gap="4">
              <SelectActorField
                actor={fieldActor}
                options={fieldOptions}
                defaultValue={getDefaultValue(
                  Number(defaultFieldId),
                  fieldOptions
                )}
              />
              <SelectActorField
                actor={orientationActor}
                options={orientationOptions}
                defaultValue={getDefaultValue(
                  Number(defaultOrientationId),
                  orientationOptions
                )}
              />
              <SelectActorField
                actor={levelActor}
                options={levelOptions}
                defaultValue={getDefaultValue(
                  Number(defaultLevelId),
                  levelOptions
                )}
              />
              <SelectActorField
                actor={zoneActor}
                options={zoneOptions}
                defaultValue={getDefaultValue(
                  Number(defaultZoneId),
                  zoneOptions
                )}
              />
            </Grid>
          </form>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button ref={ref} onClick={onSubmit}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ZoneCriteriaDrawer;
