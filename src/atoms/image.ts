import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

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

export type ImageGenerationResults = string[];

export const imageAtom = atomWithReset<ImageGenerationForm>({
  prompt: "",
  negative_prompt: "",
  width: 1024,
  height: 1024,
  num_outputs: 2,
  scheduler: "DDIM",
  num_inference_steps: 50,
  guidance_scale: "7.5",
  seed: -1,
  refine: "expert",
  high_noise_frac: "0.8",
  refine_steps: 50,
});

export const promptAtom = atom(
  (get) => get(imageAtom).prompt,
  (get, set, newPromptValue: string) => {
    const currentImage = get(imageAtom);
    set(imageAtom, {
      ...currentImage,
      prompt: newPromptValue,
    });
  }
);

export const negativePromptAtom = atom(
  (get) => get(imageAtom).negative_prompt,
  (get, set, newNegativePromptValue: string) => {
    const currentImage = get(imageAtom);
    set(imageAtom, {
      ...currentImage,
      negative_prompt: newNegativePromptValue,
    });
  }
);

export const widthAtom = atom(
  (get) => get(imageAtom).width,
  (get, set, newWidthValue: number) => {
    const currentImage = get(imageAtom);
    set(imageAtom, {
      ...currentImage,
      width: newWidthValue,
    });
  }
);

export const heightAtom = atom(
  (get) => get(imageAtom).height,
  (get, set, newHeightValue: number) => {
    const currentImage = get(imageAtom);
    set(imageAtom, {
      ...currentImage,
      height: newHeightValue,
    });
  }
);

export const numOutputsAtom = atom(
  (get) => get(imageAtom).num_outputs,
  (get, set, newNumOutputsValue: number) => {
    const currentImage = get(imageAtom);
    set(imageAtom, {
      ...currentImage,
      num_outputs: newNumOutputsValue,
    });
  }
);

export const schedulerAtom = atom(
  (get) => get(imageAtom).scheduler,
  (get, set, newSchedulerValue: string) => {
    const currentImage = get(imageAtom);
    set(imageAtom, {
      ...currentImage,
      scheduler: newSchedulerValue,
    });
  }
);

export const numInferenceStepsAtom = atom(
  (get) => get(imageAtom).num_inference_steps,
  (get, set, newNumInferenceStepsValue: number) => {
    const currentImage = get(imageAtom);
    set(imageAtom, {
      ...currentImage,
      num_inference_steps: newNumInferenceStepsValue,
    });
  }
);

export const guidanceScaleAtom = atom(
  (get) => get(imageAtom).guidance_scale,
  (get, set, newGuidanceScaleValue: string) => {
    const currentImage = get(imageAtom);
    set(imageAtom, {
      ...currentImage,
      guidance_scale: newGuidanceScaleValue,
    });
  }
);

export const seedAtom = atom(
  (get) => get(imageAtom).seed,
  (get, set, newSeedValue: number) => {
    const currentImage = get(imageAtom);
    set(imageAtom, {
      ...currentImage,
      seed: newSeedValue,
    });
  }
);

export const refineAtom = atom(
  (get) => get(imageAtom).refine,
  (get, set, newRefineValue: string) => {
    const currentImage = get(imageAtom);
    set(imageAtom, {
      ...currentImage,
      refine: newRefineValue,
    });
  }
);

export const highNoiseFracAtom = atom(
  (get) => get(imageAtom).high_noise_frac,
  (get, set, newHighNoiseFracValue: string) => {
    const currentImage = get(imageAtom);
    set(imageAtom, {
      ...currentImage,
      high_noise_frac: newHighNoiseFracValue,
    });
  }
);

export const refineStepsAtom = atom(
  (get) => get(imageAtom).refine_steps,
  (get, set, newRefineStepsValue: number) => {
    const currentImage = get(imageAtom);
    set(imageAtom, {
      ...currentImage,
      refine_steps: newRefineStepsValue,
    });
  }
);

export const imageResultsAtom = atomWithReset<ImageGenerationResults>([]);

export const selectedImageIndexAtom = atomWithReset(0);

export const imageSettingsOpenAtom = atomWithReset(false);
