import React from 'react';
import { VariantEnum, RootButtonProps } from './type';
import SolidButton from './SolidButton';

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

export default Button;
