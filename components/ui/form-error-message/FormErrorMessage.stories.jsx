import React from 'react';
import { FormControl } from '@chakra-ui/react';

import FormErrorMessage from './';

const story = {
  title: 'FormErrorMessage',
  component: FormErrorMessage,
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'this is an error',
    },
  },
};

export default story;

export const Main = (args) => (
  <FormControl isInvalid>
    <FormErrorMessage {...args} />
  </FormControl>
);
