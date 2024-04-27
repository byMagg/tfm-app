import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Severity } from "@/types";
import {
  CloudLightningIcon,
  CloudSunIcon,
  CloudSunRain,
  CloudyIcon,
  SunIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  loading: boolean;
  onPaginationChange: (pagination: any) => void;
  pagination: any;
}

export function getWeatherIcon(value: string) {
  switch (value) {
    case "Cloudy":
    case "Mostly Cloudy":
      return <CloudyIcon />;
    case "Light Rain":
      return <CloudSunRain />;
    case "Partly Cloudy":
      return <CloudSunIcon />;
    case "Fair":
      return <SunIcon />;
    case "Light Rain with Thunder":
    case "Thunder in the Vicinity":
    case "Thunder":
      return <CloudLightningIcon />;
    default:
      return null;
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  loading,
  onPaginationChange,
  pagination,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    onPaginationChange,
    manualPagination: true,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const value = cell.getValue() as string;
                    switch (cell.column.columnDef.header) {
                      case "ID":
                        console.log(value);
                        return (
                          <TableCell
                            style={{
                              viewTransitionName: value,
                            }}
                            key={cell.id}
                          >
                            <div className="flex items-center space-x-2">
                              <span>{value}</span>
                            </div>
                          </TableCell>
                        );
                      case "Weather Condition":
                        return (
                          <TableCell key={cell.id}>
                            <div className="flex items-center space-x-2">
                              {getWeatherIcon(value)}
                              <span>{value}</span>
                            </div>
                          </TableCell>
                        );
                      case "Severity":
                        const label =
                          Severity[Number(value) as keyof typeof Severity];

                        return (
                          <TableCell key={cell.id}>
                            <div className="flex items-center space-x-2">
                              <span>{label}</span>
                            </div>
                          </TableCell>
                        );
                    }

                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Input
          className="
              w-fit
              text-center
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          value={table.getState().pagination.pageIndex + 1}
          type="number"
          onChange={(e) => {
            table.setPageIndex(Number(e.target.value) - 1);
          }}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
