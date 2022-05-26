import { useMachine } from '@xstate/react';
import { Box, Heading } from '@chakra-ui/react';

import uploadStepperMachine from 'lib/machines/upload-stepper-machine';

import FilterZones from './filter-zones';

const UploadContent = () => {
  const [current] = useMachine(uploadStepperMachine, { devTools: true });
  const barHeight = [10, 16];
  return (
    <Box h="100%" display="flex" flexDir="column">
      <Box
        h={barHeight}
        w="100%"
        display="flex"
        alignItems="center"
        bg="secondary.light"
        color="onSecondary.main"
        pl="8"
      >
        <Heading
          as="h1"
          size="sm"
          m={0}
        >{`${current.context.stepIndex}：${current.context.title}`}</Heading>
      </Box>
      <Box flex="1" p={[4, 12]}>
        <FilterZones />
      </Box>
      <Box
        h={barHeight}
        w="100%"
        bg="secondary.light"
        color="onSecondary.main"
      ></Box>
    </Box>
  );
};

export default UploadContent;
