import { Button } from '@chakra-ui/react';

const OutlineButton = (props) => (
  <Button
    {...props}
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
);

export default OutlineButton;
