import Image from "next/image";
import Link from "next/link";

type Props = {};

const PBM = (props: Props) => {
  return (
    <Link
      href="https://magickml.com/"
      className="absolute bottom-4 right-4 text-white hover:scale-105 transition-all duration-300"
    >
      <Image
        src="/images/powered-by-magick.png"
        alt="Powered by Magick"
        width={400}
        height={100}
        className="object-contain"
      />
    </Link>
  );
};

export default PBM;
