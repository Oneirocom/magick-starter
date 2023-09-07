import { useRouter } from "next/router";
import LayoutNav from "./LayoutNav";
import PBM from "./PBM";
import Scene from "./Scene";
import LayoutMain from "./LayoutMain";
import { AnimatePresence } from "framer-motion";

type LayoutProps = {
  children: React.ReactNode;
  bg: boolean;
};

export const Layout = ({ children, bg = true }: LayoutProps) => {
  const router = useRouter();
  return (
    <div className="overflow-hidden">
      <LayoutNav />
      <div className="min-h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <LayoutMain key={router.asPath}>{children}</LayoutMain>
        </AnimatePresence>
        <PBM classNames="hidden md:block absolute bottom-12 left-1/2 z-[5] -translate-x-1/2 translate-y-1/2" />
        {bg && <Scene />}
      </div>
    </div>
  );
};
