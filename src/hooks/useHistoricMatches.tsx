import { useAuth } from "@/context/AuthContext";
import { getHistoricMatches } from "@/controllers";
import type { LeagueMatch } from "@/types";
import { useEffect, useState } from "react";

export function useHistoricMatches({ leagueId }: { leagueId: string }) {
  const [matches, setMatches] = useState<LeagueMatch[]>([]);
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      setLoading(true);

      const { data } = await getHistoricMatches({ leagueId, token });

      const dummyData = Array.from({ length: 10 }, (_, i) => data[0]);
      setMatches(dummyData);

      setLoading(false);
    };
    fetch();
  }, [token, leagueId]);

  return { matches, loading };
}
