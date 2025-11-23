import { pemilikData } from "../data/pemilikData";

/**
 * Get all Pemilik Data (Agensi/Jabatan)
 */
export function getAllPemilikData() {
  return pemilikData;
}

/**
 * Get Pemilik Data by Kod Agensi
 */
export function getPemilikDataByKodAgensi(kodAgensi: string) {
  return pemilikData.filter((p) => p["Kod Agensi"] === kodAgensi);
}

/**
 * Get Pemilik Data by Kod Jabatan
 */
export function getPemilikDataByKodJabatan(kodJabatan: string) {
  return pemilikData.find((p) => p["Kod Jabatan"] === kodJabatan);
}

/**
 * Get unique Agensi list
 */
export function getAllAgensi() {
  const agensiMap = new Map<string, { kod: string; nama: string }>();
  
  pemilikData.forEach((p) => {
    if (!agensiMap.has(p["Kod Agensi"])) {
      agensiMap.set(p["Kod Agensi"], {
        kod: p["Kod Agensi"],
        nama: p["Nama Agensi"],
      });
    }
  });
  
  return Array.from(agensiMap.values());
}

/**
 * Get Jabatan list by Agensi
 */
export function getJabatanByAgensi(kodAgensi: string) {
  return pemilikData
    .filter((p) => p["Kod Agensi"] === kodAgensi)
    .map((p) => ({
      kod: p["Kod Jabatan"],
      nama: p["Nama Jabatan"],
    }));
}

/**
 * Get Agensi info by Kod Jabatan
 */
export function getAgensiByJabatan(kodJabatan: string) {
  const pemilik = getPemilikDataByKodJabatan(kodJabatan);
  if (!pemilik) return null;
  
  return {
    kodAgensi: pemilik["Kod Agensi"],
    namaAgensi: pemilik["Nama Agensi"],
    kodJabatan: pemilik["Kod Jabatan"],
    namaJabatan: pemilik["Nama Jabatan"],
  };
}
