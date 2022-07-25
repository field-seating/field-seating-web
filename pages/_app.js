import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { inspect } from '@xstate/inspect';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';
import Script from 'next/script';
import NProgress from 'nprogress';

import { GlobalStateProvider } from 'lib/contexts/global-state';
import AppLayout from 'components/layout/app-layout';
import theme from 'lib/theme/customTheme';

import 'styles/nprogress.css';
import 'styles/app.css';

const appHeightFix = () => {
  if (typeof window !== 'undefined') {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    window.addEventListener('resize', appHeight);

    appHeight();
  }
};

appHeightFix();

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  inspect({
    iframe: false, // open in new window
  });
}

function MyApp({ Component, pageProps }) {
  const Router = useRouter();
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteDone);
    Router.events.on('routeChangeError', handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteDone);
      Router.events.off('routeChangeError', handleRouteDone);
    };
  }, [Router]);

  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;

  return (
    <SWRConfig
      value={{
        revalidateOnReconnect: true,
      }}
    >
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <ChakraProvider theme={theme}>
        <GlobalStateProvider>
          <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
        </GlobalStateProvider>
      </ChakraProvider>
    </SWRConfig>
  );
}

export default MyApp;
