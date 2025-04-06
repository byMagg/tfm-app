import { getUsersByIds } from "@/controllers";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export function usePlayersFromLeague({ playerIds }: { playerIds: string[] }) {
  const [players, setPlayers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      const token = Cookies.get("__session") || "";

      setLoading(true);
      const { data } = await getUsersByIds({ ids: playerIds, token });

      setPlayers(data);
      setCount(players.length);
      setLoading(false);
    };
    fetching();
  }, [playerIds]);

  return { players, count, loading };
}
