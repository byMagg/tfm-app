import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { app } from "../../../lib/firebase/server";

export const POST: APIRoute = async ({ request, redirect }) => {
  const auth = getAuth(app);

  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();

  if (!email || !password || !name) {
    return new Response("Faltan datos del formulario", { status: 400 });
  }

  /* Crear un usuario */
  try {
    await auth.createUser({
      email,
      password,
      displayName: name,
    });
  } catch (error: any) {
    if (error.code === "auth/email-already-exists") {
      return new Response("El correo ya está en uso", { status: 400 });
    }

    return new Response("Algo salió mal", { status: 400 });
  }
  return redirect("/");
};
