import React from 'react';
import SolidButton from './SolidButton';
import OutlineButton from './OutlineButton';
import GhostButton from './GhostButton';
import LinkButton from './LinkButton';

const getButtonComp = variant => {
  switch (variant) {
    case 'outline':
      return OutlineButton;
    case 'ghost':
      return GhostButton;
    case 'link':
      return LinkButton;
    case 'solid':
    default:
      return SolidButton;
  }
};

const Button = ({ variant, ...props }) => {
  const Comp = getButtonComp(variant);

  return <Comp {...props} />;
};

export default Button;
