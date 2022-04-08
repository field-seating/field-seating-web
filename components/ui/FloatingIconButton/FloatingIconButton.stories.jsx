import React from 'react';
import { PhoneIcon } from '@chakra-ui/icons';

import Button from './';

const story = {
  title: 'Floating Icon Button',
  component: Button,
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      defaultValue: 'sm',
    },
  },
};

export default story;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Main = (args) => (
  <Button {...args}>
    <PhoneIcon />
  </Button>
);
