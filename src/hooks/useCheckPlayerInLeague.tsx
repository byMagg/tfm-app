import { useAuth } from "@/context/AuthContext";
import { checkPlayerInLeague } from "@/controllers";
import { useEffect, useState } from "react";

export function useCheckPlayerInLeague() {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, token } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      if (!token || !user) return;
      setLoading(true);

      const { data } = await checkPlayerInLeague({
        playerId: user.uid,
        token,
      });

      setLeagues(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return { leagues, loading };
}
