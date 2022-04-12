import React from 'react';

import useSnackbar from './';
import Button from '../Button';

const story = {
  title: 'Snackbar',
  //component: Snackbar,
  argTypes: {
    text: {
      control: 'text',
      defaultValue: 'I am a message for success announcement',
    },
    variant: {
      control: 'radio',
      defaultValue: 'solid',
      options: ['solid', 'error'],
    },
  },
};

export default story;

export const Main = (args) => {
  const snackbar = useSnackbar();

  return <Button onClick={() => snackbar(args)}>trigger</Button>;
};
