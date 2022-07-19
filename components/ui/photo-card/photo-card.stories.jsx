import React from 'react';
import { Box } from '@chakra-ui/react';

import PhotoCard from './';
import imageSrc from '../photo-preview-card/fenway-park.jpg';

const story = {
  title: 'PhotoCard',
  component: PhotoCard,
  argTypes: {
    userName: {
      control: 'text',
      defaultValue: 'John Doe',
    },
    date: {
      control: 'text',
      defaultValue: '2020-02-02',
    },
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

export const Main = ({ userName, date, thumbUp, thumbDown }) => {
  return (
    <Box w="80%">
      <Box mb="4">
        <PhotoCard
          thumbUp={thumbUp}
          thumbDown={thumbDown}
          src={`${imageSrc}`}
          userName={userName}
          date={date}
        />
      </Box>
      <Box>
        <PhotoCard
          thumbUp={thumbUp}
          thumbDown={thumbDown}
          src={`/wrongurl`}
          userName={userName}
          date={date}
        />
      </Box>
    </Box>
  );
};
