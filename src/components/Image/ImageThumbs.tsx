import Image from "next/image";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { selectedImageIndexAtom, imageResultsAtom } from "~/atoms/image";
import clsx from "clsx";


const ImageThumbs = () => {
  const [imageResults, setImageResults] = useAtom(imageResultsAtom);
  const imagesPerPage = 10;
  const totalPages = Math.ceil(imageResults.length / imagesPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return (
    <div>
      {imageResults.length > 0 && (
        <>
          <div className="mt-2 grid grid-cols-2 gap-x-4 md:grid-cols-10">
            {imageResults.map((url, i) => (
              <ImageThumb image={url} key={i} index={i} />
            ))}
          </div>
          <div className="mt-4 flex justify-center text-white">
            {hasPreviousPage && (
              <button
                className="magick-button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              >
                Previous
              </button>
            )}
            <span className="mx-4">
              Page {currentPage} of {totalPages}
            </span>
            {hasNextPage && (
              <button
                className="magick-button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

type ImageThumbProps = {
  index: number;
  image: string;
};

const ImageThumb = ({ index, image }: ImageThumbProps) => {
  const [selectedImage, setSelectedImage] = useAtom(selectedImageIndexAtom);

  return (
    <button
      onClick={() => setSelectedImage(index)}
      className="relative mx-auto h-[64px] w-full max-w-[64px] rounded-md"
    >
      <Image
        src={image}
        layout="fill" // Corrected from "fill" to layout="fill"
        alt="image"
        className={clsx("mx-auto rounded-md object-fill", {
          "ring-2 ring-secondary-highlight": selectedImage === index,
        })}
      />
    </button>
  );
};

export default ImageThumbs;
