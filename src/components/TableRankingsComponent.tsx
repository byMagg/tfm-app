import { usePagination } from "@/hooks/usePagination";
import { useRankings } from "@/hooks/useRankings";
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
    accessorKey: "ranking_date",
    header: "Date",
  },
  {
    accessorKey: "rank",
    header: "Rank",
  },
  {
    accessorKey: "player",
    header: "Player",
  },
  {
    accessorKey: "points",
    header: "Points",
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
