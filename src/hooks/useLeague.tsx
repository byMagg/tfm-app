import { fetchAPI } from "@/utils";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export function useLeague({ id }: { id: string }) {
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("__session") || "";

    const fetch = async () => {
      setLoading(true);

      const { data } = await fetchAPI({ endpoint: `/leagues/${id}`, token });

      setLeague(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return { league, loading };
}
