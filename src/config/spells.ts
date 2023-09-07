import { JSONObject } from "superjson/dist/types";
import quizSpell from "./spellGraphs/quizv3.spell.json";

export type Spell = {
  name: string;
  description: string;
  graph: JSONObject;
  image: string;
};

export const spells: Spell[] = [
  {
    name: "Quiz Generator",
    description:
      "This spell generates a quiz based on a topic you provide using the typechat node. It uses the REST agent connector to run your spell and takes in prompt and a model as inputs.",
    graph: quizSpell,
    image: '/images/spells/quiz.png'
  },
];
