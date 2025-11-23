import { PlusIcon } from "@heroicons/react/24/outline";
import Table from "../Table";
import Button from "../Button";
import { komponen } from "../../data/komponen";
import { Komponen } from "../../data/komponen";
import { getTerasByKod } from "../../lib/dataLookup";

type KomponenTableProps = {
  onAdd?: () => void;
  onView?: (komponen: Komponen) => void;
  onEdit?: (komponen: Komponen) => void;
  onDelete?: (komponen: Komponen) => void;
  filterByTeras?: string;
};

function KomponenTable({ onAdd, onView, onEdit, onDelete, filterByTeras }: KomponenTableProps) {
  const komponenData = filterByTeras
    ? komponen.filter((k) => k["Kod Teras"] === filterByTeras)
    : komponen;

  const columns = [
    {
      header: "Kod Komponen",
      accessor: "Kod Komponen" as keyof Komponen,
      width: "15%",
    },
    {
      header: "Nama Komponen",
      accessor: "Nama Komponen" as keyof Komponen,
      width: "50%",
    },
    {
      header: "Kod Teras",
      accessor: "Kod Teras" as keyof Komponen,
      width: "15%",
    },
    {
      header: "Teras",
      accessor: (row: Komponen) => {
        const teras = getTerasByKod(row["Kod Teras"]);
        return teras ? teras["Nama Teras"] : row["Kod Teras"];
      },
      width: "20%",
    },
  ];

  return (
    <Table
      columns={columns}
      data={komponenData}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      searchPlaceholder="Cari komponen..."
      actionButtons={
        onAdd && (
          <Button
            variant="primary"
            size="sm"
            icon={<PlusIcon className="h-4 w-4" />}
            onClick={onAdd}
          >
            Tambah Komponen
          </Button>
        )
      }
    />
  );
}

export default KomponenTable;