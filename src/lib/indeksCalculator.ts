import { dataAgregat, DataAgregat } from "../data/dataAgregat";
import { indikator } from "../data/indikator";

const BASELINE_STORAGE_KEY = "ikka-baseline-years";

export function loadBaselineOverrides(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(BASELINE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}

export function saveBaselineOverrides(next: Record<string, number>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(BASELINE_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // swallow storage errors
  }
}

export interface YearData {
  year: number;
  penggalTotals: { [penggal: string]: number };
  yearTotal: number;
  z: number;
  index: number | null;
  index100: number | null;
}

export interface IndicatorStats {
  code: string;
  name: string;
  guna: string;
  impak: string;
  years: YearData[];
  mean: number;
  stdDev: number;
  sum: number;
  n: number;
  isPositive: boolean;
  baseYear: number;
  baseIndex: number | null;
}

export interface IndicatorMapItem {
  code: string;
  name: string;
  guna: string;
  impak: string;
  years: {
    [year: number]: {
      year: number;
      penggalTotals: { [penggal: string]: number };
      yearTotal: number;
    };
  };
}

/**
 * Build a map of indicators with aggregated data
 */
export function buildIndicatorMap(): Map<string, IndicatorMapItem> {
  const indicatorMap = new Map<string, IndicatorMapItem>();

  dataAgregat.forEach((row: DataAgregat) => {
    const code = row["Kod Indikator"];
    const name = row["Nama Indikator"];
    const guna = row["Kod Guna Pakai"];
    const impak = row["Impak"];
    const year = Number(row["Tahun"]);
    const penggal = row["Penggal"];
    const value = parseFloat(row["Data Agregat"]) || 0;

    if (!code || !year || !penggal) return;

    if (!indicatorMap.has(code)) {
      indicatorMap.set(code, {
        code,
        name,
        guna,
        impak,
        years: {},
      });
    }

    const ind = indicatorMap.get(code)!;

    if (!ind.years[year]) {
      ind.years[year] = {
        year,
        penggalTotals: {},
        yearTotal: 0,
      };
    }

    const yObj = ind.years[year];

    if (!yObj.penggalTotals[penggal]) {
      yObj.penggalTotals[penggal] = 0;
    }

    yObj.penggalTotals[penggal] += value;
    yObj.yearTotal += value;
  });

  return indicatorMap;
}

/**
 * Get all unique indicator codes sorted
 */
export function getAllIndicatorCodes(): string[] {
  return indikator
    .map((i: any) => i["Kod Indikator"])
    .filter((code: string, index: number, self: string[]) => self.indexOf(code) === index)
    .sort();
}

/**
 * Compute statistics for an indicator
 */
export function computeStats(
  ind: IndicatorMapItem,
  baseYear: number
): IndicatorStats {
  const yearObjs = Object.values(ind.years).sort((a, b) => a.year - b.year);
  const totals = yearObjs.map((y) => y.yearTotal);
  const n = totals.length;
  const sum = totals.reduce((acc, v) => acc + v, 0);
  const mean = n > 0 ? sum / n : 0;

  let variance = 0;
  if (n > 0) {
    variance = totals.reduce((acc, v) => {
      const d = v - mean;
      return acc + d * d;
    }, 0) / n;
  }
  const stdDev = Math.sqrt(variance);

  const isPositive = (ind.impak || "").toUpperCase().includes("POSITIF");
  const guna = (ind.guna || "").toUpperCase();

  const perYear: YearData[] = [];

  // Compute z-score & index for each year
  yearObjs.forEach((y) => {
    let z = 0;
    if (stdDev > 0) {
      z = (y.yearTotal - mean) / stdDev;
    }

    let indexValue: number | null = null;
    if (guna !== "A3") {
      if (isPositive) {
        indexValue = 100 + z * 10;
      } else {
        indexValue = 100 - z * 10;
      }
    }

    perYear.push({
      year: y.year,
      penggalTotals: y.penggalTotals,
      yearTotal: y.yearTotal,
      z,
      index: indexValue,
      index100: null,
    });
  });

  const baseObj = perYear.find((r) => r.year === baseYear && r.index != null);
  const baseIndex = baseObj ? baseObj.index : null;

  perYear.forEach((r) => {
    if (r.index != null && baseIndex && baseIndex !== 0) {
      r.index100 = (r.index / baseIndex) * 100;
    }
  });

  return {
    code: ind.code,
    name: ind.name,
    guna: ind.guna,
    impak: ind.impak,
    years: perYear,
    mean,
    stdDev,
    sum,
    n,
    isPositive,
    baseYear,
    baseIndex,
  };
}

/**
 * Get available years for an indicator
 */
export function getAvailableYears(ind: IndicatorMapItem): number[] {
  return Object.values(ind.years)
    .map((y) => y.year)
    .sort((a, b) => a - b);
}

/**
 * Get default baseline year for an indicator
 */
export function getDefaultBaselineYear(
  ind: IndicatorMapItem,
  overrides?: Record<string, number>
): number {
  const stored = overrides ?? loadBaselineOverrides();
  if (stored[ind.code]) {
    return stored[ind.code];
  }

  const years = getAvailableYears(ind);
  if (years.includes(2021)) {
    return 2021;
  } else if (years.length >= 2) {
    return years[1];
  }
  return years[0] || 2020;
}
