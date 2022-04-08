import { Button } from '@chakra-ui/react';

const getStyle = size => {
  switch (size) {
    case 'sm':
      return {
        width: 10,
        height: 10,
        borderRadius: '40px',
      };

    case 'md':
    default:
      return {
        width: 14,
        height: 14,
        borderRadius: '56px',
      };
  }
};

const FloatingIconButton = props => (
  <Button
    {...props}
    bg="primary.light"
    color="onPrimary.main"
    variant="solid"
    {...getStyle(props.size)}
    boxShadow="onSurface"
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

export default FloatingIconButton;
