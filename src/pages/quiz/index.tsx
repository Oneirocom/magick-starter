import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Layout from "~/components/newlayout/Layout";
import Quiz from "~/components/quiz/Quiz";
import QuizContainer from "~/components/quiz/QuizContainer";

export default function quizPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <QuizContainer>
      <Quiz />
    </QuizContainer>
  );
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
