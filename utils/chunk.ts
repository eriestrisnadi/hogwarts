import { shadowedChunk } from "./shadowedChunk";

export const chunk = <T>(arr: T[], size: number) =>
  shadowedChunk(arr, size).map((n1) => n1.filter((n) => !!n));
