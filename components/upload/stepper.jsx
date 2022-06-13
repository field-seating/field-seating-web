import { Box, Heading } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

import Button from 'components/ui/button';

const Stepper = ({
  children,
  title,
  forwardTitle,
  onForward,
  backTitle,
  onBack,
}) => {
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
        px={[8]}
      >
        <Heading as="h1" size="sm" m={0}>
          {title}
        </Heading>
      </Box>
      <Box flex="1" p={[8, 12]} overflowY="auto">
        {children}
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
          {backTitle && (
            <Button
              size="sm"
              color="onSecondary.main"
              variant="ghost"
              leftIcon={<ArrowBackIcon />}
              onClick={() => onBack()}
            >
              {backTitle}
            </Button>
          )}
        </Box>
        <Box>
          {forwardTitle && (
            <Button
              size="sm"
              variant="ghost"
              color="onSecondary.main"
              rightIcon={<ArrowForwardIcon />}
              onClick={() => onForward()}
            >
              {forwardTitle}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Stepper;
