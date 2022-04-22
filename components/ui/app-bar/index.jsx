import PropTypes from 'prop-types';
import { Box, Heading } from '@chakra-ui/react';

import BackwardButton from './backward-button';

const AppBar = ({ title, hasBackward, onBack, backHref }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      px={4}
      bg="primary.main"
      color="onPrimary.main"
      h="14"
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

      <Box></Box>
    </Box>
  );
};

AppBar.propTypes = {
  title: PropTypes.string,
  hasBackward: PropTypes.bool,
  onBack: PropTypes.func,
  backHref: PropTypes.string,
};

AppBar.defaultProps = {
  title: '',
};

export default AppBar;
