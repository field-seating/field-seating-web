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
} from 'lib/machines/auth';

const useAuth = (redirectTo = null, needLoggedIn = true) => {
  const { authService } = useContext(GlobalStateContext);
  const [, sendToAuthService] = useActor(authService);

  const isInit = useSelector(authService, selectInit);

  const isLoggedIn = useSelector(authService, selectLogin);
  const isAnonymous = useSelector(authService, selectAnonymous);
  const isActive = useSelector(authService, selectLoginActive);
  const isReady = isLoggedIn || isAnonymous;

  useEffect(() => {
    if (isInit) {
      sendToAuthService('SIGNIN');
    }
  }, [sendToAuthService, isInit]);

  useEffect(() => {
    if (!isReady) return;

    const shouldRedirect =
      (!isNil(redirectTo) && needLoggedIn && isAnonymous) ||
      (!needLoggedIn && isLoggedIn);

    if (shouldRedirect) {
      Router.push(redirectTo);
    }
  }, [needLoggedIn, redirectTo, isLoggedIn, isAnonymous, isReady]);

  return { isReady, isActive, isLoggedIn, isAnonymous };
};

export default useAuth;
