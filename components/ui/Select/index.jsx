import { Select as CkSelect } from '@chakra-ui/react';

const Select = props => (
  <CkSelect
    {...props}
    variant="outline"
    focusBorderColor="primary.light"
    errorBorderColor="secondary.main"
  />
);

export default Select;
