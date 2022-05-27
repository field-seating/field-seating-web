import { useMachine } from '@xstate/react';
import { Box, Heading } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

import uploadStepperMachine from 'lib/machines/upload-stepper-machine';
import Button from 'components/ui/button';

import { getFooterOptions } from './helpers';
import FilterZones from './filter-zones';

const UploadContent = () => {
  const [current, send] = useMachine(uploadStepperMachine, { devTools: true });

  const { stepIndex, title, totalStep } = current.context;

  const barHeight = [10, 16];

  const { back, forward } = getFooterOptions(send)(stepIndex, totalStep);

  return (
    <Box h="100%" display="flex" flexDir="column">
      <Box
        h={barHeight}
        w="100%"
        display="flex"
        alignItems="center"
        bg="secondary.light"
        color="onSecondary.main"
        px={[8]}
      >
        <Heading as="h1" size="sm" m={0}>{`${stepIndex}：${title}`}</Heading>
      </Box>
      <Box flex="1" p={[4, 12]}>
        <FilterZones />
      </Box>
      <Box
        h={barHeight}
        w="100%"
        px={[3]}
        bg="secondary.light"
        color="onSecondary.main"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          {back && (
            <Button
              size="sm"
              color="onSecondary.main"
              variant="ghost"
              leftIcon={<ArrowBackIcon />}
              onClick={back.onClick}
            >
              {back.title}
            </Button>
          )}
        </Box>
        <Box>
          {forward && (
            <Button
              size="sm"
              variant="ghost"
              color="onSecondary.main"
              rightIcon={<ArrowForwardIcon />}
              onClick={forward.onClick}
            >
              {forward.title}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UploadContent;
