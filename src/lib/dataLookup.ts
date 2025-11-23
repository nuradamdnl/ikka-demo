import { teras } from "../data/teras";
import { komponen } from "../data/komponen";
import { indikator } from "../data/indikator";
import { indeksTeras } from "../data/indeksTeras";
import { indeksKomponen } from "../data/indeksKomponen";
import { indeksIndikator } from "../data/indeksIndikator";
import { dataAgregat } from "../data/dataAgregat";

/**
 * Get all Teras
 */
export function getAllTeras() {
  return teras;
}

/**
 * Get Teras by code
 */
export function getTerasByKod(kodTeras: string) {
  return teras.find((t) => t["Kod Teras"] === kodTeras);
}

/**
 * Get Komponen by Teras code
 */
export function getKomponenByTeras(kodTeras: string) {
  return komponen.filter((k) => k["Kod Teras"] === kodTeras);
}

/**
 * Get Komponen by code
 */
export function getKomponenByKod(kodKomponen: string) {
  return komponen.find((k) => k["Kod Komponen"] === kodKomponen);
}

/**
 * Get Indikator by Komponen code
 */
export function getIndikatorByKomponen(kodKomponen: string) {
  return indikator.filter((i) => i["Kod Komponen"] === kodKomponen);
}

/**
 * Get Indikator by Teras code
 */
export function getIndikatorByTeras(kodTeras: string) {
  return indikator.filter((i) => i["Kod Teras"] === kodTeras);
}

/**
 * Get Indikator by code
 */
export function getIndikatorByKod(kodIndikator: string) {
  return indikator.find((i) => i["Kod Indikator"] === kodIndikator);
}

/**
 * Get Indeks Teras by year
 */
export function getIndeksTerasByTahun(tahun: number) {
  return indeksTeras.filter((it) => it.Tahun === tahun);
}

/**
 * Get Indeks Teras by code and year
 */
export function getIndeksTerasByKodAndTahun(kodTeras: string, tahun: number) {
  return indeksTeras.find(
    (it) => it["Kod Teras"] === kodTeras && it.Tahun === tahun
  );
}

/**
 * Get Indeks Komponen by Teras code and year
 */
export function getIndeksKomponenByTerasAndTahun(
  kodTeras: string,
  tahun: number
) {
  return indeksKomponen.filter(
    (ik) => ik["Kod Teras"] === kodTeras && ik.Tahun === tahun
  );
}

/**
 * Get Indeks Komponen by code and year
 */
export function getIndeksKomponenByKodAndTahun(
  kodKomponen: string,
  tahun: number
) {
  return indeksKomponen.find(
    (ik) => ik["Kod Komponen"] === kodKomponen && ik.Tahun === tahun
  );
}

/**
 * Get Indeks Indikator by Komponen code and year
 */
export function getIndeksIndikatorByKomponenAndTahun(
  kodKomponen: string,
  tahun: number
) {
  return indeksIndikator.filter(
    (ii) => ii["Kod Komponen"] === kodKomponen && ii.Tahun === tahun
  );
}

/**
 * Get Indeks Indikator by code and year
 */
export function getIndeksIndikatorByKodAndTahun(
  kodIndikator: string,
  tahun: number
) {
  return indeksIndikator.find(
    (ii) => ii["Kod Indikator"] === kodIndikator && ii.Tahun === tahun
  );
}

/**
 * Get Data Agregat by Indikator code and year
 */
export function getDataAgregatByIndikatorAndTahun(
  kodIndikator: string,
  tahun: number
) {
  return dataAgregat.filter(
    (da) => da["Kod Indikator"] === kodIndikator && da.Tahun === tahun
  );
}

/**
 * Get Data Agregat by Indikator code, year and penggal
 */
export function getDataAgregatByIndikatorTahunAndPenggal(
  kodIndikator: string,
  tahun: number,
  penggal: string
) {
  return dataAgregat.filter(
    (da) =>
      da["Kod Indikator"] === kodIndikator &&
      da.Tahun === tahun &&
      da.Penggal === penggal
  );
}

/**
 * Get all unique years from Indeks Teras
 */
export function getAllYears() {
  const years = [...new Set(indeksTeras.map((it) => it.Tahun))];
  return years.sort((a, b) => b - a); // Sort descending
}

/**
 * Get all unique penggal from Data Agregat
 */
export function getAllPenggal() {
  const penggal = [...new Set(dataAgregat.map((da) => da.Penggal))];
  return penggal;
}

/**
 * Get full hierarchy: Teras -> Komponen -> Indikator
 */
export function getFullHierarchy() {
  return teras.map((t) => ({
    ...t,
    komponen: getKomponenByTeras(t["Kod Teras"]).map((k) => ({
      ...k,
      indikator: getIndikatorByKomponen(k["Kod Komponen"]),
    })),
  }));
}

/**
 * Get Teras with its Indeks for a specific year
 */
export function getTerasWithIndeks(tahun: number) {
  return teras.map((t) => {
    const indeks = getIndeksTerasByKodAndTahun(t["Kod Teras"], tahun);
    return {
      ...t,
      indeks: indeks ? parseFloat(indeks.Indeks) : null,
    };
  });
}

/**
 * Get Komponen with its Indeks for a specific Teras and year
 */
export function getKomponenWithIndeks(kodTeras: string, tahun: number) {
  const komponenList = getKomponenByTeras(kodTeras);
  return komponenList.map((k) => {
    const indeks = getIndeksKomponenByKodAndTahun(k["Kod Komponen"], tahun);
    return {
      ...k,
      indeks: indeks ? parseFloat(indeks.Indeks) : null,
    };
  });
}

/**
 * Get Indikator with its Indeks for a specific Komponen and year
 */
export function getIndikatorWithIndeks(kodKomponen: string, tahun: number) {
  const indikatorList = getIndikatorByKomponen(kodKomponen);
  return indikatorList.map((i) => {
    const indeks = getIndeksIndikatorByKodAndTahun(i["Kod Indikator"], tahun);
    return {
      ...i,
      indeks: indeks ? parseFloat(indeks.Indeks) : null,
    };
  });
}
