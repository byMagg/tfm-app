import { fetchAPI } from "@/utils";

export const getLeagues = async ({
  limit = 10,
  page = 1,
}: {
  limit?: number;
  page?: number;
}) => {
  return await fetchAPI({
    endpoint: "/leagues",
    limit,
    page,
  });
};

export const getLeague = async (id: string | undefined) => {
  if (!id) return;

  return await fetchAPI({
    endpoint: `/leagues/${id}`,
  });
};

export const addPlayersToLeague = async ({
  leagueId,
  playerIds,
}: {
  leagueId: string | undefined;
  playerIds: string[];
}) => {
  return await fetchAPI({
    endpoint: "/leagues/:id/players",
    method: "POST",
    body: {
      playerIds,
    },
  });
};
