import { useEffect, useState } from "react";

type TypewriterProps = {
  text: string;
  delay?: number;
  infinite?: boolean;
  className?: string;
  cursor?: boolean;
};

const Typewriter = ({
  text,
  delay = 25,
  infinite = false,
  className = "",
  cursor = false,
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

  return (
    <span className={className}>
      {currentText}
      {cursor && <span className="cursor">|</span>}
    </span>
  );
};

export default Typewriter;
