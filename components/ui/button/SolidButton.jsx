import React, { forwardRef } from 'react';
import { Button } from '@chakra-ui/react';

const SolidButton = forwardRef((props, ref) => (
  <Button
    {...props}
    ref={ref}
    bg="primary.light"
    color="onPrimary.main"
    variant="solid"
    _hover={{ bg: 'primary.main' }}
    _active={{
      bg: 'primary.main',
      borderColor: 'onSurface.gray',
    }}
    _focus={{
      bg: 'primary.light',
      boxShadow: 'onSurface',
    }}
  />
));

SolidButton.displayName = 'SolidButton';

export default SolidButton;
