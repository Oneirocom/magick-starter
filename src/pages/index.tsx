import Hero from "../components/Home/Hero";
import { Layout } from "~/Layout/Layout";

export default function Home() {
  return <Hero />;
}
Home.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
