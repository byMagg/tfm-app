import { useLeagues } from "@/hooks/useLeagues";
import { usePagination } from "@/hooks/usePagination";
import { type League } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { navigate } from "astro:transitions/client";
import { DataTable } from "./DataTable";
import { Button } from "./ui/button";

const columns: ColumnDef<League>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
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
              console.log(original._id);
              navigate(`/leagues/${original._id}`);
            }}
          >
            Detail
          </Button>
        </div>
      );
    },
  },
];

export default function TableLeaguesComponent() {
  const { limit, onPaginationChange, offset, pagination } = usePagination();

  const { leagues, count, loading } = useLeagues({ limit, offset });

  const pageCount = Math.round(count / limit);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={leagues}
        pageCount={pageCount}
        loading={loading}
        onPaginationChange={onPaginationChange}
        pagination={pagination}
      />
    </div>
  );
}
