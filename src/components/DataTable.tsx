import { useEffect } from "react";
import { columns, type Payment } from "./columns";
import { DataTable as DT } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

export default function DataTable() {
  const data = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    } as Payment,
  ];

  useEffect(() => {
    console.log("HOLA", data);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DT columns={columns} data={data} />
    </div>
  );
}
