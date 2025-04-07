import { actions } from "astro:actions";
import { useEffect, useState } from "react";

export function useLeague({ id }: { id: string }) {
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const {
        data: { data },
      } = await actions.getLeague({ leagueId: id });

      setLeague(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return { league, loading };
}
