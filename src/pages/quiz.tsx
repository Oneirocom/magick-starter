import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Layout from "~/components/Layout/Layout";
import Quiz from "~/components/quiz/Quiz";

export default function quizPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <Quiz />;
}

quizPage.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      data: "",
    },
  };
}
