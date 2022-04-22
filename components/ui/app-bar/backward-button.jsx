import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { isNil } from 'ramda';

const BaseUI = forwardRef(({ role, as, href, onClick }, ref) => (
  <Box as={as} onClick={onClick} href={href} ref={ref} role={role}>
    <ArrowBackIcon w="24px" h="24px" />
  </Box>
));

BaseUI.displayName = 'BaseUI';

const LinkItem = ({ href, onClick }) => (
  <NextLink href={href} passHref>
    <BaseUI onClick={onClick} as="a" role="link" />
  </NextLink>
);

const ButtonItem = ({ onClick }) => (
  <BaseUI onClick={onClick} as="button" role="button" />
);

const BackwardButton = ({ href, onClick }) => {
  const isLink = !isNil(href);

  if (isLink) {
    return <LinkItem href={href} onClick={onClick} />;
  }
  return <ButtonItem onClick={onClick} />;
};

BackwardButton.propTypes = {
  onClick: PropTypes.func,
  href: PropTypes.string,
};

export default BackwardButton;
