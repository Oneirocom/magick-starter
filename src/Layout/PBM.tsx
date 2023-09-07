import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type PBMProps = {
  classNames?: string;
  width?: number;
  height?: number;
};

const PBM = ({ classNames, width = 400, height = 100 }: PBMProps) => {
  return (
    <Link
      href="https://magickml.com/"
      target="_blank"
      className={clsx(
        "transform cursor-pointer text-white transition-all duration-300 hover:scale-105",
        classNames
      )}
    >
      <Image
        src="/images/powered-by-magick.png"
        alt="Powered by Magick"
        width={width}
        height={height}
        className="max-w-[300px] object-contain md:max-w-md"
      />
    </Link>
  );
};

export default PBM;
