import { Button } from '@chakra-ui/react';

const SolidButton = (props) => (
  <Button
    {...props}
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
);

export default SolidButton;
