// fetch('https://magick-dev.herokuapp.com/api/74227917-58a4-43a6-82ca-91b83e6ad5e2?apiKey=4c6f543e919f323156898e96db750421&content=Hello+World')

import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

interface Special {
  name: string;
  description: string;
  type: string;
  power: number;
  hitRate: number;
  manaCost: number;
  levelRequirement: number;
}

export interface Monster {
  data: {
    name: string;
    description: string;
    level: number;
    health: number;
    mana: number;
    attributes: {
      attack: number;
      defense: number;
      speed: number;
      accuracy: number;
    };
    specials: Special[];
  };
  image: string[];
}

export const enemyRouter = createTRPCRouter({
  getMonster: protectedProcedure
    .input(
      z.object({
        prompt: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log("fetching monster");
      const result = await fetch(
        `http://172.21.84.53:3030/api/?apiKey=7f50d35f816d0b81c389411fcc139ab1&agentId=b5683a6e-f618-4737-9f3d-2211b2390025&content=${encodeURIComponent(
          input.prompt || ""
        )}`
      );
      console.log("fetched monster");
      const monsterJson = await result.json();
      console.log(monsterJson);

      // Get the string representation from "Output - Default"
      const monsterString: string = monsterJson?.result?.["Output - Default"];
      if (!monsterString) {
        throw new Error("Failed to get monster string data");
      }

      // Parse the string to get the Monster object
      const monsterData: Monster = JSON.parse(monsterString);
      console.log(monsterData);
      return monsterData;
    }),
});
