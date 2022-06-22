import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { inspect } from '@xstate/inspect';
import { SWRConfig } from 'swr';

import { GlobalStateProvider } from 'lib/contexts/globalState';
import AppLayout from 'components/layout/app-layout';
import theme from 'lib/theme/customTheme';

import 'styles/app.css';

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  inspect({
    iframe: false, // open in new window
  });

  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };

  window.addEventListener('resize', appHeight);

  appHeight();
}

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SWRConfig
      value={{
        revalidateOnReconnect: true,
      }}
    >
      <ChakraProvider theme={theme}>
        <GlobalStateProvider>
          <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
        </GlobalStateProvider>
      </ChakraProvider>
    </SWRConfig>
  );
}

export default MyApp;
