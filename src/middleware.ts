import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (
  { request, redirect, cookies },
  next,
) => {
  const sessionCookie = cookies.get("__session")?.value;

  return next();
};
