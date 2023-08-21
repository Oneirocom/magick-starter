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
    "mb-2 block w-full rounded-md border py-2 transition-all duration-300 hover:scale-105";

  if (isAnswered && isCorrectAnswer) {
    classNames += " border-green-500";
  } else {
    classNames += " border-purple-600";
  }

  if (isSelected && !isCorrectAnswer && isAnswered) {
    classNames += " bg-red-600";
  }

  if (isAnswered) {
    classNames += " pointer-events-none";
  } else {
    classNames += " hover:border-purple-500 hover:bg-purple-600/25";
  }

  return (
    <button className={classNames} onClick={() => handleAnswer(option)}>
      <span className="text-lg font-medium text-white">{option}</span>
    </button>
  );
};

export default AnswerButton;
