import React from 'react';

import Button from './';

const story = {
  title: 'Floating Action Button',
  component: Button,
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'Submit',
    },
  },
};

export default story;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Main = (args) => <Button {...args} />;
