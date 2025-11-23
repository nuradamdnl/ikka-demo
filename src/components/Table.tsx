import { useState } from "react";
import { MagnifyingGlassIcon, PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";

type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  width?: string;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  onView?: (row: T, index: number) => void;
  onEdit?: (row: T, index: number) => void;
  onDelete?: (row: T, index: number) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  actionButtons?: React.ReactNode;
};

function Table<T extends Record<string, any>>({
  columns,
  data,
  onView,
  onEdit,
  onDelete,
  searchable = true,
  searchPlaceholder = "Cari...",
  actionButtons,
}: TableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = searchable
    ? data.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  const getCellValue = (row: T, column: Column<T>) => {
    if (typeof column.accessor === "function") {
      return column.accessor(row);
    }
    return row[column.accessor];
  };

  const showActions = onView || onEdit || onDelete;

  return (
    <div className="space-y-4">
      {/* Search Bar and Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        {searchable && (
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
        {actionButtons && <div className="flex gap-2">{actionButtons}</div>}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-900 to-blue-800">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider"
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
              {showActions && (
                <th className="px-6 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Tindakan
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (showActions ? 1 : 0)}
                  className="px-6 py-8 text-center text-sm text-gray-500"
                >
                  Tiada data ditemui
                </td>
              </tr>
            ) : (
              filteredData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 text-sm text-gray-900"
                    >
                      {getCellValue(row, column)}
                    </td>
                  ))}
                  {showActions && (
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        {onView && (
                          <button
                            onClick={() => onView(row, rowIndex)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Lihat"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row, rowIndex)}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                            title="Edit"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row, rowIndex)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Padam"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Results Count */}
      {searchable && filteredData.length > 0 && (
        <div className="text-sm text-gray-600">
          Menunjukkan {filteredData.length} daripada {data.length} rekod
        </div>
      )}
    </div>
  );
}

export default Table;
