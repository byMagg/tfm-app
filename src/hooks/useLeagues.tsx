import { useAuth } from "@/context/AuthContext";
import { getLeagues } from "@/controllers";
import { useEffect, useState } from "react";

export function useLeagues({ limit, page }: { limit?: number; page: number }) {
  const [leagues, setLeagues] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;

      setLoading(true);

      const { data, total } = await getLeagues({
        token,
        limit,
        page,
      });

      setLeagues(data);
      setCount(total);
      setLoading(false);
    };
    fetch();
  }, [page]);

  return { leagues, count, loading };
}
