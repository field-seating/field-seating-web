import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
//import { inspect } from '@xstate/inspect';

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
      <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
    </ChakraProvider>
  );
}

export default MyApp;
