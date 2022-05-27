import { Button } from '@chakra-ui/react';

const GhostButton = (props) => (
  <Button
    {...props}
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
);

export default GhostButton;
