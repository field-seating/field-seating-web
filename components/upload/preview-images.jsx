import { useContext, useEffect, useState } from 'react';
import { useActor } from '@xstate/react';
import { Box, Grid } from '@chakra-ui/react';
import { isNil } from 'ramda';

import { GlobalStateContext } from 'lib/contexts/global-state';
import PhotoPreviewCard from 'components/ui/photo-preview-card';

import Stepper from './stepper';
import { getChildProps } from './helpers';

const PreviewImages = () => {
  const [imageURLs, setImageURLs] = useState(null);

  const { uploadStepperService } = useContext(GlobalStateContext);
  const [uploadStepperState, sendToUploadStepperActor] =
    useActor(uploadStepperService);

  const {
    stepIndex,
    title,
    totalStep,
    flowData: { imageFiles },
  } = uploadStepperState.context;

  const { forwardTitle, onForward, backTitle, onBack } = getChildProps(
    sendToUploadStepperActor
  )(stepIndex, totalStep);

  useEffect(() => {
    if (imageFiles) {
      const urls = Array.from(imageFiles).map((imageFile, index) => ({
        id: index,
        url: URL.createObjectURL(imageFile),
        alt: 'image preview',
      }));
      setImageURLs(urls);
    }
  }, [imageFiles]);

  return (
    <Stepper
      forwardTitle={forwardTitle}
      onForward={onForward}
      backTitle={backTitle}
      onBack={onBack}
      title={title}
    >
      <Grid templateColumns={['repeat(2, 1fr)']} rowGap="8">
        {!isNil(imageURLs) &&
          imageURLs.map(({ id, url, alt }) => (
            <Box key={id} display="flex" justifyContent="center">
              <PhotoPreviewCard hideRate src={url} alt={alt} />
            </Box>
          ))}
      </Grid>
    </Stepper>
  );
};

export default PreviewImages;
