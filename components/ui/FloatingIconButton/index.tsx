import { Button } from '@chakra-ui/react';
import { ButtonProps, SizeEnum } from './type';

const getStyle = (size: SizeEnum) => {
  switch (size) {
    case SizeEnum.sm:
      return {
        width: 10,
        height: 10,
        borderRadius: '40px',
      };

    case SizeEnum.md:
    default:
      return {
        width: 14,
        height: 14,
        borderRadius: '56px',
      };
  }
};

const FloatingIconButton = (props: ButtonProps) => (
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
