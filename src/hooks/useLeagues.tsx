import { fetchAPI } from "@/utils";
import { useEffect, useState } from "react";

export function useLeagues({
  limit = 10,
  offset,
}: {
  limit?: number;
  offset: number;
}) {
  const query = `
      query GetLeagues {
        leaguesCount
        getLeagues(limit: ${limit}, offset: ${offset}) {
            _id
            name
            players {
              _id
            }
        }
      }
  `;

  const [leagues, setLeagues] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const apiData = await fetchAPI(query);
      const { getLeagues, leaguesCount } = apiData;
      setLeagues(getLeagues);
      setCount(leaguesCount);
      setLoading(false);
    };
    fetch();
  }, [offset]);

  return { leagues, count, loading };
}
