import { Select as CkSelect } from '@chakra-ui/react';

const Select = (props) => (
  <CkSelect
    {...props}
    variant="outline"
    focusBorderColor="primary.light"
    errorBorderColor="red.500"
  />
);

export default Select;
