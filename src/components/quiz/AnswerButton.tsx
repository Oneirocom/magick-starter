interface OptionButtonProps {
  option: string;
  handleAnswer: (option: string) => void;
}

const AnswerButton: React.FC<OptionButtonProps> = ({
  option,
  handleAnswer,
}) => {
  return (
    <button
      className="mb-2 block w-full rounded-md border border-purple-600 py-2 transition-all duration-300
      hover:scale-105 hover:border-purple-500 hover:bg-purple-600/25 "
      onClick={() => handleAnswer(option)}
    >
      <span className="text-lg font-medium text-white">{option}</span>
    </button>
  );
};

export default AnswerButton;
