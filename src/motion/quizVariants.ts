import { Variants } from "framer-motion";

export const questionVariants: Variants = {
  initial: { x: "100%", opacity: 0, scale: 0.5 },
  animate: { x: 0, opacity: 1, scale: 1 },
  exit: { x: "-100%", opacity: 0, scale: 0.5 },
};

export const resultVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: [0, -5, 5, -5, 0],
  },
  exit: { opacity: 0, scale: 0.5 },
};
