import React from 'react';
import { Box } from '@chakra-ui/react';

import PhotoPreviewCard from './';
import imageSrc from './fenway-park.jpg';

const story = {
  title: 'PhotoPreviewCard',
  component: PhotoPreviewCard,
  argTypes: {
    thumbUp: {
      control: 'number',
      defaultValue: 100,
    },
    thumbDown: {
      control: 'number',
      defaultValue: 100,
    },
  },
};

export default story;

export const Main = ({ thumbUp, thumbDown }) => {
  return (
    <Box>
      <Box mb="4">
        <PhotoPreviewCard
          thumbUp={thumbUp}
          thumbDown={thumbDown}
          src={`${imageSrc}`}
        />
      </Box>
      <Box>
        <PhotoPreviewCard
          thumbUp={thumbUp}
          thumbDown={thumbDown}
          src={`/wrongurl`}
        />
      </Box>
    </Box>
  );
};
