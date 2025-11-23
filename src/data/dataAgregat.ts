import data from "../assets/data/DataAgregat.json";

export interface DataAgregat {
  "Kod Indikator": string;
  "Nama Indikator": string;
  "Kod Jabatan": string;
  "Kod Guna Pakai": string;
  "Impak": string;
  "Tahun": number;
  "Penggal": string;
  "Data Agregat": string;
}

export const dataAgregat: DataAgregat[] = data as DataAgregat[];

export default dataAgregat;
