import { Link } from "@/components/Link";
import { usePagination } from "@/hooks/usePagination";
import { usePlayers } from "@/hooks/usePlayers";
import { Country, type Player } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";

const columns: ColumnDef<Player>[] = [
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
    cell: ({ row }) => {
      const { original } = row;

      const countryCode = Country[original.ioc as keyof typeof Country];
      return (
        <div className="flex items-center">
          <img
            src={`/svgs/${countryCode}.svg`}
            alt={original.ioc}
            height={30}
            width={30}
          />
          <span className="ml-2">{original.ioc}</span>
        </div>
      );
    },
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
          <Link to={`/players/${original._id}`}>Ver</Link>
        </div>
      );
    },
  },
];

export default function TablePlayersComponent() {
  const { limit, onPaginationChange, page, pagination } = usePagination();

  const { players, count, loading } = usePlayers({
    limit,
    page: page + 1,
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
