import { actions } from "astro:actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { z } from "zod";
import { ComboboxForm, type ComboboxItem, FormSchema } from "./ui/select-form";

export default function AddPlayersForm({
  leagueId,
}: {
  leagueId: string | undefined;
}) {
  const [players, setPlayers] = useState<ComboboxItem[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const {
        data: { data },
      } = await actions.getUsers();

      const players = data.map((player: any) => ({
        label: player.name,
        value: player._id,
      }));

      setPlayers(players);
    };

    fetchPlayers();
  }, []);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (!leagueId) return;

      const response = await actions.addPlayersToLeague({
        leagueId,
        playerIds: data.items,
      });
      toast.success(`Item selected: ${data.items}`);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  return <ComboboxForm items={players} onSubmit={onSubmit} />;
}
