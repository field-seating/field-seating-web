import { Box } from '@chakra-ui/react';

import Stepper from './stepper';

const PreviewImages = ({
  forwardTitle,
  onForward,
  backTitle,
  onBack,
  title,
}) => {
  return (
    <Stepper
      forwardTitle={forwardTitle}
      onForward={onForward}
      backTitle={backTitle}
      onBack={onBack}
      title={title}
    >
      <Box></Box>
    </Stepper>
  );
};

export default PreviewImages;
