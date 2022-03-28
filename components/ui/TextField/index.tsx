import { Input } from '@chakra-ui/react';
import { Props } from './type';

const TextField = (props: Props) => (
  <Input
    {...props}
    variant="outline"
    focusBorderColor="primary.light"
    errorBorderColor="secondary.main"
  />
);

export default TextField;
