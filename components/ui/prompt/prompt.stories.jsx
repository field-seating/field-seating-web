import React from 'react';
import { useDisclosure } from '@chakra-ui/react';

import Prompt from './';
import Button from '../button';

const story = {
  title: 'Prompt',
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'Are you sure to delete the data?',
    },
    description: {
      control: 'text',
    },
    cancelText: {
      control: 'text',
      defaultValue: '取消',
    },
    submitText: {
      control: 'text',
      defaultValue: '確定刪除',
    },
  },
};

export default story;

export const Main = (args) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button onClick={onOpen}>trigger</Button>
      <Prompt
        isOpen={isOpen}
        onClose={onClose}
        title={args.title}
        description={args.description}
      />
    </div>
  );
};
