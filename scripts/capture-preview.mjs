import { chromium } from "@playwright/test";
import { resolve } from "node:path";
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  reducedMotion: "reduce",
  colorScheme: "light",
});
const page = await context.newPage();
await page.goto(
  process.env.PREVIEW_URL ?? "http://127.0.0.1:4173/deutschraum/",
);
await page.getByRole("button", { name: "Continuar", exact: true }).click();
await page.getByRole("button", { name: "Entrar en mi espacio" }).click();
await page.getByRole("dialog").waitFor({ state: "detached" });
await page
  .getByRole("heading", { name: "Hallo! Un buen día para aprender." })
  .waitFor();
await page.screenshot({
  path: resolve("..", "deutschraum-preview.png"),
  fullPage: true,
  animations: "disabled",
});
await page.getByRole("button", { name: "Cambiar modo claro u oscuro" }).click();
await page.screenshot({
  path: resolve("..", "deutschraum-dark.png"),
  fullPage: true,
  animations: "disabled",
});
await page.getByRole("button", { name: "Cambiar modo claro u oscuro" }).click();
await page.setViewportSize({ width: 375, height: 812 });
await page.screenshot({
  path: resolve("..", "deutschraum-mobile.png"),
  fullPage: true,
  animations: "disabled",
});
await browser.close();
console.log(
  "Capturas de escritorio, móvil y modo oscuro guardadas en outputs.",
);
