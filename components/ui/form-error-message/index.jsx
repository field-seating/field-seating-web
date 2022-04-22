import React from 'react';
import PropTypes from 'prop-types';

import { FormErrorMessage as ChakraFormErrorMessage } from '@chakra-ui/react';

const FormErrorMessage = ({ children }) => (
  <ChakraFormErrorMessage color="error.main">{children}</ChakraFormErrorMessage>
);

FormErrorMessage.propTypes = {
  children: PropTypes.node,
};

export default FormErrorMessage;
