import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import {
  currentQuestionAtom,
  scoreAtom,
  quizStateAtom,
  quizDataAtom,
} from "~/atoms/quiz";
import { questionVariants } from "~/motion/quizVariants";
import QuestionTitle from "./QuestionTitle";
import AnswerButton from "./AnswerButton";
import QuizScore from "./QuizScore";

import { api } from "~/utils/api";
import { useState } from "react";
import Divider from "../shared/Divider";
import ViewSpell from "../shared/ViewSpell";
import { spells } from "~/config/spells";

const Quiz: React.FC = () => {
  const {
    mutateAsync: getQuiz,
    isLoading: isQuizLoading,
    isError: isQuizError,
    error: quizError,
  } = api.quiz.getQuiz.useMutation();
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("");
  const [quizState, setQuizState] = useAtom(quizStateAtom);
  const [quizData, setQuizData] = useAtom(quizDataAtom);

  const handleGetQuiz = async () => {
    try {
      const data = await getQuiz({ prompt, model });
      setQuizData(data.quizData);
      setQuizState(1);
    } catch (error) {
      console.log(error);
    }
  };

  const [currentQuestion, setCurrentQuestion] = useAtom(currentQuestionAtom);
  const [score, setScore] = useAtom(scoreAtom);
  const currentQuiz = quizData[currentQuestion];

  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswer = (selectedAnswer: string) => {
    setSelectedAnswer(selectedAnswer);
    if (selectedAnswer === currentQuiz?.answer) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const handleContinue = () => {
    setShowAnswer(false);
    setSelectedAnswer(null);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizState(2);
      setCurrentQuestion(0);
    }
  };

  const totalQuestions = quizData.length;
  const isLowScore = score <= totalQuestions / 2;

  // Determine the rotate value based on the score
  const rotateValue = isLowScore ? [0, -5, 5, -5, 0] : 0;
  const scaleValue = !isLowScore ? [1, 1.2, 1, 1.2, 1] : 1;

  const animateProps = {
    opacity: 1,
    scale: scaleValue,
    rotate: rotateValue,
  };

  const handleRestart = () => {
    setQuizState(0);
    setPrompt("");
    setScore(0);
    setQuizData([]);
  };

  return (
    <AnimatePresence mode="wait">
      {quizState === 0 && (
        <motion.form
          key="quiz-form relative"
          {...questionVariants}
          className="styled-card"
          onClick={(e) => e.preventDefault()}
        >
          <ViewSpell {...spells[0]} />
          <label
            htmlFor="model"
            className="block text-sm font-medium leading-6 text-white"
          >
            Model
          </label>
          <select
            id="model"
            name="model"
            className="mb-4 w-full rounded-md bg-secondary-highlight/50 p-2 text-white placeholder:text-white/70"
            defaultValue="gpt-3.5"
            onChange={(e) => setModel(e.target.value)}
          >
            <option>gpt-3.5</option>
            <option>gpt-4</option>
          </select>
          <label
            htmlFor="prompt"
            className="block text-sm font-medium leading-6 text-white"
          >
            Topic
          </label>
          <input
            id="prompt"
            name="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mb-4 w-full rounded-md bg-secondary-highlight/50 p-2 text-white placeholder:text-white/70"
            placeholder="Enter a topic for your quiz..."
          />

          <button
            type="submit"
            className="mb-2 flex w-full flex-row flex-nowrap items-center justify-center rounded-md border border-secondary-highlight py-2 text-white transition-all duration-300 hover:scale-105 hover:border-secondary-highlight hover:bg-secondary-highlight/25 disabled:pointer-events-none disabled:border-opacity-50 disabled:text-white"
            onClick={handleGetQuiz}
            disabled={isQuizLoading || prompt.length === 0}
          >
            {isQuizLoading && (
              <span className="loading loading-spinner loading-md mr-2" />
            )}

            {isQuizLoading
              ? "Loading..."
              : prompt.length === 0
              ? "Enter a topic above to start"
              : "Start Quiz"}
          </button>
        </motion.form>
      )}

      {quizState === 1 && (
        <motion.div
          key={`question-${currentQuestion}`}
          {...questionVariants}
          className="styled-card"
        >
          <QuizScore
            currentQuestion={currentQuestion}
            quizDataLength={totalQuestions}
          />

          <QuestionTitle title={currentQuiz?.question || "Error"} />
          <Divider />
          {currentQuiz?.options.map((option, index) => (
            <AnswerButton
              key={index}
              option={option}
              handleAnswer={handleAnswer}
              isCorrectAnswer={option === currentQuiz.answer}
              isAnswered={showAnswer}
              isSelected={option === selectedAnswer}
            />
          ))}
          {showAnswer && (
            <button
              className="mb-2 mt-8 flex w-full flex-row flex-nowrap items-center justify-center rounded-md border bg-secondary-highlight py-2 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-secondary-main"
              onClick={handleContinue}
            >
              Continue
            </button>
          )}
        </motion.div>
      )}

      {quizState === 2 && (
        <motion.div
          key="quiz-results"
          initial={{ opacity: 0, scale: isLowScore ? 0.8 : 1.2 }}
          animate={animateProps}
          exit={{ opacity: 0, scale: 0.5 }}
          className="styled-card"
        >
          <QuestionTitle
            title={`You scored ${score} out of ${totalQuestions}`}
          />

          <div className="flex flex-col items-center">
            {/* <button
                className="mb-2 flex w-full flex-row flex-nowrap items-center justify-center rounded-md border border-secondary-highlight py-2 text-white transition-all duration-300 hover:scale-105 hover:border-secondary-highlight hover:bg-secondary-highlight/25 disabled:pointer-events-none disabled:opacity-50"
                onClick={() => alert("woweeeee")}
              >
                Continue this Quiz
              </button> */}
            <button
              className="mb-2 flex w-full flex-row flex-nowrap items-center justify-center rounded-md border border-secondary-highlight py-2 text-white transition-all duration-300 hover:scale-105 hover:border-secondary-highlight hover:bg-secondary-highlight/25 disabled:pointer-events-none disabled:opacity-50"
              onClick={handleRestart}
            >
              New Quiz
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Quiz;
