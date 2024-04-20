import { fetchAPI } from "@/utils";
import { useEffect, useState } from "react";

export function useAccidents({
  limit = 10,
  offset,
}: {
  limit?: number;
  offset: number;
}) {
  const query = `
      query GetAccidents {
        accidentCount
        getAccidents(limit: ${limit}, offset: ${offset}) {
            _id
            ID
            Severity
            Country
            Zipcode
            State
            Weather_Condition
            Wind_Direction
        }
      }
  `;

  const [accidents, setAccidents] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const apiData = await fetchAPI(query);
      const { getAccidents, accidentCount } = apiData;
      setAccidents(getAccidents);
      setCount(accidentCount);
      setLoading(false);
    };
    fetch();
  }, [offset]);

  return { accidents, count, loading };
}
