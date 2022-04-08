import { Button } from '@chakra-ui/react';

const FloatingActionButton = props => (
  <Button
    {...props}
    px={5}
    bg="primary.light"
    color="onPrimary.main"
    variant="solid"
    size="md"
    borderRadius="40px"
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
);

export default FloatingActionButton;
