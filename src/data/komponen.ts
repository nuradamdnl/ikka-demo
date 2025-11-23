import data from "../assets/data/Komponen.json";

export interface Komponen {
  "Kod Teras": string;
  "Nama Teras": string;
  "Kod Komponen": string;
  "Nama Komponen": string;
}

export const komponen: Komponen[] = data as Komponen[];

export default komponen;
