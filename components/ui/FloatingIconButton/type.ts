export enum SizeEnum {
  sm = 'sm',
  md = 'md',
}

export interface ButtonProps {
  children: React.ReactNode;
  'aria-label': string;
  size: SizeEnum;
}
