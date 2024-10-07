import type { APIRoute } from "astro";

export const DELETE: APIRoute = async ({ params, request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();

    const { ids } = body;
    const { id: leagueId } = params;

    try {
      const query = `
        query DeletePlayersFromLeague($leagueId: String!, $playerIds: [String!]!) {
          deletePlayersFromLeague(leagueId: $leagueId, playerIds: $playerIds) {
            _id
            name
            players
          }
        }
      `;

      const variables = {
        leagueId: leagueId,
        playerIds: ids,
      };

      const response = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        body: JSON.stringify({ query, variables }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(await response.json());
    } catch (error) {
      console.error("Error deleting players:", error);
    }

    return new Response(
      JSON.stringify({
        ids,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
  return new Response(null, { status: 400 });
};
