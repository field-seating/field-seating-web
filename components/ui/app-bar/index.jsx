import PropTypes from 'prop-types';
import { Box, Heading } from '@chakra-ui/react';
import { MoreVert } from '@mui/icons-material';
import { IconButton } from '@chakra-ui/react';

import BackwardButton from './backward-button';

const AppBar = ({ title, hasBackward, onBack, backHref, hasMenu, onMenu }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={4}
      bg="primary.main"
      color="onPrimary.main"
      h={[12, 16]}
      w="100%"
    >
      <Box display="flex" alignItems="center">
        {hasBackward && (
          <Box mr={4}>
            <BackwardButton onClick={onBack} href={backHref} />
          </Box>
        )}
        <Box>
          <Heading as="h1" size="md" m={0}>
            {title}
          </Heading>
        </Box>
      </Box>

      <Box>
        {hasMenu && (
          <IconButton
            display="flex"
            alignItems="center"
            onClick={onMenu}
            variant="unstyled"
            aria-label="menu"
            icon={<MoreVert w="24px" h="24px" />}
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
        )}
      </Box>
    </Box>
  );
};

AppBar.propTypes = {
  title: PropTypes.string,
  hasBackward: PropTypes.bool,
  onBack: PropTypes.func,
  backHref: PropTypes.string,
  hasMenu: PropTypes.bool,
  onMenu: PropTypes.func,
};

AppBar.defaultProps = {
  title: '',
};

export default AppBar;
