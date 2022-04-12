import { Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const TextField = ({ size, placeholder, value, onBlur, ...props }) => (
  <Input
    {...props}
    size={size}
    placeholder={placeholder}
    value={value}
    onBlur={onBlur}
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
};

export default TextField;
