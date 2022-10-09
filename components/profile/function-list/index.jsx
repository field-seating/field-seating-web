import { useCallback, useContext } from 'react';
import { useActor } from '@xstate/react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';

import { GlobalStateContext } from 'lib/contexts/global-state';

import FunctionItem from './function-item';

const FunctionList = ({ isAdmin }) => {
  const { authService } = useContext(GlobalStateContext);
  const [, sendToAuthService] = useActor(authService);

  const logout = useCallback(() => {
    sendToAuthService('LOGOUT');
  }, [sendToAuthService]);

  return (
    <Box display="flex" flexDir="column">
      <FunctionItem href="/profile/info">個人資訊</FunctionItem>
      <FunctionItem href="/profile/password-management">管理密碼</FunctionItem>
      <FunctionItem href="/privacy">隱私權條款</FunctionItem>
      {isAdmin && (
        <>
          <FunctionItem href="/admin/reports">管理回報</FunctionItem>
        </>
      )}
      <FunctionItem onClick={logout}>登出</FunctionItem>
    </Box>
  );
};

FunctionList.propTypes = {
  isAdmin: PropTypes.bool,
};

export default FunctionList;
