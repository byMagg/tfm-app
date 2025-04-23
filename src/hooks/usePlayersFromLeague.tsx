import { useAuth } from "@/context/AuthContext";
import { getUsersByIds } from "@/controllers";
import { useEffect, useState } from "react";

export function usePlayersFromLeague({ playerIds }: { playerIds: string[] }) {
  const [players, setPlayers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    const fetching = async () => {
      if (!token) return;
      setLoading(true);
      const { data } = await getUsersByIds({
        ids: playerIds,
        token,
      });

      setPlayers(data);
      setCount(players.length);
      setLoading(false);
    };
    fetching();
  }, [playerIds]);

  return { players, count, loading };
}
