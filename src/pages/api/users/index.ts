import { auth } from "@/lib/firebase/server";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const { limit = 10, offset = 0 } = params;

  try {
    const user = await auth.listUsers(Number(limit));

    return new Response(
      JSON.stringify({
        user,
      }),
    );
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  return new Response(
    JSON.stringify({
      message: "¡Esto es un GET!",
    }),
  );
};

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();

    const { ids } = body;

    const data = await auth.getUsers(
      ids.map((id: string) => ({
        uid: id,
      })),
    );

    return new Response(
      JSON.stringify({
        data,
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
