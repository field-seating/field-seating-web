import React from 'react';
import { Button as ChaButton } from '@chakra-ui/react';

const SolidButton = (props: ButtonProps) => (
  <ChaButton
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
  </ChaButton>
);

const getButtonComp = (variant: VariantEnum) => {
  switch (variant) {
    case 'solid':
    default:
      return SolidButton;
  }
};

const Button = ({ variant, ...props }: RootButtonProps) => {
  const Comp = getButtonComp(variant);

  return <Comp {...props} />;
};

enum VariantEnum {
  solid = 'solid',
  outline = 'outline',
  ghost = 'ghost',
  link = 'link',
}

interface RootButtonProps extends ButtonProps {
  variant: VariantEnum;
}

interface ButtonProps {
  children: React.ReactNode;
}

export default Button;
