import { useAuth } from "@/context/AuthContext";
import { getLeague } from "@/controllers";
import { useEffect, useState } from "react";

export function useLeague({ id }: { id: string }) {
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      setLoading(true);

      const { data } = await getLeague({ id, token });

      setLeague(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return { league, loading };
}
