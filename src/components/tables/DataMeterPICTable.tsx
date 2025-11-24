import { BellAlertIcon } from "@heroicons/react/24/outline";
import Button from "../Button";

interface DataMeterPICTableProps {
  onAlert: (pic: any) => void;
}

const dataMeterPICData = [
  {
    "Senarai Indikator": "Bilangan perintah tahanan atas kesalahan di bawah kesalahan terhadap negara (Bab 6 KK)",
    "Nama PIC": "Ahmad bin Abdullah",
    "Jabatan PIC": "PDRM",
    "No Telefon": "03-2266 2222",
    "Status Data Meter": "Lengkap"
  },
  {
    "Senarai Indikator": "Bilangan perintah tahanan berkaitan kes keganasan (6A KK)",
    "Nama PIC": "Siti Nurhaliza binti Hassan",
    "Jabatan PIC": "PDRM",
    "No Telefon": "03-2266 2223",
    "Status Data Meter": "Tidak Lengkap"
  },
  {
    "Senarai Indikator": "Bilangan kes rasuah yang dirujuk ke SPRM",
    "Nama PIC": "Rajesh Kumar a/l Subramaniam",
    "Jabatan PIC": "SPRM",
    "No Telefon": "03-8870 7777",
    "Status Data Meter": "Lengkap"
  },
  {
    "Senarai Indikator": "Bilangan penangkapan di sempadan Malaysia",
    "Nama PIC": "Wong Mei Ling",
    "Jabatan PIC": "JIM",
    "No Telefon": "03-8880 1111",
    "Status Data Meter": "Tidak Lengkap"
  },
  {
    "Senarai Indikator": "Bilangan dadah yang dirampas",
    "Nama PIC": "Muhammad Hafiz bin Ibrahim",
    "Jabatan PIC": "AADK",
    "No Telefon": "03-8000 8000",
    "Status Data Meter": "Lengkap"
  },
  {
    "Senarai Indikator": "Bilangan kes jenayah siber yang dilaporkan",
    "Nama PIC": "Tan Siew Lan",
    "Jabatan PIC": "CYSC",
    "No Telefon": "03-8992 6888",
    "Status Data Meter": "Tidak Lengkap"
  },
  {
    "Senarai Indikator": "Bilangan perintah pengawasan polis berkaitan kes keganasan",
    "Nama PIC": "Nurul Izzah binti Mohd Ali",
    "Jabatan PIC": "PDRM",
    "No Telefon": "03-2266 2224",
    "Status Data Meter": "Lengkap"
  },
  {
    "Senarai Indikator": "Bilangan aduan ajaran sesat yang diterima",
    "Nama PIC": "Mohd Firdaus bin Yusof",
    "Jabatan PIC": "JAKIM",
    "No Telefon": "03-8886 4000",
    "Status Data Meter": "Tidak Lengkap"
  }
];

function DataMeterPICTable({ onAlert }: DataMeterPICTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Senarai Indikator
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Nama PIC
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Jabatan PIC
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              No Telefon
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Status Data Meter
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold">
              Tindakan
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {dataMeterPICData.map((pic, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-700">
                {pic["Senarai Indikator"]}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {pic["Nama PIC"]}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {pic["Jabatan PIC"]}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {pic["No Telefon"]}
              </td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    pic["Status Data Meter"] === "Lengkap"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {pic["Status Data Meter"]}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onAlert(pic)}
                  className="inline-flex items-center gap-1"
                >
                  <BellAlertIcon className="w-4 h-4" />
                  Beri Peringatan
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataMeterPICTable;
