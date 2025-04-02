import { getMatches } from "@/controllers";
import { useEffect, useState } from "react";

export function useMatches({
  limit = 10,
  page = 1,
}: {
  limit?: number;
  page: number;
}) {
  const [matches, setMatches] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, total } = await getMatches({ limit, page: page + 1 });

      setMatches(data);
      setCount(total);
      setLoading(false);
    };
    fetch();
  }, [page]);

  return { matches, count, loading };
}
