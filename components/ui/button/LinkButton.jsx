import React, { forwardRef } from 'react';
import { Button } from '@chakra-ui/react';

const LinkButton = forwardRef((props, ref) => (
  <Button
    {...props}
    ref={ref}
    bg="surface"
    color="primary.light"
    variant="link"
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

LinkButton.displayName = 'LinkButton';

export default LinkButton;
