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
      header: "Kod Agensi",
      accessor: "Kod Agensi" as keyof PemilikData,
      width: "15%",
    },
    {
      header: "Nama Agensi",
      accessor: "Nama Agensi" as keyof PemilikData,
      width: "35%",
    },
    {
      header: "Kod Jabatan",
      accessor: "Kod Jabatan" as keyof PemilikData,
      width: "15%",
    },
    {
      header: "Nama Jabatan",
      accessor: "Nama Jabatan" as keyof PemilikData,
      width: "35%",
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
