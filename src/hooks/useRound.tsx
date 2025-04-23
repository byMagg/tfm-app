import { useAuth } from "@/context/AuthContext";
import { getRound } from "@/controllers";
import type { Round } from "@/types";
import { useEffect, useState } from "react";

export function useRound({ leagueId }: { leagueId: string }) {
  const [round, setRound] = useState<Round>();
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      setLoading(true);

      const { data } = await getRound({ leagueId, token });

      setRound(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return { round, loading };
}
