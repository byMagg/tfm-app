import { test } from "@playwright/test";

test("check login", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("pepe@gmail.com");
  await page.getByRole("textbox", { name: "Contraseña" }).click();
  await page.getByRole("textbox", { name: "Contraseña" }).fill("password");
  await page.getByRole("button", { name: "Iniciar sesión →" }).click();
  await page.getByRole("button", { name: "Cerrar sesión" }).click();
});
