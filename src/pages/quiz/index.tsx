import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Quiz from "~/components/quiz/Quiz";
import QuizContainer from "~/components/quiz/QuizContainer";

export default function indexPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <QuizContainer>
      <Quiz />
    </QuizContainer>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      data: "",
    },
  };
}
