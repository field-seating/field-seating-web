import { useEffect, useContext } from 'react';
import { useSelector, useActor } from '@xstate/react';
import Router from 'next/router';

import { GlobalStateContext } from 'lib/contexts/globalState';

const matchInit = (state) => state.matches('init');

const matchLogin = (state) => state.matches('login');
const matchAnonymous = (state) => state.matches('anonymous');

const useAuth = (redirectTo = '/', needLoggedIn = true) => {
  const { authService } = useContext(GlobalStateContext);
  const [, sendToAuthService] = useActor(authService);

  const isInit = useSelector(authService, matchInit);

  const isLoggedIn = useSelector(authService, matchLogin);
  const isAnonymous = useSelector(authService, matchAnonymous);
  const isReady = isLoggedIn || isAnonymous;

  useEffect(() => {
    if (isInit) {
      console.log('Send SIGNIN');
      sendToAuthService('SIGNIN');
    }
  }, [sendToAuthService, isInit]);

  useEffect(() => {
    if (!isReady) return;

    const shouldRedirect =
      (needLoggedIn && isAnonymous) || (!needLoggedIn && isLoggedIn);

    if (shouldRedirect) {
      Router.push(redirectTo);
    }
  }, [needLoggedIn, redirectTo, isLoggedIn, isAnonymous, isReady]);

  return { isReady };
};

export default useAuth;
