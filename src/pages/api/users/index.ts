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
