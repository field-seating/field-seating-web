import React from 'react';

import Link from './';

const story = {
  title: 'Link',
  component: Link,
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'this is a form label',
    },
    href: {
      control: 'text',
    },
  },
};

export default story;

export const Main = (args) => <Link {...args} />;
