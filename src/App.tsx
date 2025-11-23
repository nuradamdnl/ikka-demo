import { BrowserRouter, Routes, Route } from "react-router-dom";
import LamanUtama from "./pages/web/LamanUtama";
import TentangKajian from "./pages/web/TentangKajian";
import AktivitiKajian from "./pages/web/AktivitiKajian";
import LogMasuk from "./pages/portal/LogMasuk";
import PapanUtama from "./pages/portal/PapanUtama";
import PengurusanParameter from "./pages/portal/PengurusanParameter";
import StrukturIndeks from "./pages/portal/StrukturIndeks";

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
        <Route path="/struktur-indeks" element={<StrukturIndeks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
