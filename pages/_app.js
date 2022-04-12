import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

//import { inspect } from '@xstate/inspect';
import GlobalStateContext from 'lib/contexts/globalState';
import AppLayout from 'components/layout/AppLayout';
import theme from 'lib/theme/customTheme';

//if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
//inspect({
//iframe: false, // open in new window
//});
//}

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ChakraProvider theme={theme}>
      <GlobalStateContext.Provider>
        <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
      </GlobalStateContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
