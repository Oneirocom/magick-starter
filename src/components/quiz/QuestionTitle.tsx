interface QuestionTitleProps {
  title: string;
}

const QuestionTitle: React.FC<QuestionTitleProps> = ({ title }) => {
  return (
    <p className="animate-text mb-4 bg-gradient-to-r from-purple-700 via-purple-400 to-purple-700 bg-clip-text text-2xl font-semibold text-transparent">
      {title}
    </p>
  );
};

export default QuestionTitle;
