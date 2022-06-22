import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import BottomNavigation from '../bottom-navigation';
import DefaultHead from './default-head';
import useAuth from 'lib/hooks/user-auth';

const AppLayout = ({ children }) => {
  useAuth();

  return (
    <Box>
      <DefaultHead />
      <Box as="main" h="100vh" pb="56px" position="relative">
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
