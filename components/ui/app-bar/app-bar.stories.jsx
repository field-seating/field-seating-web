import React from 'react';

import { Box } from '@chakra-ui/react';

import AppBar from './';

const story = {
  title: 'AppBar',
  component: AppBar,
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'Field Seating',
    },
    type: {
      control: 'radio',
      options: ['link', 'button'],
      defaultValue: 'link',
    },
    hasBackward: {
      control: 'boolean',
      defaultValue: true,
    },
  },
};

export default story;

export const Main = ({ title, type, hasBackward }) => {
  if (type === 'link') {
    return (
      <Box width="400px" shadow="outline">
        <AppBar
          title={title}
          hasBackward={Boolean(hasBackward)}
          backHref="#"
          onBack={() => console.log('on back')}
        />
      </Box>
    );
  }

  return (
    <Box width="400px" shadow="outline">
      <AppBar
        title={title}
        hasBackward={Boolean(hasBackward)}
        onBack={() => console.log('on back')}
      />
    </Box>
  );
};
