import '@/styles/globals.css';
import Head from 'next/head';
import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import { FC, Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// International and Layout manage
import { NextIntlProvider } from 'next-intl';
type CustomNextComponent = NextComponentType & { Layout?: FC };
type CustomAppProps = AppProps & { Component: CustomNextComponent };
// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '@/context/auth/auth_provider';
import { SessionProvider } from 'next-auth/react';
// React Query Config
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 36000,
    },
  },
});
// React Quill
import 'react-quill/dist/quill.snow.css';
import 'swiper/css/bundle';
// Google Maps
import { Wrapper } from '@googlemaps/react-wrapper';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function App({ Component, pageProps }: CustomAppProps) {
  const Layout: CustomNextComponent | typeof Fragment = Component.Layout
    ? Component.Layout
    : Fragment;

  return (
    <NextIntlProvider messages={pageProps.messages}>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}
          >
            <AuthProvider>
              <Head>
                <title>CTickets</title>
                <meta
                  name="viewport"
                  content="initial-scale=1, width=device-width"
                />
              </Head>
              <Layout>
                <Wrapper
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
                  libraries={['places']}
                >
                  <ToastContainer />
                  <Component {...pageProps} />
                </Wrapper>
              </Layout>
              <ReactQueryDevtools initialIsOpen={true} />
            </AuthProvider>
          </GoogleReCaptchaProvider>
        </QueryClientProvider>
      </SessionProvider>
    </NextIntlProvider>
  );
}
