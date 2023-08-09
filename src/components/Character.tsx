import { useRef, useState, useEffect } from "react";
import { Box, Html } from "@react-three/drei";
import { useAtom } from "jotai";
import {
  characterHPAtom,
  characterMPAtom,
  characterPositionAtom,
} from "~/atoms/atoms";

const MAP_SIZE = 10;

const Character = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [characterPosition, setCharacterPosition] = useAtom(
    characterPositionAtom
  );
  const [HP, setHP] = useAtom(characterHPAtom);
  const [MP, setMP] = useAtom(characterMPAtom);

  const moves = [
    {
      name: "Punch",
      damage: 10,
      cost: 0,
    },
    {
      name: "Magic Blast",
      damage: 20,
      cost: 10,
    },
  ];

  const isWithinBounds = (x: number, z: number) => {
    return x >= 0 && x < MAP_SIZE && z >= 0 && z < MAP_SIZE;
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let newPosition: [number, number, number] = [...characterPosition] as [
        number,
        number,
        number
      ];

      switch (event.key) {
        case "ArrowUp":
          newPosition[2] -= 1;
          break;
        case "ArrowDown":
          newPosition[2] += 1;
          break;
        case "ArrowLeft":
          newPosition[0] -= 1;
          mesh.current.rotation.y = Math.PI;
          break;
        case "ArrowRight":
          newPosition[0] += 1;
          mesh.current.rotation.y = -Math.PI;
          break;
      }

      if (isWithinBounds(newPosition[0], newPosition[2])) {
        setCharacterPosition(newPosition);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [characterPosition]);

  return (
    <>
      <Html>
        <div className="pointer-events-none absolute left-0 top-0 flex h-full w-full flex-col items-center justify-start">
          <div className="text-2xl">Character</div>
          <div className="text-2xl text-red-500">HP: {HP}</div>
          <div className="text-2xl text-blue-500">MP: {MP}</div>
        </div>
      </Html>
      <Box ref={mesh} args={[1, 1, 1]} position={characterPosition}>
        <meshStandardMaterial attach="material" color="blue" />
      </Box>
    </>
  );
};

export default Character;
