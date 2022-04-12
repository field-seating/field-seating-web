import PropTypes from 'prop-types';

import { Input } from '@chakra-ui/react';

const TextField = ({ size, placeholder, value, onBlur, type, ...props }) => (
  <Input
    {...props}
    size={size}
    placeholder={placeholder}
    value={value}
    onBlur={onBlur}
    type={type}
    variant="outline"
    focusBorderColor="primary.light"
    errorBorderColor="error.main"
  />
);

TextField.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  type: PropTypes.string,
};

TextField.defaultProps = {
  type: 'text',
};

export default TextField;
