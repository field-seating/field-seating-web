import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextField from './';

export default {
  title: 'TextField',
  component: TextField,
  argTypes: {
    placeholder: {
      control: 'text',
      defaultValue: 'placeholder',
    },
    size: {
      control: 'radio',
      defaultValue: 'sm',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
} as ComponentMeta<typeof TextField>;

export const Main: ComponentStory<typeof TextField> = args => (
  <TextField {...args} />
);
