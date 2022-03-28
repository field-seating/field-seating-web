import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Select from './';

export default {
  title: 'Select',
  component: Select,
  argTypes: {
    size: {
      control: 'radio',
      defaultValue: 'sm',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
} as ComponentMeta<typeof Select>;

export const Main: ComponentStory<typeof Select> = args => (
  <Select {...args}>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </Select>
);
