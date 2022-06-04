import { useContext, useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { isNil } from 'ramda';

import ImageUploadContext from 'lib/contexts/image-upload';

import Stepper from './stepper';

const PreviewImages = ({
  forwardTitle,
  onForward,
  backTitle,
  onBack,
  title,
}) => {
  const [imageURLs, setImageURLs] = useState(null);
  const { images } = useContext(ImageUploadContext);

  useEffect(() => {
    if (images) {
      const urls = Array.from(images).map((imageFile, index) => ({
        id: index,
        url: URL.createObjectURL(imageFile),
        alt: 'image preview',
      }));
      setImageURLs(urls);
    }
  }, [images]);

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
