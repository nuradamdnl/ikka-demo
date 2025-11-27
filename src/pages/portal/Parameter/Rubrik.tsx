import { useEffect, useMemo, useState } from "react";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import indikatorPreskriptif from "../../../assets/data/IndikatorRubrikPreskriptif.json";
import terasPreskriptif from "../../../assets/data/TerasRubrikPreskriptif.json";
import komponenPreskriptif from "../../../assets/data/KomponenRubrikPreskriptif.json";
import terasDiagnostik from "../../../assets/data/TerasRubrikDiagnostik.json";
import komponenDiagnostik from "../../../assets/data/KomponenRubrikDiagnostik.json";

type LevelKey = "teras" | "komponen" | "indikator";
type SubKey = "preskriptif" | "diagnostik";

type RubrikEntry = {
  kod: string;
  nama: string;
  tema_id: number;
  tema_label: string;
  tema_nama: string;
  key_items: string[];
  naratif: string;
};

type FormState = {
  kod: string;
  nama: string;
  tema_id: number;
  key_items: string[];
  naratif: string;
};

const temaOptions = [
  { id: 1, label: "Tema 1: Kualiti Pengurusan Operasi" },
  { id: 2, label: "Tema 2: Aspek Aset dan Bajet" },
  { id: 3, label: "Tema 3: Elemen Perundangan" },
  { id: 4, label: "Tema 4: Impak Keterlibatan" },
  { id: 5, label: "Tema 5: Keupayaan Sumber Manusia" },
];

const navLevels: { key: LevelKey; label: string }[] = [
  { key: "teras", label: "Rubrik Teras" },
  { key: "komponen", label: "Rubrik Komponen" },
  { key: "indikator", label: "Rubrik Indikator" },
];

const subNav = [
  { key: "diagnostik", label: "Diagnostik" },
  { key: "preskriptif", label: "Preskriptif" },
];

const levelConfig: Record<
  LevelKey,
  { codeLabel: string; nameLabel: string; placeholderCode: string; placeholderName: string }
> = {
  teras: {
    codeLabel: "Kod Teras",
    nameLabel: "Nama Teras",
    placeholderCode: "Contoh: T01",
    placeholderName: "Nama teras",
  },
  komponen: {
    codeLabel: "Kod Komponen",
    nameLabel: "Nama Komponen",
    placeholderCode: "Contoh: T01-K01",
    placeholderName: "Nama komponen",
  },
  indikator: {
    codeLabel: "Kod Indikator",
    nameLabel: "Nama Indikator",
    placeholderCode: "Contoh: T01-K01-I01",
    placeholderName: "Nama indikator",
  },
};

type EntryBucket = Record<SubKey, RubrikEntry[]>;

const initialEntries: Record<LevelKey, EntryBucket> = {
  indikator: {
    preskriptif: (indikatorPreskriptif as any[]).map((item) => ({
      kod: item.kod_indikator,
      nama: item.nama_indikator,
      tema_id: item.tema_id,
      tema_label: item.tema_label,
      tema_nama: item.tema_nama,
      key_items: item.key_elements,
      naratif: item.naratif,
    })),
    diagnostik: [],
  },
  teras: {
    preskriptif: (terasPreskriptif as any[]).map((item) => ({
      kod: item.kod_teras,
      nama: item.nama_teras,
      tema_id: item.tema_id,
      tema_label: item.tema_label,
      tema_nama: item.tema_nama,
      key_items: item.key_elements,
      naratif: item.naratif,
    })),
    diagnostik: (terasDiagnostik as any[]).map((item) => ({
      kod: item.kod_teras,
      nama: item.nama_teras,
      tema_id: item.tema_id,
      tema_label: item.tema_label,
      tema_nama: item.tema_nama,
      key_items: item.key_points,
      naratif: item.naratif,
    })),
  },
  komponen: {
    preskriptif: (komponenPreskriptif as any[]).map((item) => ({
      kod: item.kod_komponen,
      nama: item.nama_komponen,
      tema_id: item.tema_id,
      tema_label: item.tema_label,
      tema_nama: item.tema_nama,
      key_items: item.key_elements,
      naratif: item.naratif,
    })),
    diagnostik: (komponenDiagnostik as any[]).map((item) => ({
      kod: item.kod_komponen,
      nama: item.nama_komponen,
      tema_id: item.tema_id,
      tema_label: item.tema_label,
      tema_nama: item.tema_nama,
      key_items: item.key_points,
      naratif: item.naratif,
    })),
  },
};

const initialFormState: FormState = {
  kod: "",
  nama: "",
  tema_id: 1,
  key_items: ["", "", "", "", ""],
  naratif: "",
};

function Rubrik() {
  const [activeLevel, setActiveLevel] = useState<LevelKey>("indikator");
  const [activeSub, setActiveSub] = useState<SubKey>("preskriptif");
  const [entries, setEntries] = useState<Record<LevelKey, EntryBucket>>(initialEntries);
  const [formBySub, setFormBySub] = useState<Record<SubKey, FormState>>({
    preskriptif: initialFormState,
    diagnostik: initialFormState,
  });

  const form = formBySub[activeSub];

  const subNavOptions = useMemo(() => {
    if (activeLevel === "indikator") {
      return subNav.filter((s) => s.key === "preskriptif");
    }
    return subNav;
  }, [activeLevel]);

  useEffect(() => {
    const validKeys = subNavOptions.map((s) => s.key as SubKey);
    if (!validKeys.includes(activeSub)) {
      setActiveSub(validKeys[0]);
    }
  }, [activeSub, subNavOptions]);

  const filteredEntries = useMemo(
    () => entries[activeLevel][activeSub].filter((e) => e.tema_id === form.tema_id),
    [activeLevel, activeSub, entries, form.tema_id]
  );

  const keyLabel = activeSub === "preskriptif" ? "Key Elements" : "Key Points";
  const labels = levelConfig[activeLevel];
  const activeLevelLabel = navLevels.find((n) => n.key === activeLevel)?.label || "Rubrik";

  const handleElementChange = (index: number, value: string) => {
    setFormBySub((prev) => {
      const nextItems = [...prev[activeSub].key_items];
      nextItems[index] = value;
      return {
        ...prev,
        [activeSub]: { ...prev[activeSub], key_items: nextItems },
      };
    });
  };

  const updateForm = (payload: Partial<FormState>) => {
    setFormBySub((prev) => ({
      ...prev,
      [activeSub]: { ...prev[activeSub], ...payload },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.kod || !form.nama || !form.naratif) return;

    const temaInfo = temaOptions.find((t) => t.id === form.tema_id)!;
    const newEntry: RubrikEntry = {
      kod: form.kod,
      nama: form.nama,
      tema_id: form.tema_id,
      tema_label: temaInfo.label,
      tema_nama: temaInfo.label,
      key_items: form.key_items.filter((k) => k.trim() !== ""),
      naratif: form.naratif,
    };

    setEntries((prev) => ({
      ...prev,
      [activeLevel]: {
        ...prev[activeLevel],
        [activeSub]: [newEntry, ...prev[activeLevel][activeSub]],
      },
    }));

    setFormBySub((prev) => ({
      ...prev,
      [activeSub]: {
        ...initialFormState,
        tema_id: form.tema_id,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Rubrik</PageTitle>

            <SectionCard title="Navigasi Rubrik">
              <div className="flex flex-wrap gap-2 mb-3">
                {navLevels.map((nav) => (
                  <button
                    key={nav.key}
                    onClick={() => setActiveLevel(nav.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      activeLevel === nav.key
                        ? "bg-blue-900 text-white shadow"
                        : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {nav.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {subNavOptions.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveSub(item.key as SubKey)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                      activeSub === item.key
                        ? "bg-blue-700 text-white shadow"
                        : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </SectionCard>

            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <SectionCard title={`Butiran ${activeLevelLabel}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{labels.codeLabel}</label>
                      <input
                        type="text"
                        value={form.kod}
                        onChange={(e) => updateForm({ kod: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={labels.placeholderCode}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{labels.nameLabel}</label>
                      <input
                        type="text"
                        value={form.nama}
                        onChange={(e) => updateForm({ nama: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={labels.placeholderName}
                      />
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title={`Tema & ${keyLabel}`}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
                      <div className="flex flex-wrap gap-2">
                        {temaOptions.map((tema) => (
                          <button
                            type="button"
                            key={tema.id}
                            onClick={() => updateForm({ tema_id: tema.id })}
                            className={`px-3 py-2 rounded-lg text-sm border transition ${
                              form.tema_id === tema.id
                                ? "bg-blue-900 text-white border-blue-900 shadow"
                                : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            {tema.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="block text-sm font-medium text-gray-700 mb-2">{keyLabel}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {form.key_items.map((val, idx) => (
                          <input
                            key={idx}
                            type="text"
                            value={val}
                            onChange={(e) => handleElementChange(idx, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`${keyLabel} ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Naratif & Simpan">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Naratif</label>
                      <textarea
                        value={form.naratif}
                        onChange={(e) => updateForm({ naratif: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        placeholder="Huraian / Naratif"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-5 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold shadow"
                      >
                        Simpan Rubrik
                      </button>
                    </div>
                  </div>
                </SectionCard>
              </form>

              <SectionCard title={`Senarai ${activeLevelLabel} (${activeSub === "preskriptif" ? "Preskriptif" : "Diagnostik"})`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                        <th className="px-4 py-2 text-left border border-gray-200">{labels.codeLabel}</th>
                        <th className="px-4 py-2 text-left border border-gray-200">{labels.nameLabel}</th>
                        <th className="px-4 py-2 text-left border border-gray-200">Tema</th>
                        <th className="px-4 py-2 text-left border border-gray-200">{keyLabel}</th>
                        <th className="px-4 py-2 text-left border border-gray-200">Naratif</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEntries.map((row, idx) => (
                        <tr key={`${row.kod}-${row.tema_id}-${idx}`} className="hover:bg-gray-50 border border-gray-200 align-top">
                          <td className="px-4 py-2 font-semibold text-gray-900">{row.kod}</td>
                          <td className="px-4 py-2 text-gray-800">{row.nama}</td>
                          <td className="px-4 py-2 text-gray-800">{row.tema_label}</td>
                          <td className="px-4 py-2 text-gray-800">
                            <ul className="list-disc list-inside space-y-1">
                              {row.key_items.map((k, i) => (
                                <li key={i}>{k}</li>
                              ))}
                            </ul>
                          </td>
                          <td className="px-4 py-2 text-gray-800 whitespace-pre-wrap">{row.naratif}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredEntries.length === 0 && (
                    <p className="text-sm text-gray-600 text-center py-6">
                      Tiada rekod untuk tema yang dipilih.
                    </p>
                  )}
                </div>
              </SectionCard>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Rubrik;
