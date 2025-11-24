import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import PowerBIEmbed from "../../../components/PowerBIEmbed";

function AnalitikDiagnostikIndikatorByIndikator() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Analitik Diagnostik - Indikator by Indikator</PageTitle>
            <PowerBIEmbed title="Indikator by Indikator" />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AnalitikDiagnostikIndikatorByIndikator;
