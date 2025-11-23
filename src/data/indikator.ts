import data from "../assets/data/Indikator.json";

export interface Indikator {
  "Kod Teras": string;
  "Nama Teras": string;
  "Kod Komponen": string;
  "Nama Komponen": string;
  "Kod Indikator": string;
  "Nama Indikator": string;
}

export const indikator: Indikator[] = data as Indikator[];

export default indikator;
