import { usePagination } from "@/hooks/usePagination";
import { usePlayersFromLeague } from "@/hooks/usePlayersFromLeague";
import { type User } from "@/types";
import { fetchAstroAPI } from "@/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import { DeleteModal } from "./DeleteModal";

async function handleDelete({
  id,
  leagueId,
}: {
  id: string;
  leagueId: string;
}) {
  await fetchAstroAPI({
    endpoint: `/leagues/${leagueId}`,
    method: "DELETE",
    body: {
      ids: [id],
    },
  });
}

export default function TableUsersComponent({
  playerIds,
  leagueId,
}: {
  playerIds: string[];
  leagueId: string;
}) {
  const { limit, onPaginationChange, offset, pagination } = usePagination();

  const { players, count, loading } = usePlayersFromLeague({
    playerIds,
  });

  const pageCount = Math.round(count / limit);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "_id",
      header: "ID",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "name",
      header: "Display Name",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const { original } = row;

        console.log(original.uid);

        return (
          <div className="flex items-center justify-center">
            <DeleteModal
              onRemove={() => {
                handleDelete({
                  id: original.uid,
                  leagueId: leagueId,
                });
              }}
            />
          </div>
        );
      },
    },
  ];

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
