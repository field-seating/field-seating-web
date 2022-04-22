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

const Link = ({ children, isExternal, href, size }) => (
  <NextLink href={href} passHref>
    <ChakraLink
      fontSize={getFontSize(size)}
      isExternal={isExternal}
      color="primary.light"
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
};

Link.defaultProps = {
  href: '#',
  isExternal: false,
};

export default Link;
