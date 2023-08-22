import React from "react";

type QuizScoreProps = {
  currentQuestion: number;
  quizDataLength: number;
};

const QuizScore = ({ currentQuestion, quizDataLength }: QuizScoreProps) => {
  return (
    <div className="text-right text-white">
      {currentQuestion !== -1 &&
        `Question: ${currentQuestion + 1}/${quizDataLength}`}
    </div>
  );
};

export default QuizScore;
