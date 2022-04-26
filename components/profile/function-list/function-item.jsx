import { forwardRef } from 'react';
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { isNil } from 'ramda';

const BaseUI = forwardRef(({ children, as, href, onClick }, ref) => (
  <Box
    as={as}
    display="flex"
    alignItems="center"
    px={[2, 5]}
    width="100%"
    height={[14, 20]}
    ref={ref}
    onClick={onClick}
    href={href}
    borderBottom="1px solid"
    borderColor="onSurface.gray"
    _active={{ bg: 'onSurface.gray' }}
    tabIndex="-1"
    transition="background-color 200ms"
  >
    {children}
  </Box>
));

BaseUI.displayName = 'BaseUI';

const LinkItem = ({ children, href }) => (
  <NextLink href={href} passHref>
    <BaseUI as="a">{children}</BaseUI>
  </NextLink>
);

const ButtonItem = ({ children, onClick }) => (
  <BaseUI as="button" onClick={onClick} role="button">
    {children}
  </BaseUI>
);

const FunctionItem = ({ children, onClick, href }) => {
  const isLink = !isNil(href);

  if (isLink) {
    return <LinkItem href={href}>{children}</LinkItem>;
  }
  return <ButtonItem onClick={onClick}>{children}</ButtonItem>;
};

FunctionItem.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  href: PropTypes.string,
};

export default FunctionItem;
