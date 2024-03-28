import { useAccidents } from "@/hooks/useFetchAPI";
import { usePagination } from "@/hooks/usePagination";
import { DataTable } from "./DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import type { Accident } from "@/types";

const columns: ColumnDef<Accident>[] = [
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "Severity",
    header: "Severity",
  },
  {
    accessorKey: "Country",
    header: "Country",
  },
  {
    accessorKey: "Zipcode",
    header: "Zipcode",
  },
  {
    accessorKey: "State",
    header: "State",
  },
  {
    accessorKey: "Weather_Condition",
    header: "Weather Condition",
  },
  {
    accessorKey: "Wind_Direction",
    header: "Wind Direction",
  },
];

export default function TableComponent() {
  const { limit, onPaginationChange, offset, pagination } = usePagination();

  const { accidents, count, loading } = useAccidents({ limit, offset });

  const pageCount = Math.round(count / limit);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={accidents}
        pageCount={pageCount}
        loading={loading}
        onPaginationChange={onPaginationChange}
        pagination={pagination}
      />
    </div>
  );
}
