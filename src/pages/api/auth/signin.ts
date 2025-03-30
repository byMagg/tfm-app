import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  /* Obtener el token de las cabeceras de la solicitud */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!idToken) {
    return new Response("Token no encontrado", { status: 401 });
  }

  /* Verificar la id del token */
  try {
    // await auth.verifyIdToken(idToken);
  } catch (error) {
    return new Response("Token invalido", { status: 401 });
  }

  /* Crear y establecer una cookie de sesión */
  const fiveDays = 60 * 60 * 24 * 14 * 1000;
  // const sessionCookie = await auth.createSessionCookie(idToken, {
  //   expiresIn: fiveDays,
  // });

  const token = cookies.get("__session")?.value;
  console.log(idToken);
  console.log(token);

  return redirect("/profile");
};
