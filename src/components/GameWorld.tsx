import { Plane, PerspectiveCamera, Html } from "@react-three/drei";
import { useThree, useLoader } from "@react-three/fiber";
import { AmbientLight, DirectionalLight, TextureLoader } from "three";
import Character from "./Character";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  characterPositionAtom,
  aiNPCPositionAtom,
  isBattleActiveAtom,
  characterHPAtom,
} from "~/atoms/atoms";
import InteractionMenu from "./InteractionMenu";
import Shop from "./Shop";

const TILE_SIZE = 1;

const tiles = [
  [
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
  ],
  [
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
  ],
  [
    "grass",
    "grass",
    "road",
    "road",
    "road",
    "road",
    "road",
    "road",
    "grass",
    "grass",
  ],
  [
    "grass",
    "grass",
    "road",
    "grass",
    "grass",
    "grass",
    "grass",
    "road",
    "grass",
    "grass",
  ],
  [
    "grass",
    "grass",
    "road",
    "grass",
    "water",
    "water",
    "grass",
    "road",
    "grass",
    "grass",
  ],
  [
    "grass",
    "grass",
    "road",
    "grass",
    "water",
    "water",
    "grass",
    "road",
    "grass",
    "grass",
  ],
  [
    "grass",
    "grass",
    "road",
    "grass",
    "grass",
    "grass",
    "grass",
    "road",
    "grass",
    "grass",
  ],
  [
    "grass",
    "grass",
    "road",
    "road",
    "road",
    "road",
    "road",
    "road",
    "grass",
    "grass",
  ],
  [
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
  ],
  [
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
    "grass",
  ],
];

const GameWorld = () => {
  const { scene } = useThree();
  const [characterPosition] = useAtom(characterPositionAtom);
  const [aiNPCPosition] = useAtom(aiNPCPositionAtom);
  const [isBattleActive, setIsBattleActive] = useAtom(isBattleActiveAtom);

  const [showInteractionMenu, setShowInteractionMenu] = useState(false);

  const grassTexture = useLoader(TextureLoader, "/textures/grass.png");

  const getTileTexture = (type: string) => {
    switch (type) {
      case "grass":
        return grassTexture;
    }
  };

  useEffect(() => {
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Cleanup on component unmount
    return () => {
      scene.remove(ambientLight);
      scene.remove(directionalLight);
    };
  }, [scene]);

  useEffect(() => {
    if (
      Math.abs(characterPosition[0] - aiNPCPosition[0]) < 1 &&
      Math.abs(characterPosition[2] - aiNPCPosition[2]) < 1 &&
      !isBattleActive
    ) {
      setShowInteractionMenu(true);
    }
  }, [characterPosition, aiNPCPosition]);
  return (
    <>
      <Html>
        {showInteractionMenu && (
          <InteractionMenu onClose={() => setShowInteractionMenu(false)} />
        )}
      </Html>

      <PerspectiveCamera
        makeDefault
        position={[5, 10, 15]} // Increased Y and Z values for a more top-down view
        rotation={[-Math.PI / 4, 0, 0]}
      />

      {tiles.map((row, i) => {
        return row.map((tile, j) => {
          return (
            <Plane
              args={[TILE_SIZE, TILE_SIZE]}
              position={[j, 0, i]}
              rotation={[-Math.PI / 2, 0, 0]}
              receiveShadow
              key={`tile-${i}-${j}`}
            >
              <meshStandardMaterial
                attach="material"
                map={getTileTexture(tile)}
              />
            </Plane>
          );
        });
      })}
      <Character />
      <Shop />
    </>
  );
};

export default GameWorld;
