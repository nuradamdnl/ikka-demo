import data from "../assets/data/Teras.json";

export interface Teras {
  "Kod Teras": string;
  "Nama Teras": string;
}

export const teras: Teras[] = data as Teras[];

export default teras;
