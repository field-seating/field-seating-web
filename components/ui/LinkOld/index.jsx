import React from 'react';
import NextLink from 'next/link';

import PropTypes from 'prop-types';

import { Link as ChakraLink } from '@chakra-ui/react';

const Link = ({ children, isExternal, href }) => (
  <NextLink href={href} passHref>
    <ChakraLink
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
};

Link.defaultProps = {
  href: '#',
  isExternal: false,
};

export default Link;
