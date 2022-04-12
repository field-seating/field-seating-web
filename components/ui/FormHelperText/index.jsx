import React from 'react';
import PropTypes from 'prop-types';

import { FormHelperText as ChakraFormHelperText } from '@chakra-ui/react';

const FormHelperText = ({ children }) => (
  <ChakraFormHelperText color="onSurface.40">{children}</ChakraFormHelperText>
);

FormHelperText.propTypes = {
  children: PropTypes.node,
};

export default FormHelperText;
