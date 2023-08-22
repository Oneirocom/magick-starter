import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { api } from "~/utils/api";
import { StarIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { Monster } from "~/server/api/routers/enemy";
import Image from "next/image";
import StatusBar from "~/components/rpg/StatusBar";
import Layout from "~/components/Layout/Layout";
import { useAtom } from "jotai";
import {
  battleStateAtom,
  enemyMonsterAtom,
  enemyMonsterErrorAtom,
  enemyMonsterLoadingAtom,
} from "~/atoms/atoms";
import { motion } from "framer-motion";
import { battleFadeVariants } from "~/motion/battleVariants";
import Divider from "~/components/shared/Divider";

export default function battle({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const [enemyMonster, setEnemyMonster] = useAtom(enemyMonsterAtom);
  const [enemyMonsterLoading, setEnemyMonsterLoading] = useAtom(
    enemyMonsterLoadingAtom
  );
  const [enemyMonsterError, setEnemyMonsterError] = useAtom(
    enemyMonsterErrorAtom
  );

  return (
    <>
      <motion.div
        {...battleFadeVariants}
        key="battle"
        className="grid h-full grid-cols-5 items-center"
      >
        {/* Left */}
        <div className="col-span-1">
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 rounded-full bg-white"></div>
            <div className="text-white">Player</div>
            <StatusBar progressValue={50} progressMax={100} />
            <StatusBar
              progressValue={150}
              progressMax={200}
              Icon={StarIcon}
              title="MP"
            />
          </div>
        </div>
        {/* Center */}
        <div className="col-span-3 h-full text-white">
          <div className="flex h-full flex-col items-center justify-center">
            <BattleMain />
          </div>
        </div>
        {/* Right */}
        <div className="col-span-1">
          <div className="flex flex-col items-center">
            {enemyMonsterError && (
              <div className="text-red-500">{enemyMonsterError}</div>
            )}
            {enemyMonsterLoading ? (
              <span className="loading loading-dots loading-lg" />
            ) : (
              enemyMonster && (
                <>
                  <Image
                    src={enemyMonster.image[0] || ""}
                    alt="enemy-monster"
                    width={128}
                    height={128}
                    className="h-24 w-24 rounded-full bg-white"
                  />
                  <div className="text-white">{enemyMonster.data.name}</div>
                  <StatusBar
                    progressValue={50}
                    progressMax={enemyMonster.data.health}
                  />
                  <StatusBar
                    progressValue={150}
                    progressMax={enemyMonster.data.mana}
                    Icon={StarIcon}
                    title="MP"
                  />
                  <div className="text-white">{`Level: ${enemyMonster.data.level}`}</div>
                  <p className="text-white">{enemyMonster.data.description}</p>
                  <Divider />

                  <p className="text-white">{`Attack: ${enemyMonster.data.attributes.attack}`}</p>
                  <p className="text-white">{`Defense: ${enemyMonster.data.attributes.defense}`}</p>
                  <p className="text-white">{`Speed: ${enemyMonster.data.attributes.speed}`}</p>
                  <p className="text-white">{`Accuracy: ${enemyMonster.data.attributes.accuracy}`}</p>
                  <div className="divider" />
                  {enemyMonster.data.specials.map((special) => (
                    <div className="text-white">
                      {special.name} - {special.description}
                    </div>
                  ))}
                </>
              )
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

const BattleMain = () => {
  const [prompt, setPrompt] = useState("");
  const [enemyMonster, setEnemyMonster] = useAtom(enemyMonsterAtom);
  const [enemyMonsterLoading, setEnemyMonsterLoading] = useAtom(
    enemyMonsterLoadingAtom
  );
  const [enemyMonsterError, setEnemyMonsterError] = useAtom(
    enemyMonsterErrorAtom
  );

  const [battleState, setBattleState] = useAtom(battleStateAtom);

  const {
    mutateAsync: createMonster,
    isLoading: battleLoading,
    isError: battleError,
  } = api.enemy.getMonster.useMutation();

  const handleCreateMonster = async () => {
    const monster = await createMonster({ prompt });
    console.log(monster);
    setEnemyMonster(monster);
  };

  useEffect(() => {
    if (battleLoading) {
      setEnemyMonsterError(battleError);
    }
  }, [battleLoading]);

  useEffect(() => {
    if (enemyMonsterLoading) {
      setEnemyMonsterError(enemyMonsterError);
    }
  }, [enemyMonsterLoading]);

  const getBattleTitle = () => {
    switch (battleState) {
      case "idle":
        return "Start Battle!";
      case "battle":
        return "Battle!";
      case "victory":
        return "Victory!";
      case "defeat":
        return "Defeat!";
      default:
        return "Start Battle!";
    }
  };

  return (
    <>
      <div className="text-3xl text-white">{getBattleTitle()}</div>
      <Divider />
      <div className="join">
        <div>
          <div>
            <input
              disabled={battleLoading}
              className="input join-item input-bordered"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a monster name"
            />
          </div>
        </div>
        <select
          disabled={battleLoading}
          className="select join-item select-bordered"
        >
          <option selected defaultChecked>
            Normal
          </option>
          <option>Hard</option>
          <option>Very Hard</option>
        </select>
        <button
          disabled={battleLoading}
          onClick={handleCreateMonster}
          className="btn join-item"
        >
          Go!
        </button>
      </div>

      <div className="grow" />
      {enemyMonster && (
        <div className="join join-vertical lg:join-horizontal">
          <button className="btn join-item">Attack</button>
          <button className="btn join-item">Special</button>
          <button className="btn join-item">Run</button>
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {},
  };
}

battle.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
