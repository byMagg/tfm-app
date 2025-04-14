import type { League } from "@/types";
import { actions } from "astro:actions";
import { useEffect, useState } from "react";

export function useCheckPlayerInLeague() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const { data, error } = await actions.checkPlayerInLeague();

      if (data) {
        setLeagues(data);
      }

      setError(error?.message);
      setLoading(false);
    };
    fetch();
  }, []);

  return { leagues, loading, error };
}
