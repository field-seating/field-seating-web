import React from 'react';
import { Box } from '@chakra-ui/react';
import BottomNavigation from '../bottom-navigation';
import DefaultHead from './default-head';

const AppLayout = ({ children }) => (
  <Box>
    <DefaultHead />
    <Box as="main" pb="56px">
      {children}
    </Box>
    <Box as="footer" w="100%" pos="fixed" bottom="env(safe-area-inset-bottom)">
      <BottomNavigation />
    </Box>
  </Box>
);

export default AppLayout;