import { PlusIcon } from "@heroicons/react/24/outline";
import Table from "../Table";
import Button from "../Button";
import { pemilikData } from "../../data/pemilikData";
import { PemilikData } from "../../data/pemilikData";

type PemilikDataTableProps = {
  onAdd?: () => void;
  onView?: (data: PemilikData) => void;
  onEdit?: (data: PemilikData) => void;
  onDelete?: (data: PemilikData) => void;
};

function PemilikDataTable({ onAdd, onView, onEdit, onDelete }: PemilikDataTableProps) {
  const columns = [
    {
      header: "Logo",
      accessor: "Kod Jabatan" as keyof PemilikData,
      width: "10%",
      render: (value: string) => (
        <div className="flex justify-center">
          <img 
            src={`/src/assets/images/pemilik-data/${value}.png`}
            alt={value}
            className="h-10 w-10 object-contain"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="%23e5e7eb"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="sans-serif" font-size="12">No Logo</text></svg>';
            }}
          />
        </div>
      ),
    },
    {
      header: "Kod Agensi",
      accessor: "Kod Agensi" as keyof PemilikData,
      width: "12%",
    },
    {
      header: "Nama Agensi",
      accessor: "Nama Agensi" as keyof PemilikData,
      width: "28%",
    },
    {
      header: "Kod Jabatan",
      accessor: "Kod Jabatan" as keyof PemilikData,
      width: "12%",
    },
    {
      header: "Nama Jabatan",
      accessor: "Nama Jabatan" as keyof PemilikData,
      width: "28%",
    },
  ];

  return (
    <Table
      columns={columns}
      data={pemilikData}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      searchPlaceholder="Cari agensi atau jabatan..."
      actionButtons={
        onAdd && (
          <Button
            variant="primary"
            size="sm"
            icon={<PlusIcon className="h-4 w-4" />}
            onClick={onAdd}
          >
            Tambah Pemilik Data
          </Button>
        )
      }
    />
  );
}

export default PemilikDataTable;
