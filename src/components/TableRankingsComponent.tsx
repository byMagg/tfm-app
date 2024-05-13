import { usePagination } from "@/hooks/usePagination";
import { useRankings } from "@/hooks/useRankings";
import type { Ranking } from "@/types";
import { parseDateString } from "@/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { navigate } from "astro:transitions/client";
import { DataTable } from "./DataTable";
import { Button } from "./ui/button";

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
      return (
        <div>{parseDateString(original.ranking_date).toLocaleDateString()}</div>
      );
    },
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
              navigate(`/rankings/${original._id}`);
            }}
          >
            Detail
          </Button>
        </div>
      );
    },
  },
];

export default function TableRankingsComponent() {
  const { limit, onPaginationChange, offset, pagination } = usePagination();

  const { rankings, count, loading } = useRankings({ limit, offset });

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
