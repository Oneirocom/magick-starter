import { Variants } from "framer-motion";

export const heroTextVariants = (delay: number): Variants => ({
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0, transition: { delay } },
  exit: { opacity: 0, y: 0 },
});
