import { test, expect } from "@playwright/test";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";
// Servidor estático de prueba: cambia únicamente la versión del SW para probar la actualización.
// No forma parte de la aplicación distribuida.
test("actualización PWA conserva IndexedDB y activa la versión nueva", async ({
  page,
  baseURL,
}) => {
  const base = new URL(baseURL!).pathname;
  let revision = 1;
  const server = createServer(async (req, res) => {
    try {
      const path = new URL(req.url!, "http://localhost").pathname;
      if (!path.startsWith(base)) {
        res.writeHead(404).end();
        return;
      }
      let file = path.slice(base.length) || "index.html";
      if (file.includes("..")) {
        res.writeHead(400).end();
        return;
      }
      let content = await readFile(join(process.cwd(), "dist", file));
      if (file === "sw.js") {
        content = Buffer.from(
          content
            .toString()
            .replace(
              /CACHE=PREFIX\+"[^"]+"/,
              `CACHE=PREFIX+"update-test-${revision}"`,
            ),
        );
        res.setHeader("Cache-Control", "no-store");
      }
      const mime: Record<string, string> = {
        ".js": "text/javascript",
        ".html": "text/html",
        ".css": "text/css",
        ".svg": "image/svg+xml",
        ".png": "image/png",
        ".webmanifest": "application/manifest+json",
      };
      res.setHeader(
        "Content-Type",
        mime[extname(file)] ?? "application/octet-stream",
      );
      res.end(content);
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address() as { port: number };
  try {
    await page.goto(`http://127.0.0.1:${address.port}${base}`);
    await page.getByRole("button", { name: "Continuar", exact: true }).click();
    await page.getByRole("button", { name: "Entrar en mi espacio" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
    });
    await page.reload();
    await page.getByRole("link", { name: "Ajustes", exact: true }).click();
    await page.getByLabel("Apariencia", { exact: true }).selectOption("dark");
    revision = 2;
    await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.getRegistration();
      await reg!.update();
    });
    await expect(
      page.getByText("Hay una nueva versión del curso.", { exact: false }),
    ).toBeVisible();
    const reloaded = page.waitForEvent("load");
    await page.getByRole("button", { name: "Guardar y actualizar" }).click();
    await reloaded;
    await expect(
      page.getByRole("heading", { name: "Este espacio es tuyo." }),
    ).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect
      .poll(async () => page.evaluate(async () => await caches.keys()))
      .toEqual(
        expect.arrayContaining([expect.stringContaining("update-test-2")]),
      );
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});
