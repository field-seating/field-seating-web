import React, { forwardRef } from 'react';
import { Button } from '@chakra-ui/react';

const OutlineButton = forwardRef((props, ref) => (
  <Button
    {...props}
    ref={ref}
    bg="surface.main"
    color="primary.main"
    variant="outline"
    borderColor="onSurface.gray"
    _hover={{ bg: 'primary.transparent', borderColor: 'primary.main' }}
    _active={{
      bg: 'surface',
      borderColor: 'primary.main',
    }}
    _focus={{
      bg: 'surface',
      boxShadow: 'onSurface',
    }}
  />
));

OutlineButton.displayName = 'OutlineButton';

export default OutlineButton;
