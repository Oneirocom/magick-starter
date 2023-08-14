import { useRouter } from "next/router";
import LayoutHeader from "./LayoutHeader";
import LayoutMain from "./LayoutMain";
import LayoutNav from "./LayoutNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <>
      <LayoutNav />
      <div className="min-h-full">
        <LayoutHeader title={router.asPath.replace("/", "")} />
        <LayoutMain>{children}</LayoutMain>
      </div>
    </>
  );
};

export default Layout;
