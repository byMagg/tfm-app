import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ params, request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();

    const { name } = body;

    try {
      const query = `
        query CreateLeague($name: String!) {
          createLeague(name: $name) {
            _id
            name
          }
        }
      `;

      const variables = {
        name,
      };

      await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        body: JSON.stringify({ query, variables }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error creating league:", error);
    }

    return new Response(
      JSON.stringify({
        name,
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
