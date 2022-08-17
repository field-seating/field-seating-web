import { useEffect, useContext } from 'react';
import { useSelector } from '@xstate/react';
import Router from 'next/router';
import { isNil } from 'ramda';

import { GlobalStateContext } from 'lib/contexts/global-state';
import {
  selectInit,
  selectLogin,
  selectAnonymous,
  selectLoginActive,
  selectLoginAdmin,
  selectLoginInactive,
} from 'lib/machines/auth';

export const AUTH_TYPE = {
  ANONYMOUS: 'ANONYMOUS',
  LOGIN: 'LOGIN',
  ACTIVE: 'ACTIVE',
  ADMIN: 'ADMIN',
};

const fitFuncMap = {
  [AUTH_TYPE.ANONYMOUS]: (context) => context.isAnonymous,
  [AUTH_TYPE.LOGIN]: (context) => context.isLoggedIn,
  [AUTH_TYPE.ACTIVE]: (context) => context.isActive,
  [AUTH_TYPE.ADMIN]: (context) => context.isAdmin,
};

const useAuth = (redirectTo = null, needAuthType = AUTH_TYPE.LOGIN) => {
  const { authService } = useContext(GlobalStateContext);
  const { send: sendToAuthService } = authService;

  const isInit = useSelector(authService, selectInit);

  const isLoggedIn = useSelector(authService, selectLogin);
  const isAnonymous = useSelector(authService, selectAnonymous);
  const isActive = useSelector(authService, selectLoginActive);
  const isInactive = useSelector(authService, selectLoginInactive);
  const isAdmin = useSelector(authService, selectLoginAdmin);

  const isReady = isLoggedIn || isAnonymous;

  useEffect(() => {
    if (isInit) {
      sendToAuthService('SIGNIN');
    }
  }, [sendToAuthService, isInit]);

  const fitFunc = fitFuncMap[needAuthType];
  const context = {
    isReady,
    isActive,
    isLoggedIn,
    isAnonymous,
    isAdmin,
    isInactive,
  };

  const fitAuthType = fitFunc(context);

  useEffect(() => {
    if (!isReady) return;

    const shouldRedirect = !fitAuthType && !isNil(redirectTo);

    if (shouldRedirect) {
      Router.push(redirectTo);
    }
  }, [redirectTo, fitAuthType, isReady]);

  return context;
};

export default useAuth;
