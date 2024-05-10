import { fetchAPI } from "@/utils";
import { useEffect, useState } from "react";

export function useRankings({
  limit = 10,
  offset,
}: {
  limit?: number;
  offset: number;
}) {
  const query = `
      query GetRankings {
        rankingsCount
        getRankings(limit: ${limit}, offset: ${offset}) {
           _id
           ranking_date
           rank
           player
           points
        }
      }
  `;

  const [rankings, setRankings] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const apiData = await fetchAPI(query);
      const { getRankings, rankingsCount } = apiData;
      setRankings(getRankings);
      setCount(rankingsCount);
      setLoading(false);
    };
    fetch();
  }, [offset]);

  return { rankings, count, loading };
}
