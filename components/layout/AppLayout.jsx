import React from 'react';
import { Box } from '@chakra-ui/react';
import BottomNavigation from '../BottomNavigation';

const AppLayout = ({ children }) => (
  <Box>
    <Box as="main" pb="56px">
      {children}
    </Box>
    <Box as="footer" w="100%" pos="fixed" bottom="env(safe-area-inset-bottom)">
      <BottomNavigation />
    </Box>
  </Box>
);

export default AppLayout;
