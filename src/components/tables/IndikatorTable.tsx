import { PlusIcon } from "@heroicons/react/24/outline";
import Table from "../Table";
import Button from "../Button";
import { indikator } from "../../data/indikator";
import { Indikator } from "../../data/indikator";
import { getKomponenByKod } from "../../lib/dataLookup";

type IndikatorTableProps = {
  onAdd?: () => void;
  onView?: (indikator: Indikator) => void;
  onEdit?: (indikator: Indikator) => void;
  onDelete?: (indikator: Indikator) => void;
  filterByKomponen?: string;
  filterByTeras?: string;
};

function IndikatorTable({
  onAdd,
  onView,
  onEdit,
  onDelete,
  filterByKomponen,
  filterByTeras,
}: IndikatorTableProps) {
  let indikatorData = indikator;

  if (filterByKomponen) {
    indikatorData = indikatorData.filter(
      (i) => i["Kod Komponen"] === filterByKomponen
    );
  } else if (filterByTeras) {
    indikatorData = indikatorData.filter(
      (i) => i["Kod Teras"] === filterByTeras
    );
  }

  const columns = [
    {
      header: "Kod Indikator",
      accessor: "Kod Indikator" as keyof Indikator,
      width: "12%",
    },
    {
      header: "Nama Indikator",
      accessor: "Nama Indikator" as keyof Indikator,
      width: "40%",
    },
    {
      header: "Kod Komponen",
      accessor: "Kod Komponen" as keyof Indikator,
      width: "12%",
    },
    {
      header: "Komponen",
      accessor: (row: Indikator) => {
        const komp = getKomponenByKod(row["Kod Komponen"]);
        return komp ? komp["Nama Komponen"] : row["Kod Komponen"];
      },
      width: "25%",
    },
    {
      header: "Sumber",
      accessor: "Sumber" as keyof Indikator,
      width: "11%",
    },
  ];

  return (
    <Table
      columns={columns}
      data={indikatorData}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      searchPlaceholder="Cari indikator..."
      actionButtons={
        onAdd && (
          <Button
            variant="primary"
            size="sm"
            icon={<PlusIcon className="h-4 w-4" />}
            onClick={onAdd}
          >
            Tambah Indikator
          </Button>
        )
      }
    />
  );
}

export default IndikatorTable;