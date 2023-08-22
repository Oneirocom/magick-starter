import Layout from "~/components/Layout/Layout";
import { motion } from "framer-motion";
import FormControl from "~/components/shared/FormControl";
import ImageSettings from "~/components/Image/ImageSettings";
import ImageSide from "~/components/Image/ImageSide";
import FormTextArea from "~/components/shared/FormTextArea";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import {
  promptAtom,
  imageSettingsOpenAtom,
  imageResultsAtom,
  imageAtom,
} from "~/atoms/image";
import { useAtom } from "jotai";
import ImageThumbs from "~/components/Image/ImageThumbs";
import ImageView from "~/components/Image/ImageView";
import { api } from "~/utils/api";

export default function ImageGeneration() {
  const [settingsOpen, setSettingsOpen] = useAtom(imageSettingsOpenAtom);
  const [prompt, setPrompt] = useAtom(promptAtom);
  const [imageResults, setImageResults] = useAtom(imageResultsAtom);
  const [imageSettings, setImageSettings] = useAtom(imageAtom);

  const {
    mutateAsync: generateImage,
    isLoading,
    error,
  } = api.image.generateImages.useMutation();

  const handleSubmit = async () => {
    const images = await generateImage(imageSettings);
    console.log(images);
    setImageResults((prev) => [...prev, ...images]);
  };

  return (
    <>
      {/* Side Section */}
      <ImageSide open={settingsOpen} setOpen={setSettingsOpen}>
        <ImageSettings />
      </ImageSide>

      {/* Main Section */}
      <motion.div
        key="image-generation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative min-h-[320px] w-full max-w-[300px] rounded-lg border border-secondary-highlight bg-card-main/50 p-8 shadow-md backdrop-blur-2xl md:mt-4 md:max-w-4xl"
      >
        {/* Settings Button */}
        <button
          className="magick-button absolute right-2 top-2"
          onClick={() => setSettingsOpen(!settingsOpen)}
        >
          <Cog6ToothIcon className="h-5 w-5" /> Settings
        </button>

        {/* Main Image */}
        <ImageView />

        {/* Image Thumbnail selectors */}
        <ImageThumbs />

        {/* Prompt Form */}
        <FormControl onSubmit={handleSubmit} isLoading={isLoading}>
          <FormTextArea
            label="Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a prompt..."
            rows={2}
          />
        </FormControl>
      </motion.div>
    </>
  );
}

ImageGeneration.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
