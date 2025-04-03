import { getLeagues } from "@/controllers";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export function useLeagues({
  limit = 10,
  page = 1,
}: {
  limit?: number;
  page: number;
}) {
  const [leagues, setLeagues] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("__session") || "";

    const fetch = async () => {
      setLoading(true);
      const { data, total } = await getLeagues({
        limit,
        page,
        token,
      });
      setLeagues(data);
      setCount(total);
      setLoading(false);
    };
    fetch();
  }, [page]);

  return { leagues, count, loading };
}
