import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import { Auth } from "@/components/Auth";

function MyApp({ Component, pageProps: pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export default MyApp;
