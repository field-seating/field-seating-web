import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PhoneIcon } from '@chakra-ui/icons';

import Button from './';

export default {
  title: 'Floating Icon Button',
  component: Button,
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      defaultValue: 'sm',
    },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Main: ComponentStory<typeof Button> = args => (
  <Button {...args}>
    <PhoneIcon />
  </Button>
);
