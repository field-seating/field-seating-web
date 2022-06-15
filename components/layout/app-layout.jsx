import React from 'react';
import { Box } from '@chakra-ui/react';
import BottomNavigation from '../bottom-navigation';
import DefaultHead from './default-head';
import useAuth from 'lib/hooks/user-auth';

const AppLayout = ({ children }) => {
  useAuth();

  return (
    <Box>
      <DefaultHead />
      <Box as="main" h="100vh" pb="56px">
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
