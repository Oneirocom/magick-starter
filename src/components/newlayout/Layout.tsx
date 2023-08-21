import { useRouter } from "next/router";
import LayoutHeader from "./LayoutHeader";
import LayoutMain from "./LayoutMain";
import LayoutNav from "./LayoutNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div className="">
      <LayoutNav />
      <div className="min-h-full overflow-hidden">
        {/* <LayoutHeader title={router.asPath.replace("/", "")} /> */}
        {/* <LayoutMain> */}
        {children}
        {/* </LayoutMain> */}
      </div>
    </div>
  );
};
export default Layout;
