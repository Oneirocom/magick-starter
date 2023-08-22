import { atomWithReset } from "jotai/utils";
import { Question } from "~/server/api/routers/quiz";

export const currentQuestionAtom = atomWithReset(0);
export const scoreAtom = atomWithReset(0);
export const quizStateAtom = atomWithReset(0);
export const quizDataAtom = atomWithReset<Question[]>([]);
