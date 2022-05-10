import { useContext } from 'react';
import { useActor } from '@xstate/react';
import { Box, Heading } from '@chakra-ui/react';

import { GlobalStateContext } from 'lib/contexts/globalState';
import Link from 'components/ui/link';
import { selectLogin, selectLoginInactive } from 'lib/machines/auth';

const ProfileHeader = ({ children }) => {
  const { authService } = useContext(GlobalStateContext);
  const [state] = useActor(authService);

  const isLoggedIn = selectLogin(state);
  const isInactive = selectLoginInactive(state);

  return (
    <Box display="flex" flexDir="column" pb={4}>
      <Box mb={4}>
        <Box h="45px">
          <Heading as="h2" size="xl" color="onSurface.main">
            {isLoggedIn ? `${state.context.name}` : `你好，歡迎加入`}
          </Heading>
        </Box>
        <Box display="flex" alignItems="flex-end" h="45px">
          <Box>
            {isInactive && (
              <Link size="md" href="/profile/verify" color="secondary.main">
                點我完成認證
              </Link>
            )}
          </Box>
          <Box></Box>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default ProfileHeader;
