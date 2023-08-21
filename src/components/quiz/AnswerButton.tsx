interface OptionButtonProps {
  option: string;
  handleAnswer: (option: string) => void;
  isCorrectAnswer: boolean;
  isAnswered: boolean;
  isSelected: boolean;
}

const AnswerButton: React.FC<OptionButtonProps> = ({
  option,
  handleAnswer,
  isCorrectAnswer,
  isAnswered,
  isSelected,
}) => {
  let classNames =
    "mb-2 block w-full rounded-md border py-2 transition-all duration-300 hover:scale-105 text-lg";

  if (isAnswered && isCorrectAnswer) {
    classNames += " border-green-500 font-bold text-white";
  } else {
    classNames += " border-secondary-highlight text-white";
  }

  if (isSelected && !isCorrectAnswer && isAnswered) {
    classNames += " bg-red-600 font-bold text-white";
  }

  if (isAnswered) {
    classNames += " pointer-events-none";
  } else {
    classNames +=
      " hover:border-secondary-highlight hover:bg-secondary-highlight/25 font-medium text-white";
  }

  return (
    <button className={classNames} onClick={() => handleAnswer(option)}>
      {option}
    </button>
  );
};

export default AnswerButton;
