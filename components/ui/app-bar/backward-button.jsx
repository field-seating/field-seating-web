import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import { isNil } from 'ramda';

const BaseUI = forwardRef(({ role, as, href, onClick }, ref) => (
  <IconButton
    display="flex"
    alignItems="center"
    as={as}
    onClick={onClick}
    href={href}
    ref={ref}
    role={role}
    variant="unstyled"
    aria-label="back"
    icon={<ArrowBackIcon w="24px" h="24px" />}
    _hover={{
      bg: 'primary.main',
    }}
    _active={{
      bg: 'primary.dark',
    }}
    _focus={{
      boxShadow: undefined,
    }}
  />
));

BaseUI.displayName = 'BaseUI';

const LinkItem = ({ href, onClick }) => (
  <NextLink href={href}>
    <a>
      <BaseUI onClick={onClick} role="link" />
    </a>
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
