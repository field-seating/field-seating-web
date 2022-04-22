import React from 'react';
import { FormControl } from '@chakra-ui/react';

import FormLabel from './';

const story = {
  title: 'FormLabel',
  component: FormLabel,
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'this is a form label',
    },
  },
};

export default story;

export const Main = (args) => (
  <FormControl>
    <FormLabel {...args} />
  </FormControl>
);
