import { Select as CkSelect } from '@chakra-ui/react';

import { Props } from './type';

const Select = (props: Props) => (
  <CkSelect
    {...props}
    variant="outline"
    focusBorderColor="primary.light"
    errorBorderColor="secondary.main"
  />
);

export default Select;
