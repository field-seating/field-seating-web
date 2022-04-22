import React from 'react';

import Button from './';

const story = {
  title: 'Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg'],
      defaultValue: 'sm',
    },
    children: {
      control: 'text',
      defaultValue: 'Submit',
    },
  },
};

export default story;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Button {...args} />;

export const Solid = Template.bind({});
Solid.args = { variant: 'solid' };

export const Outline = Template.bind({});
Outline.args = { variant: 'outline' };

export const Ghost = Template.bind({});
Ghost.args = { variant: 'ghost' };

export const Link = Template.bind({});
Link.args = { variant: 'link' };
