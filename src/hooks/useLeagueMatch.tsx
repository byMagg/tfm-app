import { useAuth } from "@/context/AuthContext";
import { getLeagueMatchById } from "@/controllers";
import type { LeagueMatch } from "@/types";
import { useEffect, useState } from "react";

export function useLeagueMatch({ id }: { id: string }) {
  const [match, setMatch] = useState<LeagueMatch>();
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      setLoading(true);

      const { data } = await getLeagueMatchById({ id, token });

      setMatch(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return { match, loading };
}
