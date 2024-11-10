import { fetchAPI } from "@/utils";
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
      const res = await fetch("http://localhost:4321/api/users");
      const data = (await res.json()).users.users;

      const players = data.map((player: any) => ({
        label: player.providerData[0].displayName,
        value: player.uid,
      }));

      console.log(data);
      console.log(players);

      setPlayers(players);
    };

    fetchPlayers();
  }, []);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const query = `
        query GetLeagueById {
          addPlayersToLeague(leagueId: "${leagueId}", playerIds: "${[data.item]}") {
            _id
            name
            players
          }
        }
    `;

    try {
      const response = await fetchAPI(query);

      toast.success(`Item selected: ${data.item}`);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  return <ComboboxForm items={players} onSubmit={onSubmit} />;
}
