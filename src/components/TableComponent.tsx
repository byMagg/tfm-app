import { useMatches } from "@/hooks/useMatches";
import { usePagination } from "@/hooks/usePagination";
import type { Match } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { navigate } from "astro:transitions/client";
import { DataTable } from "./DataTable";
import { Button } from "./ui/button";

const columns: ColumnDef<Match>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "tourney_name",
    header: "Tourney Name",
  },
  {
    accessorKey: "surface",
    header: "Surface",
  },
  {
    accessorKey: "tourney_date",
    header: "Tourney Date",
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
              navigate(`/matches/${original._id}`);
            }}
          >
            Detail
          </Button>
        </div>
      );
    },
  },
];

export default function TableComponent() {
  const { limit, onPaginationChange, offset, pagination } = usePagination();

  const { matches, count, loading } = useMatches({ limit, offset });

  const pageCount = Math.round(count / limit);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={matches}
        pageCount={pageCount}
        loading={loading}
        onPaginationChange={onPaginationChange}
        pagination={pagination}
      />
    </div>
  );
}
