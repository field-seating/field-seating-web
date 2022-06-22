import React, { forwardRef } from 'react';
import { Button } from '@chakra-ui/react';

const GhostButton = forwardRef((props, ref) => (
  <Button
    {...props}
    ref={ref}
    bg="surface"
    color={props.color || 'primary.main'}
    variant="ghost"
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

GhostButton.displayName = 'GhostButton';

export default GhostButton;
