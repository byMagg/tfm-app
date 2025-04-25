import { useAuth } from "@/context/AuthContext";
import { getRanking } from "@/controllers";
import { Ranking } from "@/types";
import { useEffect, useState } from "react";

export function useRanking({ id }: { id: string }) {
  const [ranking, setRanking] = useState<Ranking>();
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      setLoading(true);
      const { data } = await getRanking({
        id,
        token,
      });

      setRanking(data);
      setLoading(false);
    };
    fetch();
  }, [token, id]);

  return { ranking, loading };
}
