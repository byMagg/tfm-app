import { fetchAPI } from "@/utils";
import { useEffect, useState } from "react";

export function useMatches({
  limit = 10,
  offset,
}: {
  limit?: number;
  offset: number;
}) {
  const query = `
      query GetMatches {
        matchesCount
        getMatches(limit: ${limit}, offset: ${offset}) {
            _id
            tourney_name
            surface
            score
            tourney_level
            tourney_date
        }
      }
  `;

  const [matches, setMatches] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const apiData = await fetchAPI(query);
      const { getMatches, matchesCount } = apiData;
      setMatches(getMatches);
      setCount(matchesCount);
      setLoading(false);
    };
    fetch();
  }, [offset]);

  return { matches, count, loading };
}
