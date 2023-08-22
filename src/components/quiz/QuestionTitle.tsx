import Typewriter from "../shared/TypeWriter";

interface QuestionTitleProps {
  title: string;
}

const QuestionTitle: React.FC<QuestionTitleProps> = ({ title }) => {
  return (
    <Typewriter
      className="mb-4 animate-text bg-gradient-to-r from-secondary-highlight via-primary-main to-secondary-main bg-clip-text pb-2 text-3xl font-semibold text-transparent"
      text={title}
    />
  );
};

export default QuestionTitle;
