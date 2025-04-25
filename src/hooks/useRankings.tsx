import { useAuth } from "@/context/AuthContext";
import { getRankings } from "@/controllers";
import { useEffect, useState } from "react";

export function useRankings({
  limit = 10,
  page = 1,
}: {
  limit?: number;
  page: number;
}) {
  const [rankings, setRankings] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      setLoading(true);
      const { data, total } = await getRankings({ limit, page, token });

      setRankings(data);

      setCount(total);
      setLoading(false);
    };
    fetch();
  }, [token, page, limit]);

  return { rankings, count, loading };
}
