import { useState, useEffect } from "react";

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

type TypewriterProps = {
  text: string;
  delay?: number;
  infinite?: boolean;
  className?: string;
};

const Typewriter = ({
  text,
  delay = 25,
  infinite = false,
  className = "",
}: TypewriterProps) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    } else if (infinite) {
      setCurrentIndex(0);
      setCurrentText("");
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);

  return <span className={className}>{currentText}</span>;
};

export default QuestionTitle;
