import { useEffect, useState } from "react";
import { columns, type Payment } from "./columns";
import { DataTable as DT } from "./data-table";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}

export default function DataTable() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      {data.length > 0 ? (
        <DT columns={columns} data={data} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
