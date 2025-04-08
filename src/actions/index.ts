import { auth } from "@/lib/firebase/server";
import { fetchAPI } from "@/utils";
import type { AstroCookies } from "astro";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

const withSession = <T extends z.ZodTypeAny>(
  handler: (session: string, input: z.infer<T>) => Promise<any>,
) => {
  return async (input: z.infer<T>, { cookies }: { cookies: AstroCookies }) => {
    const sessionCookie = cookies.get("__session")?.value;

    if (!sessionCookie) {
      throw new ActionError({
        code: "UNAUTHORIZED",
        message: "Usuario no autorizado",
      });
    }

    return handler(sessionCookie, input);
  };
};

export const server = {
  startSeason: defineAction({
    accept: "form",
    input: z.object({
      leagueId: z.string(),
    }),
    handler: withSession(async (session, { leagueId }) => {
      return await fetchAPI({
        endpoint: `/leagues/${leagueId}/start`,
        method: "POST",
        token: session,
      });
    }),
  }),
  getLeagues: defineAction({
    input: z.object({
      limit: z.number().optional(),
      page: z.number().optional(),
    }),
    handler: withSession(async (session, { limit, page }) => {
      return await fetchAPI({
        endpoint: "/leagues",
        limit,
        page,
        token: session,
      });
    }),
  }),
  getLeague: defineAction({
    input: z.object({
      leagueId: z.string(),
    }),
    handler: withSession(async (session, { leagueId }) => {
      return await fetchAPI({
        endpoint: `/leagues/${leagueId}`,
        token: session,
      });
    }),
  }),
  createLeague: defineAction({
    input: z.object({
      name: z.string(),
    }),
    handler: withSession(async (session, { name }) => {
      return await fetchAPI({
        endpoint: "/leagues",
        method: "POST",
        body: {
          name,
        },
        token: session,
      });
    }),
  }),
  addPlayersToLeague: defineAction({
    input: z.object({
      leagueId: z.string(),
      playerIds: z.array(z.string()),
    }),
    handler: withSession(async (session, { leagueId, playerIds }) => {
      return await fetchAPI({
        endpoint: `/leagues/${leagueId}/players`,
        method: "POST",
        body: {
          playerIds,
        },
        token: session,
      });
    }),
  }),
  removePlayersFromLeague: defineAction({
    input: z.object({
      leagueId: z.string(),
      playerId: z.array(z.string()),
    }),
    handler: withSession(async (session, { leagueId, playerId }) => {
      return await fetchAPI({
        endpoint: `/leagues/${leagueId}/players`,
        method: "DELETE",
        body: {
          playerIds: playerId,
        },
        token: session,
      });
    }),
  }),
  getUsers: defineAction({
    handler: withSession(async (session) => {
      return await fetchAPI({ endpoint: "/users", token: session });
    }),
  }),
  getUsersByIds: defineAction({
    input: z.object({ ids: z.array(z.string()) }),
    handler: withSession(async (session, { ids }) => {
      return await fetchAPI({
        endpoint: "/users/get-by-ids",
        method: "POST",
        body: {
          ids,
        },
        token: session,
      });
    }),
  }),
  checkPlayerInLeague: defineAction({
    handler: withSession(async (session) => {
      const decodedCookie = await auth.verifySessionCookie(session);

      if (!decodedCookie) return;

      return await fetchAPI({
        endpoint: `/leagues/players/${decodedCookie.uid}`,
        token: session,
      });
    }),
  }),
  getLeagueMatchById: defineAction({
    input: z.object({ id: z.string() }),
    handler: withSession(async (session, { id }) => {
      return await fetchAPI({
        endpoint: `/league-matches/${id}`,
        token: session,
      });
    }),
  }),
  setMatchDate: defineAction({
    input: z.object({ matchId: z.string(), date: z.string() }),
    handler: withSession(async (session, { matchId, date }) => {
      return await fetchAPI({
        endpoint: `/league-matches/${matchId}/date`,
        method: "POST",
        body: {
          date,
        },
        token: session,
      });
    }),
  }),
  setMatchScore: defineAction({
    input: z.object({
      matchId: z.string(),
      score: z.string(),
      winner: z.string(),
    }),
    handler: withSession(async (session, { matchId, score, winner }) => {
      return await fetchAPI({
        endpoint: `/league-matches/${matchId}/score`,
        method: "POST",
        body: {
          score,
          winner,
        },
        token: session,
      });
    }),
  }),
  getPlayers: defineAction({
    input: z.object({
      limit: z.number().optional(),
      page: z.number().optional(),
    }),
    handler: withSession(async (session, { limit, page }) => {
      return await fetchAPI({
        endpoint: "/players",
        limit,
        page,
        token: session,
      });
    }),
  }),
  getMatches: defineAction({
    input: z.object({
      limit: z.number().optional(),
      page: z.number().optional(),
    }),
    handler: withSession(async (session, { limit, page }) => {
      return await fetchAPI({
        endpoint: "/matches",
        limit,
        page,
        token: session,
      });
    }),
  }),
  getMatch: defineAction({
    input: z.object({ id: z.string() }),
    handler: withSession(async (session, { id }) => {
      return await fetchAPI({ endpoint: `/matches/${id}`, token: session });
    }),
  }),
  getRankings: defineAction({
    input: z.object({
      limit: z.number().optional(),
      page: z.number().optional(),
    }),
    handler: withSession(async (session, { limit, page }) => {
      return await fetchAPI({
        endpoint: "/rankings",
        limit,
        page,
        token: session,
      });
    }),
  }),
};
