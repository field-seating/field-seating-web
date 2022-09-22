import { useState, useCallback } from 'react';
import { defaultTo } from 'ramda';
import { useDisclosure } from '@chakra-ui/react';

const anonymousNameList = ['大王', '大谷', '十號隊友'];

export const generateAnonymousName = () => {
  const name =
    anonymousNameList[Math.floor(Math.random() * anonymousNameList.length)];
  return `匿名的${name}`;
};

const defaultPromptData = {
  title: null,
  description: null,
  onSubmit: () => {},
};

export const usePrompt = () => {
  const [promptData, setPromptData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = useCallback(
    ({ title, description, onSubmit }) => {
      onOpen();
      setPromptData({
        title,
        description,
        onSubmit,
      });
    },
    [onOpen]
  );

  const handleClose = useCallback(() => {
    onClose();
    setPromptData(defaultPromptData);
  }, [onClose]);

  const payload = defaultTo(defaultPromptData)(promptData);

  return {
    isOpen,
    onOpen: handleOpen,
    onClose: handleClose,
    ...payload,
  };
};
