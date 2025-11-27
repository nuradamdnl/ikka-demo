import { useEffect, useMemo, useState } from "react";
import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import indikatorPres from "../../../assets/data/IndikatorRubrikPreskriptif.json";
import terasPres from "../../../assets/data/TerasRubrikPreskriptif.json";
import komponenPres from "../../../assets/data/KomponenRubrikPreskriptif.json";
import terasDiag from "../../../assets/data/TerasRubrikDiagnostik.json";
import komponenDiag from "../../../assets/data/KomponenRubrikDiagnostik.json";
import terasBase from "../../../assets/data/Teras.json";
import komponenBase from "../../../assets/data/Komponen.json";
import indikatorBase from "../../../assets/data/Indikator.json";

type LevelKey = "teras" | "komponen" | "indikator";
type SubKey = "preskriptif" | "diagnostik";

type PresEntry = {
  kod: string;
  nama: string;
  tema_id: number;
  tema_label: string;
  tema_nama: string;
  key_items: string[];
  naratif: string;
};

type DiagEntry = {
  kod: string;
  nama: string;
  naratif_turun: string;
  naratif_kekal: string;
  naratif_naik: string;
};

type EntryBucket = {
  preskriptif: PresEntry[];
  diagnostik: DiagEntry[];
};

type PresForm = {
  kod: string;
  nama: string;
  tema_id: number;
  key_items: string[];
  naratif: string;
};

type DiagForm = {
  kod: string;
  nama: string;
  naratif_turun: string;
  naratif_kekal: string;
  naratif_naik: string;
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

const initialEntries: Record<LevelKey, EntryBucket> = {
  indikator: {
    preskriptif: (indikatorPres as any[]).map((item) => ({
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
    preskriptif: (terasPres as any[]).map((item) => ({
      kod: item.kod_teras,
      nama: item.nama_teras,
      tema_id: item.tema_id,
      tema_label: item.tema_label,
      tema_nama: item.tema_nama,
      key_items: item.key_elements,
      naratif: item.naratif,
    })),
    diagnostik: (terasDiag as any[]).map((item) => ({
      kod: item.kod_teras,
      nama: item.nama_teras,
      naratif_turun: item.naratif_diagnostik_turun,
      naratif_kekal: item.naratif_diagnostik_kekal,
      naratif_naik: item.naratif_diagnostik_naik,
    })),
  },
  komponen: {
    preskriptif: (komponenPres as any[]).map((item) => ({
      kod: item.kod_komponen,
      nama: item.nama_komponen,
      tema_id: item.tema_id,
      tema_label: item.tema_label,
      tema_nama: item.tema_nama,
      key_items: item.key_elements,
      naratif: item.naratif,
    })),
    diagnostik: (komponenDiag as any[]).map((item) => ({
      kod: item.kod_komponen,
      nama: item.nama_komponen,
      naratif_turun: item.naratif_diagnostik_turun,
      naratif_kekal: item.naratif_diagnostik_kekal,
      naratif_naik: item.naratif_diagnostik_naik,
    })),
  },
};

const initialPresForm: PresForm = {
  kod: "",
  nama: "",
  tema_id: 1,
  key_items: ["", "", "", "", ""],
  naratif: "",
};

const initialDiagForm: DiagForm = {
  kod: "",
  nama: "",
  naratif_turun: "",
  naratif_kekal: "",
  naratif_naik: "",
};

function Rubrik() {
  const [activeLevel, setActiveLevel] = useState<LevelKey>("indikator");
  const [activeSub, setActiveSub] = useState<SubKey>("preskriptif");
  const [entries, setEntries] = useState<Record<LevelKey, EntryBucket>>(initialEntries);
  const [formPres, setFormPres] = useState<PresForm>(initialPresForm);
  const [formDiag, setFormDiag] = useState<DiagForm>(initialDiagForm);
  const [searchTerm, setSearchTerm] = useState("");

  const form = activeSub === "preskriptif" ? formPres : formDiag;

  const optionsByLevel = useMemo(() => {
    const terasOpts = (terasBase as any[]).map((t) => ({
      code: t["Kod Teras"],
      name: t["Nama Teras"],
    }));
    const komponenOpts = (komponenBase as any[]).map((k) => ({
      code: k["Kod Komponen"],
      name: k["Nama Komponen"],
    }));
    const indikatorMap = new Map<string, string>();
    (indikatorBase as any[]).forEach((i) => {
      const code = i["Kod Indikator"];
      if (code && !indikatorMap.has(code)) {
        indikatorMap.set(code, i["Nama Indikator"]);
      }
    });
    const indikatorOpts = Array.from(indikatorMap.entries()).map(([code, name]) => ({ code, name }));
    return {
      teras: terasOpts,
      komponen: komponenOpts,
      indikator: indikatorOpts,
    };
  }, []);

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

  useEffect(() => {
    setSearchTerm("");
    const opts = optionsByLevel[activeLevel];
    if (!opts.length) return;
    const first = opts[0];
    if (activeSub === "preskriptif") {
      setFormPres((prev) => ({ ...prev, kod: first.code, nama: first.name }));
    } else {
      setFormDiag((prev) => ({ ...prev, kod: first.code, nama: first.name }));
    }
  }, [activeLevel, activeSub, optionsByLevel]);

  const filteredEntries = useMemo(() => {
    const list = entries[activeLevel][activeSub];
    if (activeSub === "preskriptif") {
      const temaId = (form as PresForm).tema_id;
      return (list as PresEntry[]).filter((e) => e.tema_id === temaId);
    }
    return list;
  }, [activeLevel, activeSub, entries, form]);

  const filteredOptions = useMemo(() => {
    const opts = optionsByLevel[activeLevel];
    if (!searchTerm) return opts;
    const term = searchTerm.toLowerCase();
    return opts.filter((o) => o.code.toLowerCase().includes(term) || o.name.toLowerCase().includes(term));
  }, [activeLevel, optionsByLevel, searchTerm]);

  const labels = levelConfig[activeLevel];
  const activeLevelLabel = navLevels.find((n) => n.key === activeLevel)?.label || "Rubrik";
  const keyLabel = activeSub === "preskriptif" ? "Key Elements" : "Naratif";

  const handleElementChange = (index: number, value: string) => {
    setFormPres((prev) => {
      const next = [...prev.key_items];
      next[index] = value;
      return { ...prev, key_items: next };
    });
  };

  const updateForm = (payload: Partial<PresForm & DiagForm>) => {
    if (activeSub === "preskriptif") {
      setFormPres((prev) => ({ ...prev, ...payload }));
    } else {
      setFormDiag((prev) => ({ ...prev, ...payload }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSub === "preskriptif") {
      const f = formPres;
      if (!f.kod || !f.nama || !f.naratif) return;
      const temaInfo = temaOptions.find((t) => t.id === f.tema_id)!;
      const newEntry: PresEntry = {
        kod: f.kod,
        nama: f.nama,
        tema_id: f.tema_id,
        tema_label: temaInfo.label,
        tema_nama: temaInfo.label,
        key_items: f.key_items.filter((k) => k.trim() !== ""),
        naratif: f.naratif,
      };
      setEntries((prev) => ({
        ...prev,
        [activeLevel]: {
          ...prev[activeLevel],
          preskriptif: [newEntry, ...(prev[activeLevel].preskriptif as PresEntry[])],
        },
      }));
      setFormPres((prev) => ({
        ...initialPresForm,
        tema_id: f.tema_id,
        kod: f.kod,
        nama: f.nama,
      }));
    } else {
      const f = formDiag;
      if (!f.kod || !f.nama) return;
      const newEntry: DiagEntry = {
        kod: f.kod,
        nama: f.nama,
        naratif_turun: f.naratif_turun,
        naratif_kekal: f.naratif_kekal,
        naratif_naik: f.naratif_naik,
      };
      setEntries((prev) => ({
        ...prev,
        [activeLevel]: {
          ...prev[activeLevel],
          diagnostik: [newEntry, ...(prev[activeLevel].diagnostik as DiagEntry[])],
        },
      }));
      setFormDiag((prev) => ({
        ...initialDiagForm,
        kod: f.kod,
        nama: f.nama,
      }));
    }
  };

  const renderNaratifFields = () => {
    if (activeSub === "preskriptif") {
      return (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Naratif</label>
            <textarea
              value={formPres.naratif}
              onChange={(e) => updateForm({ naratif: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Huraian / Naratif"
            />
          </div>
        </div>
      );
    }
    return (
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Indeks Menurun</label>
          <textarea
            value={formDiag.naratif_turun}
            onChange={(e) => updateForm({ naratif_turun: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Interpretasi jika indeks menurun"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Indeks Kekal</label>
          <textarea
            value={formDiag.naratif_kekal}
            onChange={(e) => updateForm({ naratif_kekal: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Interpretasi jika indeks kekal"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Indeks Meningkat</label>
          <textarea
            value={formDiag.naratif_naik}
            onChange={(e) => updateForm({ naratif_naik: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Interpretasi jika indeks meningkat"
          />
        </div>
      </div>
    );
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Cari kod atau nama..."
                        className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={form.kod}
                        onChange={(e) => {
                          const selected = optionsByLevel[activeLevel].find((o) => o.code === e.target.value);
                          updateForm({ kod: e.target.value, nama: selected?.name || "" });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        {filteredOptions.length === 0 && <option value="">Tiada padanan</option>}
                        {filteredOptions.map((opt) => (
                          <option key={opt.code} value={opt.code}>
                            {opt.code}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{labels.nameLabel}</label>
                      <input
                        type="text"
                        value={form.nama}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                        placeholder={labels.placeholderName}
                      />
                    </div>
                  </div>
                </SectionCard>

                {activeSub === "preskriptif" && (
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
                                (form as PresForm).tema_id === tema.id
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
                          {(form as PresForm).key_items.map((val, idx) => (
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
                )}

                <SectionCard title="Naratif">
                  {renderNaratifFields()}
                  <div className="flex justify-end mt-3">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold shadow"
                    >
                      Simpan Rubrik
                    </button>
                  </div>
                </SectionCard>
              </form>

              <SectionCard title={`Senarai ${activeLevelLabel} ${activeSub === "preskriptif" ? "Preskriptif" : "Diagnostik"}`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                        <th className="px-4 py-2 text-left border border-gray-200">{labels.codeLabel}</th>
                        <th className="px-4 py-2 text-left border border-gray-200">{labels.nameLabel}</th>
                        {activeSub === "preskriptif" ? (
                          <>
                            <th className="px-4 py-2 text-left border border-gray-200">Tema</th>
                            <th className="px-4 py-2 text-left border border-gray-200">Key Elements</th>
                            <th className="px-4 py-2 text-left border border-gray-200">Naratif</th>
                          </>
                        ) : (
                          <>
                            <th className="px-4 py-2 text-left border border-gray-200">Indeks Menurun</th>
                            <th className="px-4 py-2 text-left border border-gray-200">Indeks Kekal</th>
                            <th className="px-4 py-2 text-left border border-gray-200">Indeks Meningkat</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEntries.map((row: any, idx) => (
                        <tr key={`${row.kod}-${idx}`} className="hover:bg-gray-50 border border-gray-200 align-top">
                          <td className="px-4 py-2 font-semibold text-gray-900">{row.kod}</td>
                          <td className="px-4 py-2 text-gray-800">{row.nama}</td>
                          {activeSub === "preskriptif" ? (
                            <>
                              <td className="px-4 py-2 text-gray-800">{(row as PresEntry).tema_label}</td>
                              <td className="px-4 py-2 text-gray-800">
                                <ul className="list-disc list-inside space-y-1">
                                  {(row as PresEntry).key_items.map((k, i) => (
                                    <li key={i}>{k}</li>
                                  ))}
                                </ul>
                              </td>
                              <td className="px-4 py-2 text-gray-800 whitespace-pre-wrap">{(row as PresEntry).naratif}</td>
                            </>
                          ) : (
                            <>
                              <td className="px-4 py-2 text-gray-800 whitespace-pre-wrap">{(row as DiagEntry).naratif_turun}</td>
                              <td className="px-4 py-2 text-gray-800 whitespace-pre-wrap">{(row as DiagEntry).naratif_kekal}</td>
                              <td className="px-4 py-2 text-gray-800 whitespace-pre-wrap">{(row as DiagEntry).naratif_naik}</td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredEntries.length === 0 && (
                    <p className="text-sm text-gray-600 text-center py-6">Tiada rekod untuk paparan ini.</p>
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
