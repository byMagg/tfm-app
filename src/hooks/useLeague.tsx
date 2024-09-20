import { fetchAPI } from "@/utils";
import { useEffect, useState } from "react";

export function useLeague({ id }: { id: string }) {
  const query = `
      query GetLeague {
        getLeagueById(LeagueId: "${id}") {
          _id
          name
          players {
            _id
            name_first
            name_last
            hand
          }
        }
      }
  `;

  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const apiData = await fetchAPI(query);
      const { getLeague } = apiData;
      setLeague(getLeague);
      setLoading(false);
    };
    fetch();
  }, []);

  return { league, loading };
}
