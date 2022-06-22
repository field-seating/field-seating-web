import React, { useContext } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import { useSelector } from '@xstate/react';

import useAuth from 'lib/hooks/user-auth';
import { GlobalStateContext } from 'lib/contexts/global-state';
import { selectActive } from 'lib/machines/loading-machine';

import BottomNavigation from '../bottom-navigation';
import DefaultHead from './default-head';

const AppLayout = ({ children }) => {
  useAuth();

  const { loadingService } = useContext(GlobalStateContext);

  const isLoading = useSelector(loadingService, selectActive);

  return (
    <Box h="100%">
      <DefaultHead />
      <Box as="main" h="100%" pb="56px" position="relative">
        {isLoading && (
          <Box
            bg="onSurface.40"
            position="absolute"
            w="100%"
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex="100"
          >
            <Spinner size="lg" />
          </Box>
        )}
        {children}
      </Box>
      <Box
        as="footer"
        w="100%"
        pos="fixed"
        bottom="env(safe-area-inset-bottom)"
      >
        <BottomNavigation />
      </Box>
    </Box>
  );
};
export default AppLayout;
