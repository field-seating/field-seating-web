import React, { forwardRef } from 'react';
import SolidButton from './SolidButton';
import OutlineButton from './OutlineButton';
import GhostButton from './GhostButton';
import LinkButton from './LinkButton';

const getButtonComp = (variant) => {
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

const Button = forwardRef(
  ({ isDisabled, onClick, variant, type, isLoading, ...props }, ref) => {
    const Comp = getButtonComp(variant);

    return (
      <Comp
        onClick={onClick}
        isDisabled={isDisabled}
        type={type}
        isLoading={isLoading}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
