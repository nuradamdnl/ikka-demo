import Header from "../../components/Header";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import StatCard from "../../components/StatCard";
import PageTitle from "../../components/PageTitle";
import SectionCard from "../../components/SectionCard";
import {
  ScaleIcon,
  ShareIcon,
  QueueListIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { getAllTeras, getKomponenByTeras, getIndikatorByTeras } from "../../lib/dataLookup";
import GaugeCard from "../../components/GaugeCard";
import InfoCard from "../../components/InfoCard";
import { useMemo, useState } from "react";

function PapanUtama() {
  const [tab, setTab] = useState<"mingguan" | "bulanan">("mingguan");
  const totalTeras = getAllTeras().length;
  const totalKomponen = getAllTeras().reduce(
    (sum, teras) => sum + getKomponenByTeras(teras["Kod Teras"]).length,
    0
  );
  const totalIndikator = getAllTeras().reduce(
    (sum, teras) => sum + getIndikatorByTeras(teras["Kod Teras"]).length,
    0
  );

  const leaderboard = useMemo(
    () => ({
      mingguan: [
        { rank: 1, agensi: "PDRM", jabatan: "Cawangan Khas", code: "JSPT", skor: 94, delta: "+2", activity: "42 kemas kini minggu ini" },
        { rank: 2, agensi: "SPRM", jabatan: "Unit Integriti", code: "SPRM", skor: 91, delta: "0", activity: "38 kemas kini" },
        { rank: 3, agensi: "KDN", jabatan: "Bhgn. Pembangunan", code: "BPSM", skor: 88, delta: "-1", activity: "33 kemas kini" },
        { rank: 4, agensi: "JIMM", jabatan: "Jabatan Imigresen Malaysia", code: "JIMM", skor: 82, delta: "+1", activity: "29 kemas kini" },
        { rank: 5, agensi: "AADK", jabatan: "Operasi & Rehabilitasi", code: "AADK", skor: 79, delta: "+3", activity: "25 kemas kini" },
      ],
      bulanan: [
        { rank: 1, agensi: "SPRM", jabatan: "Unit Integriti", code: "SPRM", skor: 96, delta: "+1", activity: "162 kemas kini bulan ini" },
        { rank: 2, agensi: "PDRM", jabatan: "JSPT", code: "JSPT", skor: 94, delta: "+2", activity: "155 kemas kini" },
        { rank: 3, agensi: "APMM", jabatan: "Operasi Sempadan", code: "APMM", skor: 90, delta: "-1", activity: "143 kemas kini" },
        { rank: 4, agensi: "JIM", jabatan: "Penguatkuasaan", code: "JIMM", skor: 86, delta: "+1", activity: "131 kemas kini" },
        { rank: 5, agensi: "AADK", jabatan: "Operasi & Rehabilitasi", code: "AADK", skor: 83, delta: "0", activity: "118 kemas kini" },
      ],
    }),
    []
  );

  const userPosition = useMemo(
    () => ({ rank: 6, agensi: "PDRM", jabatan: "JSPT", gap: "Lagi 8 kemas kini untuk ke Top 5" }),
    []
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Papan Utama</PageTitle>

            {/* Statistics Section */}
            <SectionCard title="Instrumen dan Indeks Terkini">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <StatCard
                  icon={<ScaleIcon className="w-6 h-6" />}
                  title="Jumlah Teras"
                  value={totalTeras}
                  subtitle="Teras IKKA"
                />
                <StatCard
                  icon={<ShareIcon className="w-6 h-6" />}
                  title="Jumlah Komponen"
                  value={totalKomponen}
                  subtitle="Komponen IKKA"
                />
                <StatCard
                  icon={<QueueListIcon className="w-6 h-6" />}
                  title="Jumlah Indikator"
                  value={totalIndikator}
                  subtitle="Indikator IKKA"
                />
                <StatCard
                  icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
                  title="Indeks Tahun Terkini"
                  value={104.3}
                  subtitle={<span className="text-green-600">▲ +1.5%</span>}
                />
                <StatCard
                  icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
                  title="Indeks Penggal Terkini"
                  value={101.1}
                  subtitle={<span className="text-red-600">▼ -0.8%</span>}
                />
              </div>
            </SectionCard>

            <SectionCard title="Leaderboard Agensi/Jabatan">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex gap-2">
                  {(["mingguan", "bulanan"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold transition ${
                        tab === t ? "bg-blue-900 text-white shadow" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {t === "mingguan" ? "Mingguan" : "Bulanan"}
                    </button>
                  ))}
                </div>
                <div className="text-sm text-gray-700">
                  Kedudukan anda: <span className="font-semibold text-blue-900">#{userPosition.rank}</span> — {userPosition.gap}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leaderboard[tab].map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          item.rank === 1
                            ? "bg-yellow-100 text-yellow-800"
                            : item.rank === 2
                            ? "bg-gray-200 text-gray-800"
                            : item.rank === 3
                            ? "bg-amber-200 text-amber-900"
                            : "bg-blue-50 text-blue-900"
                        }`}
                      >
                        #{item.rank}
                      </div>
                      <img
                        src={`/src/assets/images/pemilik-data/${item.code}.png`}
                        alt={`${item.agensi} logo`}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{item.agensi} · {item.jabatan}</p>
                      <p className="text-xs text-gray-600">{item.activity}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${
                              item.rank === 1 ? "bg-blue-900" : "bg-blue-500"
                            }`}
                            style={{ width: `${Math.min(item.skor, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-800">{item.skor}</span>
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-green-700">
                      {item.delta}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Skor gabungan berdasarkan jumlah dan ketepatan kemas kini terkini, kadar kelengkapan serta pematuhan validasi.
              </p>
            </SectionCard>
            <SectionCard title="Status Kemasukan Data">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <GaugeCard title="Teras 1" value={75} />
                <GaugeCard title="Teras 2" value={85} />
                <GaugeCard title="Teras 3" value={63} />
                <GaugeCard title="Teras 4" value={40} />
                <GaugeCard title="Teras 5" value={95} />
              </div>
            </SectionCard>
            <SectionCard title="Berita Semasa">
              <div className="space-y-4">
                {/* News item 1 */}
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg shadow-sm">
                  <span className="text-yellow-600 text-xl">📰</span>
                  <div>
                    <p className="text-gray-900 font-medium">
                      Kemaskini garis panduan indikator Q3 telah diterbitkan.
                    </p>
                    <span className="text-sm text-gray-500">23 Nov 2025 • 18:11</span>
                  </div>
                </div>

                {/* News item 2 */}
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg shadow-sm">
                  <span className="text-blue-600 text-xl">⚙️</span>
                  <div>
                    <p className="text-gray-900 font-medium">
                      Penambahbaikan borang kemasukan data: validasi medan “Bilangan Kes”.
                    </p>
                    <span className="text-sm text-gray-500">23 Nov 2025 • 18:11</span>
                  </div>
                </div>

                {/* News item 3 */}
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg shadow-sm">
                  <span className="text-green-600 text-xl">📅</span>
                  <div>
                    <p className="text-gray-900 font-medium">
                      Jadual semakan data antara agensi ditetapkan pada 28–30 Aug.
                    </p>
                    <span className="text-sm text-gray-500">23 Nov 2025 • 18:11</span>
                  </div>
                </div>
              </div>
            </SectionCard>
            <SectionCard title="Analitik">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <InfoCard image="src/assets/images/chart-blue.png" title="Deskriptif" subtitle="Melihat paten indeks indikator dan komponen" />
              <InfoCard image="src/assets/images/chart-purple.png" title="Diagnostik" subtitle="Mendiagnostik paten indeks" />
              <InfoCard image="src/assets/images/chart-turqoise.png" title="Prediktif" subtitle="Meramal paten indeks" />
              <InfoCard image="src/assets/images/chart-yellow.png" title="Preskriptif" subtitle="Menyarankan tindakan berdasarkan indeks" />
              </div>
            </SectionCard>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default PapanUtama;
