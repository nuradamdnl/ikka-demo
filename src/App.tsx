import { BrowserRouter, Routes, Route } from "react-router-dom";
import LamanUtama from "./pages/LamanUtama";
import TentangKajian from "./pages/TentangKajian";
import AktivitiKajian from "./pages/AktivitiKajian";
import LogMasuk from "./pages/LogMasuk";
import PapanUtama from "./pages/PapanUtama";
import StrukturIndeks from "./pages/StrukturIndeks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LamanUtama />} />
        <Route path="/tentang-kajian" element={<TentangKajian />} />
        <Route path="/aktiviti-kajian" element={<AktivitiKajian />} />
        <Route path="/log-masuk" element={<LogMasuk />} />
        <Route path="/papan-utama" element={<PapanUtama />} />
        <Route path="/struktur-indeks" element={<StrukturIndeks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
