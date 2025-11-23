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
import PenetapanTahunAsas from "./pages/portal/Parameter/PenetapanTahunAsas";
import PenetapanIndikator from "./pages/portal/Parameter/PenetapanIndikator";
import PenetapanKomponen from "./pages/portal/Parameter/PenetapanKomponen";
import PenetapanTeras from "./pages/portal/Parameter/PenetapanTeras";
import PenjanaanIndeks from "./pages/portal/PenjanaanIndeks";
import PilihanPemilikData from "./pages/portal/KemasukanData/PilihanPemilikData";
import BorangData from "./pages/portal/KemasukanData/BorangData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LamanUtama />} />
        <Route path="/tentang-kajian" element={<TentangKajian />} />
        <Route path="/aktiviti-kajian" element={<AktivitiKajian />} />
        <Route path="/log-masuk" element={<LogMasuk />} />
        <Route path="/papan-utama" element={<PapanUtama />} />
        <Route path="/pengurusan-parameter" element={<PengurusanParameter />} />
        <Route path="/pengurusan-parameter/teras" element={<Teras />} />
        <Route path="/pengurusan-parameter/komponen" element={<Komponen />} />
        <Route path="/pengurusan-parameter/indikator" element={<Indikator />} />
        <Route path="/pengurusan-parameter/pemilik-data" element={<PemilikData />} />
        <Route path="/pengurusan-parameter/kod-guna-pakai" element={<KodGunaPakai />} />
        <Route path="/pengurusan-parameter/rubrik" element={<Rubrik />} />
        <Route path="/pengurusan-parameter/penetapan-tahun-asas" element={<PenetapanTahunAsas />} />
        <Route path="/pengurusan-parameter/penetapan-indikator" element={<PenetapanIndikator />} />
        <Route path="/pengurusan-parameter/penetapan-komponen" element={<PenetapanKomponen />} />
        <Route path="/pengurusan-parameter/penetapan-teras" element={<PenetapanTeras />} />
        <Route path="/struktur-indeks" element={<StrukturIndeks />} />
        <Route path="/kemasukan-data/pilihan-pemilik-data" element={<PilihanPemilikData />} />
        <Route path="/kemasukan-data/borang-data" element={<BorangData />} />
        <Route path="/penjanaan-indeks" element={<PenjanaanIndeks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
