import { getPlayers } from "@/controllers";
import { useEffect, useState } from "react";

export function usePlayers({
  limit = 10,
  page = 1,
}: {
  limit?: number;
  page: number;
}) {
  const [players, setPlayers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, total } = await getPlayers({ limit, page: page + 1 });
      setPlayers(data);
      setCount(total);
      setLoading(false);
    };
    fetch();
  }, [page]);

  return { players, count, loading };
}
