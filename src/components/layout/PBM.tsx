import Image from "next/image";
import Link from "next/link";

type Props = {};

const PBM = (props: Props) => {
  return (
    <Link
      href="https://magickml.com/"
      target="_blank"
      className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 transform cursor-pointer
      
      text-white transition-all duration-300 hover:scale-105"
    >
      <Image
        src="/images/powered-by-magick.png"
        alt="Powered by Magick"
        width={400}
        height={100}
        className="max-w-[300px] object-contain md:max-w-md"
      />
    </Link>
  );
};

export default PBM;
