import { fetchAPI } from "@/utils";
import { useEffect, useState } from "react";

export function useLeague({ id }: { id: string }) {
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await fetchAPI({ endpoint: `/leagues/${id}` });

      setLeague(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return { league, loading };
}
