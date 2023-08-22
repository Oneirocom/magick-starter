import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { ImageGenerationResults } from "~/atoms/image";

export type ImageGenerationForm = {
  prompt: string;
  negative_prompt: string;
  width: number;
  height: number;
  num_outputs: number;
  scheduler: string;
  num_inference_steps: number;
  guidance_scale: string;
  seed: number;
  refine: string;
  high_noise_frac: string;
  refine_steps: number;
};

export const imageRouter = createTRPCRouter({
  generateImages: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        negative_prompt: z.string(),
        width: z.number(),
        height: z.number(),
        num_outputs: z.number(),
        scheduler: z.string(),
        num_inference_steps: z.number(),
        guidance_scale: z.string(),
        seed: z.number(),
        refine: z.string(),
        high_noise_frac: z.string(),
        refine_steps: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newInputs = {
        ...input,
        guidance_scale: parseFloat(input.guidance_scale),
        high_noise_frac:
          input.refine === "expert"
            ? parseFloat(input.high_noise_frac)
            : undefined,
        refine_steps: input.refine !== "none" ? input.refine_steps : undefined,
      };

      const result = await fetch(
        `${
          process.env.MAGICK_URL
        }/api/?apiKey=8b43b268927e42121d38b0f7e4b3d464&agentId=25a2c6fa-d934-4b5e-b5ff-3d55c135288e&content=${encodeURIComponent(
          JSON.stringify(newInputs)
        )}`
      );

      console.log("fetched image");
      const imageJson = await result.json();
      console.log(imageJson);

      // Get the string representation from "Output - REST API"
      const imageString: string =
        imageJson?.result?.["Output - REST API (Response)"];
      if (!imageJson) {
        throw new Error("Failed to get image string data");
      }

      // Parse the string to get the Quiz object
      const imageData: ImageGenerationResults = JSON.parse(imageString);
      console.log(imageData);
      return imageData;
    }),
});
