import { Canvas } from "@react-three/fiber";
import GameWorld from "../components/GameWorld";
import Layout from "~/components/layout/layout";

const Home = () => {
  return (
    <Layout>
      <Canvas>
        <GameWorld />
      </Canvas>
    </Layout>
  );
};

export default Home;
