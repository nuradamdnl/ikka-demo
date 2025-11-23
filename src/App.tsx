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
        <Route path="/struktur-indeks" element={<StrukturIndeks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
