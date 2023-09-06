import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Layout from "~/components/Layout/Layout";
import Quiz from "~/components/quiz/Quiz";

export default function quizPage() {
  return <Quiz />;
}

quizPage.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};


