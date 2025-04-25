import { useAuth } from "@/context/AuthContext";
import { getMatch } from "@/controllers";
import { Match } from "@/types";
import { useEffect, useState } from "react";

export function useMatch({ id }: { id: string }) {
  const [match, setMatch] = useState<Match>();
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      setLoading(true);
      const { data } = await getMatch({ id, token });
      setMatch(data);
      setLoading(false);
    };
    fetch();
  }, [token, id]);

  return { match, loading };
}
