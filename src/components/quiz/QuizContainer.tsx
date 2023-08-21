type QuizContainerProps = {
  children: React.ReactNode;
};

const QuizContainer = ({ children }: QuizContainerProps) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-black/70 to-black/60 via-black/59">
      {children}
    </div>
  );
};

export default QuizContainer;
