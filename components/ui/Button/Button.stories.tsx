import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VariantEnum } from './type';

import Button from './';

export default {
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
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Solid = Template.bind({});
Solid.args = { variant: VariantEnum.solid };

export const Outline = Template.bind({});
Outline.args = { variant: VariantEnum.outline };

export const Ghost = Template.bind({});
Ghost.args = { variant: VariantEnum.ghost };

export const Link = Template.bind({});
Link.args = { variant: VariantEnum.link };
