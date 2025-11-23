import data from "../assets/data/IndeksTeras.json";

export interface IndeksTeras {
  "Kod Teras": string;
  "Nama Teras": string;
  "Tahun": number;
  "Indeks": string;
}

export const indeksTeras: IndeksTeras[] = data as IndeksTeras[];

export default indeksTeras;
