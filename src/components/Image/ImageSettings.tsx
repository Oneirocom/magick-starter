import React from "react";
import FormInput from "../shared/FormInput";
import FormSelect from "../shared/FormSelect";
import { refinerOptions } from "~/config/image";
import FormTextArea from "../shared/FormTextArea";
import {
  negativePromptAtom,
  widthAtom,
  heightAtom,
  numOutputsAtom,
  schedulerAtom,
  numInferenceStepsAtom,
  guidanceScaleAtom,
  seedAtom,
  refineAtom,
  highNoiseFracAtom,
  refineStepsAtom,
} from "~/atoms/image";
import { useAtom } from "jotai";

const ImageSettings = () => {
  const [negativePrompt, setNegativePrompt] = useAtom(negativePromptAtom);
  const [width, setWidth] = useAtom(widthAtom);
  const [height, setHeight] = useAtom(heightAtom);
  const [numOutputs, setNumOutputs] = useAtom(numOutputsAtom);
  const [scheduler, setScheduler] = useAtom(schedulerAtom);
  const [numInferenceSteps, setNumInferenceSteps] = useAtom(
    numInferenceStepsAtom
  );
  const [guidanceScale, setGuidanceScale] = useAtom(guidanceScaleAtom);
  const [seed, setSeed] = useAtom(seedAtom);
  const [refine, setRefine] = useAtom(refineAtom);
  const [highNoiseFrac, setHighNoiseFrac] = useAtom(highNoiseFracAtom);
  const [refineSteps, setRefineSteps] = useAtom(refineStepsAtom);

  return (
    <>
      {/* Negative Prompt */}
      <FormTextArea
        label="Negative Prompt"
        placeholder="Enter a negative prompt..."
        value={negativePrompt}
        onChange={(e) => setNegativePrompt(e.target.value)}
      />

      {/* Width */}
      <FormInput
        label="Width"
        type="number"
        value={width.toString()}
        onChange={(e) => setWidth(parseFloat(e.target.value))}
      />

      {/* Height */}
      <FormInput
        label="Height"
        type="number"
        value={height.toString()}
        onChange={(e) => setHeight(parseFloat(e.target.value))}
      />

      {/*  Number of images */}
      <FormInput
        label="Number of Images"
        type="number"
        value={numOutputs.toString()}
        onChange={(e) => setNumOutputs(parseFloat(e.target.value))}
      />

      {/* Inference steps */}
      <FormInput
        label="Inference Steps"
        type="number"
        value={numInferenceSteps.toString()}
        onChange={(e) => setNumInferenceSteps(parseFloat(e.target.value))}
      />

      {/* Guidance Scale*/}
      <FormInput
        label="Guidance Scale"
        type="text"
        value={guidanceScale}
        onChange={(e) => setGuidanceScale(e.target.value)}
      />

      {/* Seed */}
      <FormInput
        label="Seed"
        type="number"
        value={seed.toString()}
        onChange={(e) => setSeed(parseFloat(e.target.value))}
      />

      {/* Refine dropdwon */}
      <FormSelect
        label="Refiner"
        value={refine}
        onChange={(e) => setRefine(e.target.value)}
        options={refinerOptions}
      />

      {/* High Noise Fraction */}
      <FormInput
        label="High Noise Fraction"
        type="number"
        value={highNoiseFrac}
        onChange={(e) => setHighNoiseFrac(e.target.value)}
      />

      {/* Refiner Steps */}
      <FormInput
        label="Refiner Steps"
        type="number"
        value={refineSteps.toString()}
        onChange={(e) => setRefineSteps(parseFloat(e.target.value))}
      />
    </>
  );
};

export default ImageSettings;
