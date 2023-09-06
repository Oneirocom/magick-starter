import Image from "next/image";
import React from "react";
import { useAtomValue } from "jotai";
import { imageResultsAtom, selectedImageIndexAtom } from "~/atoms/image";


const ImageView = () => {
  const selectedImage = useAtomValue(selectedImageIndexAtom);
  const imageResults = useAtomValue(imageResultsAtom);
  return (
    <div className="relative mx-auto h-[256px] w-full max-w-[256px]">
      <Image
        src={imageResults[selectedImage] || "/images/logo.png"}
        fill
        alt="image"
        className="mx-auto object-contain"
      />
    </div>
  );
};

export default ImageView;
