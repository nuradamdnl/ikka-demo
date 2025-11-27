import { BrowserRouter, Routes, Route } from "react-router-dom";
import LamanUtama from "./pages/web/LamanUtama";
import TentangKajian from "./pages/web/TentangKajian";
import AktivitiKajian from "./pages/web/AktivitiKajian";
import LogMasuk from "./pages/portal/LogMasuk";
import PapanUtama from "./pages/portal/PapanUtama";
import PengurusanParameter from "./pages/portal/PengurusanParameter";
import StrukturIndeks from "./pages/portal/StrukturIndeks";
import Teras from "./pages/portal/Parameter/Teras";
import Komponen from "./pages/portal/Parameter/Komponen";
import Indikator from "./pages/portal/Parameter/Indikator";
import PemilikData from "./pages/portal/Parameter/PemilikData";
import KodGunaPakai from "./pages/portal/Parameter/KodGunaPakai";
import Rubrik from "./pages/portal/Parameter/Rubrik";
import DataMeter from "./pages/portal/Parameter/DataMeter";
import PenetapanTahunAsas from "./pages/portal/Parameter/PenetapanTahunAsas";
import PenetapanIndikator from "./pages/portal/Parameter/PenetapanIndikator";
import PenetapanKomponen from "./pages/portal/Parameter/PenetapanKomponen";
import PenetapanTeras from "./pages/portal/Parameter/PenetapanTeras";
import PenjanaanIndeksIndikator from "./pages/portal/PenjanaanIndeks/PenjanaanIndeksIndikator";
import PenjanaanIndeksKomponen from "./pages/portal/PenjanaanIndeks/PenjanaanIndeksKomponen";
import PenjanaanIndeksTeras from "./pages/portal/PenjanaanIndeks/PenjanaanIndeksTeras";
import AnalisisIndeks from "./pages/portal/AnalisisIndeks";
import PilihanPemilikData from "./pages/portal/KemasukanData/PilihanPemilikData";
import BorangData from "./pages/portal/KemasukanData/BorangData";
import AnalitikDeskriptifTeras from "./pages/portal/Analitik/AnalitikDeskriptifTeras";
import AnalitikDeskriptifKomponenKeseluruhan from "./pages/portal/Analitik/AnalitikDeskriptifKomponenKeseluruhan";
import AnalitikDeskriptifKomponen from "./pages/portal/Analitik/AnalitikDeskriptifKomponen";
import AnalitikDiagnostikTeras from "./pages/portal/Analitik/AnalitikDiagnostikTeras";
import AnalitikDiagnostikTerasByKomponen from "./pages/portal/Analitik/AnalitikDiagnostikTerasByKomponen";
import AnalitikDiagnostikKomponenByIndikator from "./pages/portal/Analitik/AnalitikDiagnostikKomponenByIndikator";
import AnalitikDiagnostikKomponenByIndikatorDetail from "./pages/portal/Analitik/AnalitikDiagnostikKomponenByIndikatorDetail";
import AnalitikDiagnostikIndikatorByIndikator from "./pages/portal/Analitik/AnalitikDiagnostikIndikatorByIndikator";
import AnalitikPrediktifTeras from "./pages/portal/Analitik/AnalitikPrediktifTeras";
import AnalitikPrediktifKomponen from "./pages/portal/Analitik/AnalitikPrediktifKomponen";
import AnalitikPreskriptifTeras from "./pages/portal/Analitik/AnalitikPreskriptifTeras";
import AnalitikPreskriptifTerasPreskriptif from "./pages/portal/Analitik/AnalitikPreskriptifTerasPreskriptif";
import AnalitikPreskriptifTerasKomponen from "./pages/portal/Analitik/AnalitikPreskriptifTerasKomponen";
import AnalitikPreskriptifKomponen from "./pages/portal/Analitik/AnalitikPreskriptifKomponen";
import AnalitikPreskriptifKomponenPreskriptif from "./pages/portal/Analitik/AnalitikPreskriptifKomponenPreskriptif";
import AnalitikPreskriptifKomponenIndikator from "./pages/portal/Analitik/AnalitikPreskriptifKomponenIndikator";
import AnalitikPreskriptifIndikator from "./pages/portal/Analitik/AnalitikPreskriptifIndikator";
import LaporanStrategik from "./pages/portal/LaporanStrategik";
import SelenggaraPengguna from "./pages/portal/SelenggaraPengguna";
import DaftarPemilikData from "./pages/portal/DaftarPemilikData";
import ProfilPengguna from "./pages/portal/ProfilPengguna";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LamanUtama />} />
        <Route path="/tentang-kajian" element={<TentangKajian />} />
        <Route path="/aktiviti-kajian" element={<AktivitiKajian />} />
        <Route path="/log-masuk" element={<LogMasuk />} />
        <Route path="/daftar-pemilik-data" element={<DaftarPemilikData />} />
        <Route path="/profil" element={<ProfilPengguna />} />
        <Route path="/papan-utama" element={<PapanUtama />} />
        <Route path="/pengurusan-parameter" element={<PengurusanParameter />} />
        <Route path="/pengurusan-parameter/teras" element={<Teras />} />
        <Route path="/pengurusan-parameter/komponen" element={<Komponen />} />
        <Route path="/pengurusan-parameter/indikator" element={<Indikator />} />
        <Route path="/pengurusan-parameter/pemilik-data" element={<PemilikData />} />
        <Route path="/pengurusan-parameter/kod-guna-pakai" element={<KodGunaPakai />} />
        <Route path="/pengurusan-parameter/rubrik" element={<Rubrik />} />
        <Route path="/pengurusan-parameter/data-meter" element={<DataMeter />} />
        <Route path="/pengurusan-parameter/penetapan-tahun-asas" element={<PenetapanTahunAsas />} />
        <Route path="/pengurusan-parameter/penetapan-indikator" element={<PenetapanIndikator />} />
        <Route path="/pengurusan-parameter/penetapan-komponen" element={<PenetapanKomponen />} />
        <Route path="/pengurusan-parameter/penetapan-teras" element={<PenetapanTeras />} />
        <Route path="/struktur-indeks" element={<StrukturIndeks />} />
        <Route path="/kemasukan-data/pilihan-pemilik-data" element={<PilihanPemilikData />} />
        <Route path="/kemasukan-data/borang-data" element={<BorangData />} />
        <Route path="/analisis-indeks" element={<AnalisisIndeks />} />
        <Route path="/penjanaan-indeks/penjanaan-indeks-indikator" element={<PenjanaanIndeksIndikator />} />
        <Route path="/penjanaan-indeks/penjanaan-indeks-komponen" element={<PenjanaanIndeksKomponen />} />
        <Route path="/penjanaan-indeks/penjanaan-indeks-teras" element={<PenjanaanIndeksTeras />} />
        
        {/* Analitik Deskriptif Routes */}
        <Route path="/analitik-deskriptif/teras/:kodTeras" element={<AnalitikDeskriptifTeras />} />
        <Route path="/analitik-deskriptif/teras/:kodTeras/komponen-keseluruhan" element={<AnalitikDeskriptifKomponenKeseluruhan />} />
        <Route path="/analitik-deskriptif/teras/:kodTeras/komponen/:kodKomponen" element={<AnalitikDeskriptifKomponen />} />
        
        {/* Analitik Diagnostik Routes */}
        <Route path="/analitik-diagnostik/teras/:kodTeras" element={<AnalitikDiagnostikTeras />} />
        <Route path="/analitik-diagnostik/teras/:kodTeras/teras-by-komponen" element={<AnalitikDiagnostikTerasByKomponen />} />
        <Route path="/analitik-diagnostik/teras/:kodTeras/komponen-by-indikator" element={<AnalitikDiagnostikKomponenByIndikator />} />
        <Route path="/analitik-diagnostik/teras/:kodTeras/komponen-by-indikator/:kodKomponen" element={<AnalitikDiagnostikKomponenByIndikatorDetail />} />
        <Route path="/analitik-diagnostik/indikator-by-indikator" element={<AnalitikDiagnostikIndikatorByIndikator />} />
        
        {/* Analitik Prediktif Routes */}
        <Route path="/analitik-prediktif/teras/:kodTeras" element={<AnalitikPrediktifTeras />} />
        <Route path="/analitik-prediktif/teras/:kodTeras/komponen/:kodKomponen" element={<AnalitikPrediktifKomponen />} />
        
        {/* Analitik Preskriptif Routes */}
        <Route path="/analitik-preskriptif/teras/:kodTeras" element={<AnalitikPreskriptifTeras />} />
        <Route path="/analitik-preskriptif/teras/:kodTeras/preskriptif" element={<AnalitikPreskriptifTerasPreskriptif />} />
        <Route path="/analitik-preskriptif/teras/:kodTeras/komponen" element={<AnalitikPreskriptifTerasKomponen />} />
        <Route path="/analitik-preskriptif/teras/:kodTeras/komponen/:kodKomponen" element={<AnalitikPreskriptifKomponen />} />
        <Route path="/analitik-preskriptif/teras/:kodTeras/komponen/:kodKomponen/preskriptif" element={<AnalitikPreskriptifKomponenPreskriptif />} />
        <Route path="/analitik-preskriptif/teras/:kodTeras/komponen/:kodKomponen/indikator" element={<AnalitikPreskriptifKomponenIndikator />} />
        <Route path="/analitik-preskriptif/teras/:kodTeras/komponen/:kodKomponen/indikator/:kodIndikator" element={<AnalitikPreskriptifIndikator />} />
        
        <Route path="/laporan-strategik" element={<LaporanStrategik />} />
        <Route path="/selenggara-pengguna" element={<SelenggaraPengguna />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
