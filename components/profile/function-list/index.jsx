import { useCallback, useContext } from 'react';
import { useActor } from '@xstate/react';
import { Box } from '@chakra-ui/react';

import { GlobalStateContext } from 'lib/contexts/global-state';

import FunctionItem from './function-item';

const FunctionList = () => {
  const { authService } = useContext(GlobalStateContext);
  const [, sendToAuthService] = useActor(authService);

  const logout = useCallback(() => {
    sendToAuthService('LOGOUT');
  }, [sendToAuthService]);

  return (
    <Box display="flex" flexDir="column">
      <FunctionItem href="/profile/info">個人資訊</FunctionItem>
      <FunctionItem href="/profile/password-management">管理密碼</FunctionItem>
      <FunctionItem onClick={logout}>登出</FunctionItem>
    </Box>
  );
};

export default FunctionList;
