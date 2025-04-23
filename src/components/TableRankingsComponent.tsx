import { usePagination } from "@/hooks/usePagination";
import { useRankings } from "@/hooks/useRankings";
import type { Ranking } from "@/types";
import { parseDateString } from "@/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { DataTable } from "./DataTable";

const columns: ColumnDef<Ranking>[] = [
  {
    accessorKey: "player",
    header: "Player",
  },
  {
    accessorKey: "rank",
    header: "Rank",
  },
  {
    accessorKey: "points",
    header: "Points",
  },
  {
    accessorKey: "ranking_date",
    header: "Date",
    cell: ({ row }) => {
      const { original } = row;

      if (!original.ranking_date) return <div>Fecha no disponible</div>;

      const parseDate = parseDateString(original.ranking_date);

      if (!parseDate) return <div>Fecha no disponible</div>;

      return <div>{parseDate.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { original } = row;
      return (
        <div className="flex items-center justify-center">
          <Link to={`/rankings/${original._id}`}>Ver</Link>
        </div>
      );
    },
  },
];

export default function TableRankingsComponent() {
  const { limit, onPaginationChange, page, pagination } = usePagination();

  const { rankings, count, loading } = useRankings({
    limit,
    page: page + 1,
  });

  const pageCount = Math.round(count / limit);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={rankings}
        pageCount={pageCount}
        loading={loading}
        onPaginationChange={onPaginationChange}
        pagination={pagination}
      />
    </div>
  );
}
