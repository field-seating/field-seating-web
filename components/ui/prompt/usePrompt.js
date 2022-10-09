import { useState, useCallback } from 'react';
import { defaultTo } from 'ramda';
import { useDisclosure } from '@chakra-ui/react';

const defaultPromptData = {
  title: null,
  description: null,
  onSubmit: () => {},
};

const usePrompt = () => {
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

export default usePrompt;
