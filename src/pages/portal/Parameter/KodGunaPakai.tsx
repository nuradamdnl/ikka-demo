import Header from "../../../components/Header";
import Topbar from "../../../components/Topbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import SectionCard from "../../../components/SectionCard";
import Table from "../../../components/Table";
import kodGunaPakaiData from "../../../assets/data/KodGunaPakai.json";

type KodGunaPakai = {
  "Kod Guna Pakai": string;
  "Keterangan Kod Guna Pakai": string;
};

function KodGunaPakai() {
  const columns = [
    {
      header: "Kod Guna Pakai",
      accessor: "Kod Guna Pakai" as keyof KodGunaPakai,
      width: "15%",
    },
    {
      header: "Keterangan",
      accessor: "Keterangan Kod Guna Pakai" as keyof KodGunaPakai,
      width: "85%",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Topbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <PageTitle>Kod Guna Pakai</PageTitle>
            <SectionCard title="Senarai Kod Guna Pakai">
              <Table
                columns={columns}
                data={kodGunaPakaiData as KodGunaPakai[]}
                searchable={false}
              />
            </SectionCard>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default KodGunaPakai;
