import { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Text,
} from '@chakra-ui/react';
import { isNil } from 'ramda';

import Button from '../button';

const Prompt = ({
  title,
  description,
  cancelText,
  submitText,
  onClose,
  onSubmit,
  isOpen,
}) => {
  const hasDescription = !isNil(description);
  const wrappedOnSubmit = useCallback(
    (e) => {
      onSubmit(e);
      onClose(e);
    },
    [onSubmit, onClose]
  );

  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth={hasDescription && '1px'}>
          {title}
        </DrawerHeader>
        {description && (
          <DrawerBody>
            <Text>{description}</Text>
          </DrawerBody>
        )}
        <DrawerFooter>
          <Button variant="outline" mr={4} onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant="solid" onClick={wrappedOnSubmit}>
            {submitText}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
Prompt.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
};

Prompt.defaultProps = {
  cancelText: '取消',
  submitText: '確定',
};

export default Prompt;
