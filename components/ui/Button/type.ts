export enum VariantEnum {
  solid = 'solid',
  outline = 'outline',
  ghost = 'ghost',
  link = 'link',
}

export interface RootButtonProps extends ButtonProps {
  variant: VariantEnum;
}

export interface ButtonProps {
  children: React.ReactNode;
}
