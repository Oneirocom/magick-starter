import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps, type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Provider } from "jotai";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextPage } from "next";

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session: Session | null;
};

const App = ({ Component, pageProps, session }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ||
    function (page) {
      return <>{page}</>;
    };

  return (
    <SessionProvider session={session}>
      <Provider>{getLayout(<Component {...pageProps} />)}</Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </SessionProvider>
  );
};

export default api.withTRPC(App);
