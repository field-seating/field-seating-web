import { useCallback, useContext } from 'react';
import { useActor } from '@xstate/react';
import { Box } from '@chakra-ui/react';

import { GlobalStateContext } from 'lib/contexts/globalState';

import FunctionItem from './function-item';

const FunctionList = () => {
  const { authService } = useContext(GlobalStateContext);
  const [, sendToAuthService] = useActor(authService);

  const logout = useCallback(() => {
    sendToAuthService('LOGOUT');
  }, [sendToAuthService]);

  return (
    <Box display="flex" flexDir="column">
      <FunctionItem href="/profile">個人資訊</FunctionItem>
      <FunctionItem href="/profile">管理密碼</FunctionItem>
      <FunctionItem onClick={logout}>登出</FunctionItem>
    </Box>
  );
};

export default FunctionList;
