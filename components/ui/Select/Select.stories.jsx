import React from 'react';

import Select from './';

const story = {
  title: 'Select',
  component: Select,
  argTypes: {
    size: {
      control: 'radio',
      defaultValue: 'sm',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
};

export default story;

export const Main = args => (
  <Select {...args}>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </Select>
);
