import { atom } from "jotai";

export const characterPositionAtom = atom<[number, number, number]>([0, 0, 0]);
export const aiNPCPositionAtom = atom<[number, number, number]>([5, 0, 5]);
export const characterHPAtom = atom<number>(100);
export const characterMPAtom = atom<number>(50);
export const aiNPCHPAtom = atom<number>(100);
export const aiNPCMPAtom = atom<number>(50);
export const isBattleActiveAtom = atom<boolean>(false);
export const inventoryAtom = atom<{ [key: string]: number }>({});
