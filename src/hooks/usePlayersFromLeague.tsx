import { actions } from "astro:actions";
import { useEffect, useState } from "react";

export function usePlayersFromLeague({ playerIds }: { playerIds: string[] }) {
  const [players, setPlayers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      setLoading(true);
      const {
        data: { data },
      } = await actions.getUsersByIds({ ids: playerIds });

      setPlayers(data);
      setCount(players.length);
      setLoading(false);
    };
    fetching();
  }, [playerIds]);

  return { players, count, loading };
}
