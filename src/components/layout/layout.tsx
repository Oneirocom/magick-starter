import { useRouter } from "next/router";
import LayoutNav from "./LayoutNav";
import PBM from "./PBM";
import Scene from "./Scene";
import LayoutMain from "./LayoutMain";
import { AnimatePresence } from "framer-motion";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div className="overflow-hidden">
      <LayoutNav />
      <div className="min-h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <LayoutMain key={router.asPath}>{children}</LayoutMain>
        </AnimatePresence>
        <PBM />
        <Scene />
      </div>
    </div>
  );
};

