import React from 'react';

import TextField from './';

const story = {
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
};

export default story;

export const Main = args => <TextField {...args} />;
