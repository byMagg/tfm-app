import { fetchAPI } from "@/utils";

export const getUsers = async ({
  limit = 10,
  page = 1,
  token,
}: {
  limit?: number;
  page?: number;
  token?: string;
}) => {
  return await fetchAPI({
    endpoint: "/users",
    token,
  });
};

export const getUsersByIds = async ({
  ids,
  token,
}: {
  ids: string[];
  token?: string;
}) => {
  return await fetchAPI({
    endpoint: "/users/get-by-ids",
    method: "POST",
    body: {
      ids,
    },
    token,
  });
};

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

export const getLeague = async ({
  id,
  token,
}: {
  id: string | undefined;
  token?: string;
}) => {
  if (!id) return;

  return await fetchAPI({
    endpoint: `/leagues/${id}`,
    token,
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

export const removePlayersFromLeague = async ({
  leagueId,
  playerIds = [],
}: {
  leagueId: string;
  playerIds: string[];
}) => {
  return await fetchAPI({
    endpoint: `/leagues/${leagueId}/players`,
    method: "DELETE",
    body: {
      playerIds,
    },
  });
};

export const checkPlayerInLeague = async ({
  playerId,
  token,
}: {
  playerId: string | undefined;
  token?: string;
}) => {
  if (!playerId) return;

  return await fetchAPI({
    endpoint: `/leagues/players/${playerId}`,
    token,
  });
};

export const getLeagueMatchById = async ({
  id,
  token,
}: {
  id: string | undefined;
  token?: string;
}) => {
  if (!id) return;

  return await fetchAPI({
    endpoint: `/league-matches/${id}`,
    token,
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

export const setMatchDate = async ({
  matchId,
  date,
}: {
  matchId: string | undefined;
  date: string | undefined;
}) => {
  if (!matchId || !date) return;

  return await fetchAPI({
    endpoint: `/league-matches/${matchId}/date`,
    method: "POST",
    body: {
      date,
    },
  });
};

export const getMatches = async ({
  limit = 10,
  page = 1,
}: {
  limit?: number;
  page?: number;
}) => {
  return await fetchAPI({
    endpoint: "/matches",
    limit,
    page,
  });
};

export const getMatch = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}) => {
  return await fetchAPI({
    endpoint: `/matches/${id}`,
    token,
  });
};

export const getPlayers = async ({
  limit = 10,
  page = 1,
}: {
  limit?: number;
  page?: number;
}) => {
  return await fetchAPI({
    endpoint: "/players",
    limit,
    page,
  });
};

export const getPlayer = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}) => {
  return await fetchAPI({
    endpoint: `/players/${id}`,
    token,
  });
};

export const getRankings = async ({
  limit = 10,
  page = 1,
}: {
  limit?: number;
  page?: number;
}) => {
  return await fetchAPI({
    endpoint: "/rankings",
    limit,
    page,
  });
};

export const getRanking = async ({
  id,
  token,
}: {
  id: string;
  token?: string;
}) => {
  return await fetchAPI({
    endpoint: `/rankings/${id}`,
    token,
  });
};
