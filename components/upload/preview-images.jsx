import { useContext, useEffect, useState } from 'react';
import { useActor } from '@xstate/react';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { isNil } from 'ramda';

import { GlobalStateContext } from 'lib/contexts/global-state';

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
      <Box>
        {!isNil(imageURLs) &&
          imageURLs.map(({ id, url, alt }) => (
            <Image
              key={id}
              src={url}
              alt={alt}
              layout="responsive"
              width="300"
              height="300"
            />
          ))}
      </Box>
    </Stepper>
  );
};

export default PreviewImages;
