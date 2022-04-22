import React from 'react';
import PropTypes from 'prop-types';

import { FormLabel as ChakraFormLabel } from '@chakra-ui/react';

const FormLabel = ({ children }) => (
  <ChakraFormLabel color="onSurface.main">{children}</ChakraFormLabel>
);

FormLabel.propTypes = {
  children: PropTypes.node,
};

export default FormLabel;
