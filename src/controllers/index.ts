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

export const createLeague = async ({ name }: { name: string | undefined }) => {
  if (!name) return;

  return await fetchAPI({
    endpoint: "/leagues",
    method: "POST",
    body: {
      name,
    },
  });
};

export const startSeason = async (leagueId: string | undefined) => {
  if (!leagueId) return;

  return await fetchAPI({
    endpoint: `/leagues/${leagueId}/start`,
    method: "POST",
  });
};

export const initializeLeagueMatchesInSeason = async ({
  leagueId,
}: {
  leagueId: string | undefined;
}) => {
  if (!leagueId) return;

  return await fetchAPI({
    endpoint: `/leagues/${leagueId}/matches`,
    method: "POST",
  });
};

export const addPlayersToLeague = async ({
  leagueId,
  playerIds = [],
}: {
  leagueId: string | undefined;
  playerIds: string[];
}) => {
  return await fetchAPI({
    endpoint: `/leagues/${leagueId}/players`,
    method: "POST",
    body: {
      playerIds,
    },
  });
};

export const checkPlayerInLeague = async (playerId: string | undefined) => {
  if (!playerId) return;

  return await fetchAPI({
    endpoint: `/leagues/players/${playerId}`,
  });
};

export const getLeagueMatchById = async (id: string | undefined) => {
  if (!id) return;

  return await fetchAPI({
    endpoint: `/league-matches/${id}`,
  });
};

export const setMatchScore = async ({
  matchId,
  score,
  winner,
}: {
  matchId: string | undefined;
  score: string | undefined;
  winner: string | undefined;
}) => {
  if (!matchId || !winner || !score) return;

  return await fetchAPI({
    endpoint: `/league-matches/${matchId}/score`,
    method: "POST",
    body: {
      score,
      winner,
    },
  });
};
