import { Box, Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { aiNPCHPAtom, aiNPCMPAtom, aiNPCPositionAtom } from "~/atoms/atoms";

const MAP_SIZE = 10;

const AINPC = () => {
  const [aiNPCPosition, setAiNPCPosition] = useAtom(aiNPCPositionAtom);
  const [HP, setHP] = useAtom(aiNPCHPAtom);
  const [MP, setMP] = useAtom(aiNPCMPAtom);

  const aiMoves = [
    {
      name: "Swipe",
      damage: 10,
      cost: 0,
    },
    {
      name: "Fireball",
      damage: 20,
      cost: 10,
    },
  ];

  useEffect(() => {
    const moveAI = setInterval(() => {
      const newAiPosition: [number, number, number] = [...aiNPCPosition];
      const randomDirection = Math.floor(Math.random() * 4);

      switch (randomDirection) {
        case 0:
          newAiPosition[2] -= 1;
          break;
        case 1:
          newAiPosition[2] += 1;
          break;
        case 2:
          newAiPosition[0] -= 1;
          break;
        case 3:
          newAiPosition[0] += 1;
          break;
      }

      if (
        newAiPosition[0] >= 0 &&
        newAiPosition[0] < MAP_SIZE &&
        newAiPosition[2] >= 0 &&
        newAiPosition[2] < MAP_SIZE
      ) {
        setAiNPCPosition(newAiPosition);
      }
    }, 2000);

    return () => clearInterval(moveAI);
  }, []);

  return (
    <>
      <Html>
        <div className="pointer-events-none absolute bottom-0 right-0 flex h-full w-full flex-col items-center justify-start">
          <div className="text-2xl">AI</div>
          <div className="text-2xl text-red-500">HP: {HP}</div>
          <div className="text-2xl text-blue-500">MP: {MP}</div>
        </div>
      </Html>
      <Box args={[1, 1, 1]} position={aiNPCPosition}>
        <meshStandardMaterial attach="material" color="yellow" />
      </Box>
    </>
  );
};

export default AINPC;
