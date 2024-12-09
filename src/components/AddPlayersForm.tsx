import { fetchAPI, fetchAstroAPI } from "@/utils";
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
      const res = await fetchAstroAPI({
        endpoint: "/users",
      });

      const data = res.users.users;

      const players = data.map((player: any) => ({
        label: player.providerData[0].displayName,
        value: player.uid,
      }));

      setPlayers(players);
    };

    fetchPlayers();
  }, []);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const query = `
        query GetLeagueById($leagueId: String!, $playerIds: [String]!) {
          addPlayersToLeague(leagueId: $leagueId, playerIds: $playerIds) {
            _id
            name
            players
          }
        }
    `;

    try {
      const response = await fetchAPI(query, {
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
