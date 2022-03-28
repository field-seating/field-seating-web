import { Button } from '@chakra-ui/react';
import { ButtonProps } from './type';

const LinkButton = (props: ButtonProps) => (
  <Button
    {...props}
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
);

export default LinkButton;
