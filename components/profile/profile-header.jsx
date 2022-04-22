import { useContext } from 'react';
import { useActor } from '@xstate/react';

import { GlobalStateContext } from 'lib/contexts/globalState';

import { Box, Heading } from '@chakra-ui/react';

const ProfileHeader = ({ children }) => {
  const { authService } = useContext(GlobalStateContext);
  const [state] = useActor(authService);

  return (
    <Box display="flex" flexDir="column" px={[4, 16]} py={4}>
      <Box>
        <Box h="45px">
          <Heading as="h2" size="xl" color="onSurface.main">
            {state.matches('login')
              ? `${state.context.name}`
              : `你好，歡迎加入`}
          </Heading>
        </Box>
        <Box h="45px"></Box>
      </Box>
      {children}
    </Box>
  );
};

export default ProfileHeader;
