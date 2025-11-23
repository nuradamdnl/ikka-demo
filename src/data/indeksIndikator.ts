import data from "../assets/data/IndeksIndikator.json";

export interface IndeksIndikator {
  "Kod Teras": string;
  "Nama Teras": string;
  "Kod Komponen": string;
  "Nama Komponen": string;
  "Kod Indikator": string;
  "Nama Indikator": string;
  "Tahun": number;
  "Indeks": string;
}

export const indeksIndikator: IndeksIndikator[] = data as IndeksIndikator[];

export default indeksIndikator;
