const { Box } = require('@chakra-ui/react');

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
      <Box>PreviewImages</Box>
    </Stepper>
  );
};

export default PreviewImages;
