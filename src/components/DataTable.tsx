import { DataTable as DT, type DataTableProps } from "./data-table";

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  return (
    <div className="container mx-auto py-10">
      <DT columns={columns} data={data} />
    </div>
  );
}
