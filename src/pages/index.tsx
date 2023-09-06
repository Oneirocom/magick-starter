import Hero from "../components/Home/Hero";
import { Layout } from "../components/Layout/Layout";

export default function Home() {
  return <Hero />;
}
Home.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
