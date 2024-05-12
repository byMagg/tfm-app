import { usePagination } from "@/hooks/usePagination";
import { usePlayers } from "@/hooks/usePlayers";
import type { Match } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { navigate } from "astro:transitions/client";
import { DataTable } from "./DataTable";
import { Button } from "./ui/button";

const columns: ColumnDef<Match>[] = [
  {
    accessorKey: "name_first",
    header: "First Name",
  },
  {
    accessorKey: "name_last",
    header: "Last Name",
  },

  {
    accessorKey: "ioc",
    header: "IOC",
  },
  {
    accessorKey: "hand",
    header: "Hand",
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
              navigate(`/players/${original._id}`);
            }}
          >
            Detail
          </Button>
        </div>
      );
    },
  },
];

export default function TablePlayersComponent() {
  const { limit, onPaginationChange, offset, pagination } = usePagination();

  const { players, count, loading } = usePlayers({ limit, offset });

  const pageCount = Math.round(count / limit);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={players}
        pageCount={pageCount}
        loading={loading}
        onPaginationChange={onPaginationChange}
        pagination={pagination}
      />
    </div>
  );
}
