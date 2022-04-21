import { useEffect, useContext } from 'react';
import { useSelector, useActor } from '@xstate/react';
import Router from 'next/router';
import { isNil } from 'ramda';

import { GlobalStateContext } from 'lib/contexts/globalState';

const matchInit = (state) => state.matches('init');

const matchLogin = (state) => state.matches('login');
const matchAnonymous = (state) => state.matches('anonymous');

const checkReadyToRedirect = (state) =>
  state.matches('login') || state.matches('anonymous');

const useAuth = (redirectTo = null, needLoggedIn = true) => {
  const { authService } = useContext(GlobalStateContext);
  const [, sendToAuthService] = useActor(authService);

  const isLoggedIn = useSelector(authService, matchLogin);
  const isInit = useSelector(authService, matchInit);
  const isReady = useSelector(authService, checkReadyToRedirect);
  const isAnonymous = useSelector(authService, matchAnonymous);

  useEffect(() => {
    if (isInit) {
      console.log('Send SIGNIN');
      sendToAuthService('SIGNIN');
    }
  }, [sendToAuthService, isInit]);

  useEffect(() => {
    if (isNil(redirectTo)) return;
    if (!isReady) return;

    if (needLoggedIn && isAnonymous) {
      Router.push(redirectTo);
      return;
    }

    if (!needLoggedIn && isLoggedIn) {
      Router.push(redirectTo);
      return;
    }
  }, [needLoggedIn, redirectTo, isLoggedIn, isAnonymous, isReady]);

  return { isReady };
};

export default useAuth;
