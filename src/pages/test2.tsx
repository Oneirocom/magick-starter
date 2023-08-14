import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { api } from "~/utils/api";
import { useState } from "react";

export default function test2Page({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [prompt, setPrompt] = useState("");
  const [joke, setJoke] = useState<any>("");
  const getMonster = api.enemy.getMonster.useMutation();

  const handleGetJoke = async () => {
    const j = await getMonster.mutateAsync({ prompt });
    console.log(j);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-300 via-amber-200 to-blue-200">
      <div className="mx-auto my-auto flex w-64 flex-col gap-4">
        <h1>Joke maker</h1>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="rounded-md border border-gray-400 px-2 py-1"
          placeholder="Prompt"
          disabled={getJoke.isLoading}
        />
        <button
          disabled={getJoke.isLoading}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={handleGetJoke}
        >
          {getJoke.isLoading && (
            <svg
              className="-ml-1 mr-3 inline-block h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0c-4.418 0-8 3.582-8 8z"
              ></path>
            </svg>
          )}
          Get Joke
        </button>
        <div className="rounded bg-white px-4 py-2 font-bold text-black">
          <pre>{JSON.stringify(joke, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      data: "",
    },
  };
}
