import { useEffect, useContext } from 'react';
import { useSelector, useActor } from '@xstate/react';
import Router from 'next/router';
import { isNil } from 'ramda';

import { GlobalStateContext } from 'lib/contexts/global-state';
import {
  selectInit,
  selectLogin,
  selectAnonymous,
  selectLoginActive,
  selectLoginInactive,
} from 'lib/machines/auth';

export const AUTH_TYPE = {
  ANONYMOUS: 'ANONYMOUS',
  LOGIN: 'LOGIN',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ADMIN: 'ADMIN',
};

const admin = false;

const fitFuncMap = {
  [AUTH_TYPE.ANONYMOUS]: selectAnonymous,
  [AUTH_TYPE.LOGIN]: selectLogin,
  [AUTH_TYPE.ACTIVE]: selectLoginActive,
  [AUTH_TYPE.INACTIVE]: selectLoginInactive,
  [AUTH_TYPE.ADMIN]: () => admin,
};

const useAuth = (redirectTo = null, needAuthType = AUTH_TYPE.LOGIN) => {
  const { authService } = useContext(GlobalStateContext);
  const [, sendToAuthService] = useActor(authService);

  const isInit = useSelector(authService, selectInit);

  const isLoggedIn = useSelector(authService, selectLogin);
  const isAnonymous = useSelector(authService, selectAnonymous);
  const isActive = useSelector(authService, selectLoginActive);
  const isAdmin = admin;

  const isReady = isLoggedIn || isAnonymous;

  useEffect(() => {
    if (isInit) {
      sendToAuthService('SIGNIN');
    }
  }, [sendToAuthService, isInit]);

  const fitFunc = fitFuncMap[needAuthType];

  const fitAuthType = useSelector(authService, fitFunc);

  useEffect(() => {
    if (!isReady) return;

    const shouldRedirect = !fitAuthType && !isNil(redirectTo);

    if (shouldRedirect) {
      Router.push(redirectTo);
    }
  }, [redirectTo, fitAuthType, isReady]);

  return { isReady, isActive, isLoggedIn, isAnonymous, isAdmin };
};

export default useAuth;
