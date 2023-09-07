import { Layout } from "~/Layout/Layout";
import Quiz from "../components/quiz/Quiz";

export default function quizPage() {
  return <Quiz />;
}

quizPage.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
