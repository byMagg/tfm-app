import { fetchAstroAPI } from "@/utils";
import { useEffect, useState } from "react";

export function usePlayersFromLeague({ playerIds }: { playerIds: string[] }) {
  const [players, setPlayers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      setLoading(true);
      const { data } = await fetchAstroAPI({
        endpoint: "/users",
        method: "POST",
        body: { ids: playerIds },
      });

      setPlayers(data.users);
      setCount(players.length);
      setLoading(false);
    };
    fetching();
  }, [playerIds]);

  return { players, count, loading };
}
