import React from 'react';
import { FormControl } from '@chakra-ui/react';

import FormHelpText from './';

const story = {
  title: 'FormHelpText',
  component: FormHelpText,
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'this is a help text',
    },
  },
};

export default story;

export const Main = (args) => (
  <FormControl>
    <FormHelpText {...args} />
  </FormControl>
);
