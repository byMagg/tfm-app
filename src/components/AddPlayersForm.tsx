import { actions } from "astro:actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { z } from "zod";
import { ComboboxForm, type ComboboxItem, FormSchema } from "./ui/select-form";

export default function AddPlayersForm({ leagueId }: { leagueId: string }) {
  const [players, setPlayers] = useState<ComboboxItem[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data: { data = [] } = {} } = await actions.getUsers();

      const players = data.map((player: any) => ({
        label: player.name,
        value: player._id,
      }));

      setPlayers(players);
    };

    fetchPlayers();
  }, []);

  async function handleSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (!leagueId) return;

      await actions.addPlayersToLeague({
        leagueId,
        playerIds: data.items,
      });

      window.location.href = `/leagues/${leagueId}`;
    } catch (error) {
      console.error("Error adding players to league:", error);
      toast.error("Error adding players to league.");
    }
  }
  return <ComboboxForm items={players} onSubmit={handleSubmit} />;
}
