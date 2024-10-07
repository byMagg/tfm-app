import { useEffect, useState } from "react";

export function usePlayersFromLeague({ playerIds }: { playerIds: string[] }) {
  const [players, setPlayers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:4321/api/users`, {
        method: "POST",
        body: JSON.stringify({
          ids: playerIds,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { data } = await response.json();
      console.log(data);

      setPlayers(data.users);
      setCount(players.length);
      setLoading(false);
    };
    fetching();
  }, [playerIds]);

  return { players, count, loading };
}
