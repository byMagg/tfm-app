import { useAccidents } from "@/hooks/useAccidents";
import { usePagination } from "@/hooks/usePagination";
import type { Accident } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { navigate } from "astro:transitions/client";
import { DataTable } from "./DataTable";
import { Button } from "./ui/button";

const columns: ColumnDef<Accident>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const { original } = row;
      return (
        <div className="flex items-center justify-center">
          <Button
            size="sm"
            variant="link"
            onClick={() => {
              console.log(original.ID);
              navigate(`/accidents/${original.ID}`);
            }}
          >
            Edit
          </Button>
        </div>
      );
    },
  },
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
