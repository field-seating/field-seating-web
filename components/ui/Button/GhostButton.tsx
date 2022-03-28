import { Button } from '@chakra-ui/react';
import { ButtonProps } from './type';

const GhostButton = (props: ButtonProps) => (
  <Button
    {...props}
    bg="surface"
    color="primary.main"
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
