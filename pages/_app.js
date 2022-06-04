import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { inspect } from '@xstate/inspect';
import { SWRConfig } from 'swr';

import { GlobalStateProvider } from 'lib/contexts/globalState';
import AppLayout from 'components/layout/app-layout';
import theme from 'lib/theme/customTheme';
import { ImageUploadContextProvider } from 'lib/contexts/image-upload';

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  inspect({
    iframe: false, // open in new window
  });
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
          <ImageUploadContextProvider>
            <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
          </ImageUploadContextProvider>
        </GlobalStateProvider>
      </ChakraProvider>
    </SWRConfig>
  );
}

export default MyApp;
