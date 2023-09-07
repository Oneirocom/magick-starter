import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export type Question = {
  question: string; // the unique question based on the users topic
  options: string[]; // unique options for each question
  answer: string; // the correct answer for each question
};

export interface IQuiz {
  quizData: Question[];
}

export const quizRouter = createTRPCRouter({
  getQuiz: publicProcedure
    .input(
      z.object({
        prompt: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log(input);

      const content = {
        prompt: input.prompt || "magick",
        model: "gpt",
      };

      const result = await fetch("https://magick-dev.herokuapp.com/api", {
        method: "POST",
        headers: {
          Authorization: "4add7a98b626c0bccc3a9ed32161de60",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: JSON.stringify(content),
          agentId: "f16663ef-10b4-4e22-a0c1-c6b6dc0e3eef",
        }),
      });

      // const result = await fetch(
      //   `${
      //     process.env.MAGICK_URL
      // }/api/?apiKey=0d1dcec0ce1667a7b8b113630b09fc90&agentId=b5bc97b8-73de-4188-b441-4f635a32df56&content=${encodeURIComponent(
      //   input.prompt || ""
      // )}`
      // );
      console.log("fetched quiz");
      const quizJson = await result.json();
      console.log(quizJson);

      // Get the string representation from "Output - Default"
      const quizString: string =
        quizJson?.result?.["Output - REST API (Response)"];
      if (!quizString) {
        throw new Error("Failed to get quiz string data");
      }

      // Parse the string to get the Quiz object
      const quizData: IQuiz = JSON.parse(quizString);
      console.log(quizData);
      return quizData;
    }),
});
