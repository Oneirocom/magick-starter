import React from "react";

type QuizScoreProps = {
  currentQuestion: number;
  quizDataLength: number;
};

const QuizScore = ({ currentQuestion, quizDataLength }: QuizScoreProps) => {
  return (
    <div className="absolute right-4 top-4 text-white">
      {currentQuestion !== -1 &&
        `Question: ${currentQuestion + 1}/${quizDataLength}`}
    </div>
  );
};

export default QuizScore;
