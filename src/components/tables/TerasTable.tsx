import { PlusIcon } from "@heroicons/react/24/outline";
import Table from "../Table";
import Button from "../Button";
import { getAllTeras } from "../../lib/dataLookup";
import { Teras } from "../../data/teras";

type TerasTableProps = {
  onAdd?: () => void;
  onView?: (teras: Teras) => void;
  onEdit?: (teras: Teras) => void;
  onDelete?: (teras: Teras) => void;
};

function TerasTable({ onAdd, onView, onEdit, onDelete }: TerasTableProps) {
  const terasData = getAllTeras();

  const columns = [
    {
      header: "Kod Teras",
      accessor: "Kod Teras" as keyof Teras,
      width: "20%",
    },
    {
      header: "Nama Teras",
      accessor: "Nama Teras" as keyof Teras,
      width: "80%",
    },
  ];

  return (
    <Table
      columns={columns}
      data={terasData}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      searchPlaceholder="Cari teras..."
      actionButtons={
        onAdd && (
          <Button
            variant="primary"
            size="sm"
            icon={<PlusIcon className="h-4 w-4" />}
            onClick={onAdd}
          >
            Tambah Teras
          </Button>
        )
      }
    />
  );
}

export default TerasTable;