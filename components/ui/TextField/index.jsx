import { Input } from '@chakra-ui/react';

const TextField = props => (
  <Input
    {...props}
    variant="outline"
    focusBorderColor="primary.light"
    errorBorderColor="secondary.main"
  />
);

export default TextField;
