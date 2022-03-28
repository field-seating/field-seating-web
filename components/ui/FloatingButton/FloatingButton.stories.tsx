import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './';

export default {
  title: 'Floating Action Button',
  component: Button,
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'Submit',
    },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Main: ComponentStory<typeof Button> = args => <Button {...args} />;
