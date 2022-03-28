import React from 'react';
import { VariantEnum, RootButtonProps } from './type';
import SolidButton from './SolidButton';
import OutlineButton from './OutlineButton';
import GhostButton from './GhostButton';
import LinkButton from './LinkButton';

const getButtonComp = (variant: VariantEnum) => {
  switch (variant) {
    case VariantEnum.outline:
      return OutlineButton;
    case VariantEnum.ghost:
      return GhostButton;
    case VariantEnum.link:
      return LinkButton;
    case VariantEnum.solid:
    default:
      return SolidButton;
  }
};

const Button = ({ variant, ...props }: RootButtonProps) => {
  const Comp = getButtonComp(variant);

  return <Comp {...props} />;
};

export default Button;
