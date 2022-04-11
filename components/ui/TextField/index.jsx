import { Input } from '@chakra-ui/react';

const TextField = (props) => (
  <Input
    {...props}
    variant="outline"
    focusBorderColor="primary.light"
    errorBorderColor="red.500"
  />
);

export default TextField;
