import { useAuth } from "@/context/AuthContext";
import { getPlayer } from "@/controllers";
import { Player } from "@/types";
import { useEffect, useState } from "react";

export function usePlayer({ id }: { id: string }) {
  const [player, setPlayer] = useState<Player>();
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      setLoading(true);
      const { data } = await getPlayer({ id, token });
      setPlayer(data);
      setLoading(false);
    };
    fetch();
  }, [token, id]);

  return { player, loading };
}
