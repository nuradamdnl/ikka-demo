import data from "../assets/data/PemilikData.json";

export interface PemilikData {
  "Kod Agensi": string;
  "Nama Agensi": string;
  "Kod Jabatan": string;
  "Nama Jabatan": string;
}

export const pemilikData: PemilikData[] = data as PemilikData[];

export default pemilikData;
