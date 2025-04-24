import { Link } from "@/components/Link";
import { useLeagues } from "@/hooks/useLeagues";
import { usePagination } from "@/hooks/usePagination";
import { type League } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";

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
          <Link to={`/leagues/${original._id}`} viewTransition>
            Ver
          </Link>
        </div>
      );
    },
  },
];

export default function TableLeaguesComponent() {
  const { limit, onPaginationChange, page, pagination } = usePagination();

  const { leagues, count, loading } = useLeagues({
    limit,
    page: page + 1,
  });

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
