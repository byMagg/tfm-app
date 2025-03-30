import { getUsersByIds } from "@/controllers";
import { useEffect, useState } from "react";

export function usePlayersFromLeague({ playerIds }: { playerIds: string[] }) {
  const [players, setPlayers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(playerIds);

    const fetching = async () => {
      setLoading(true);
      const { data } = await getUsersByIds({ ids: playerIds });

      console.log(data);
      setPlayers(data);
      setCount(players.length);
      setLoading(false);
    };
    fetching();
  }, [playerIds]);

  return { players, count, loading };
}
