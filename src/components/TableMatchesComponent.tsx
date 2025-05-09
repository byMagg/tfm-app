import { Link } from "@/components/Link";
import { useMatches } from "@/hooks/useMatches";
import { usePagination } from "@/hooks/usePagination";
import type { Match } from "@/types";
import { parseDateString } from "@/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";

const columns: ColumnDef<Match>[] = [
  {
    accessorKey: "tourney_name",
    header: "Tourney Name",
  },
  {
    accessorKey: "surface",
    header: "Surface",
    cell: ({ row }) => {
      const { original } = row;
      if (!original.surface) return null;
      if (typeof original.surface !== "string") return null;

      return (
        <div className="flex items-center space-x-2">
          <img
            style={{
              viewTransitionName: `surface-${row.original._id}`,
            }}
            src={`/images/thumb-${original.surface.toLowerCase()}.webp`}
            alt="clay court"
            width="50"
            height="50"
          />

          <span>{original.surface}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "tourney_date",
    header: "Tourney Date",
    cell: ({ row }) => {
      const { original } = row;

      if (!original.tourney_date) return <span>Fecha no disponible</span>;

      const date = parseDateString(original.tourney_date);

      if (!date) return <span>Fecha no disponible</span>;

      return <span>{date.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "score",
    header: "Score",
  },
  {
    accessorKey: "tourney_level",
    header: "Tourney Level",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { original } = row;
      return (
        <div className="flex items-center justify-center">
          <Link to={`/matches/${original._id}`}>Ver</Link>
        </div>
      );
    },
  },
];

export default function TableMatchesComponent() {
  const { limit, onPaginationChange, page, pagination } = usePagination();

  const { matches, count, loading } = useMatches({ limit, page });

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
