import { useToast, Box, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const getBg = (variant) => {
  switch (variant) {
    case 'error': {
      return 'error.main';
    }
    case 'solid':
    default:
      return 'secondary.main';
  }
};

const Snackbar = ({ children, variant }) => (
  <Box mb="56px" bg={getBg(variant)} w={['100%']} p={4} boxShadow="xl">
    <Text color="onSecondary.main">{children}</Text>
  </Box>
);

Snackbar.defaultProps = {
  variant: 'solid',
};

Snackbar.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['solid', 'error']),
};

const useSnackbar = () => {
  const toast = useToast();
  const func = useCallback(
    ({ text, variant }) =>
      toast({
        duration: 3000,
        render: () => <Snackbar variant={variant}>{text}</Snackbar>,
      }),
    [toast]
  );

  return func;
};

export default useSnackbar;
