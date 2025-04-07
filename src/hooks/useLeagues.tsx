import { actions } from "astro:actions";
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
    const fetch = async () => {
      setLoading(true);
      const {
        data: { data, total },
        error,
      } = await actions.getLeagues({ limit, page });

      console.log(error, data, total);

      setLeagues(data);
      setCount(total);
      setLoading(false);
    };
    fetch();
  }, [page]);

  return { leagues, count, loading };
}
