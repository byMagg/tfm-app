import { usePagination } from "@/hooks/usePagination";
import { usePlayersFromLeague } from "@/hooks/usePlayersFromLeague";
import { type User } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import { Button } from "./ui/button";

async function handleDelete() {
  await fetch(`http://localhost:4321/api/leagues/66ed4a1f413c5a837792015e`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ids: ["VweQHOzRoIMjp926yzHtvbNRI273"],
    }),
  });
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "uid",
    header: "UID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "displayName",
    header: "Display Name",
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
              handleDelete();
            }}
          >
            Detail
          </Button>
        </div>
      );
    },
  },
];

export default function TableUsersComponent({
  playerIds,
}: {
  playerIds: string[];
}) {
  const { limit, onPaginationChange, offset, pagination } = usePagination();

  const { players, count, loading } = usePlayersFromLeague({
    playerIds,
  });

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
