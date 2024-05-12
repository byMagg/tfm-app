import { fetchAPI } from "@/utils";
import { useEffect, useState } from "react";

export function usePlayers({
  limit = 10,
  offset,
}: {
  limit?: number;
  offset: number;
}) {
  const query = `
      query GetPlayers {
        playersCount
        getPlayers(limit: ${limit}, offset: ${offset}) {
            _id
            name_first
            name_last
            hand
            player_id
            ioc
        }
      }
  `;

  const [players, setPlayers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const apiData = await fetchAPI(query);
      const { getPlayers, playersCount } = apiData;
      setPlayers(getPlayers);
      setCount(playersCount);
      setLoading(false);
    };
    fetch();
  }, [offset]);

  return { players, count, loading };
}
