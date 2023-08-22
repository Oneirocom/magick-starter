import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps, type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Provider } from "jotai";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useResetAtom } from "jotai/utils";
import {
  currentQuestionAtom,
  scoreAtom,
  quizStateAtom,
  quizDataAtom,
} from "~/atoms/quiz";

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

  // const router = useRouter();
  // const resetQuiz = useResetAtom(quizStateAtom);
  // const resetCurrentQuestion = useResetAtom(currentQuestionAtom);
  // const resetScore = useResetAtom(scoreAtom);
  // const resetQuizData = useResetAtom(quizDataAtom);

  // const handleQuizReset = () => {
  //   resetQuiz();
  //   resetCurrentQuestion();
  //   resetScore();
  //   resetQuizData();
  // };

  // useEffect(() => {
  //   if (router.asPath === "/quiz") {
  //     handleQuizReset();
  //   }
  // }, [router.asPath]);

  return (
    <SessionProvider session={session}>
      <Provider>{getLayout(<Component {...pageProps} />)}</Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </SessionProvider>
  );
};

export default api.withTRPC(App);
