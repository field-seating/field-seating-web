import { Button } from '@chakra-ui/react';
import { ButtonProps } from './type';

const SolidButton = (props: ButtonProps) => (
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
      bg: 'primary.dark',
      boxShadow: 'onSurface',
    }}
  >
    Button
  </Button>
);

export default SolidButton;
