import { useContext } from 'react';
import { Box } from '@chakra-ui/react';

import ImageUploadContext from 'lib/contexts/image-upload';

import Stepper from './stepper';

const PreviewImages = ({
  forwardTitle,
  onForward,
  backTitle,
  onBack,
  title,
}) => {
  const { images } = useContext(ImageUploadContext);
  console.log(images);

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
