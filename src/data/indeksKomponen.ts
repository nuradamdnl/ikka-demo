import data from "../assets/data/IndeksKomponen.json";

export interface IndeksKomponen {
  "Kod Teras": string;
  "Nama Teras": string;
  "Kod Komponen": string;
  "Nama Komponen": string;
  "Tahun": number;
  "Indeks": string;
}

export const indeksKomponen: IndeksKomponen[] = data as IndeksKomponen[];

export default indeksKomponen;
