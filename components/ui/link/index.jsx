import React from 'react';
import NextLink from 'next/link';

import PropTypes from 'prop-types';

import { Link as ChakraLink } from '@chakra-ui/react';

const getFontSize = (size) => {
  switch (size) {
    case 'xs':
      return '12px';
    case 'md':
      return '16px';
    case 'lg':
      return '18px';
    case 'sm':
    default:
      return '14px';
  }
};

const Link = ({ children, color, isExternal, href, size }) => (
  <NextLink href={href} passHref>
    <ChakraLink
      fontSize={getFontSize(size)}
      isExternal={isExternal}
      color={color}
      variant="link"
      _active={{
        bg: 'surface',
        borderColor: 'primary.main',
      }}
      _focus={{
        bg: 'surface',
        boxShadow: 'onSurface',
      }}
    >
      {children}
    </ChakraLink>
  </NextLink>
);

Link.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  isExternal: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  color: PropTypes.string,
};

Link.defaultProps = {
  href: '#',
  isExternal: false,
  color: 'primary.light',
  size: 'md',
};

export default Link;
