import { test, expect, type Page } from "@playwright/test";
import { units, phrases } from "../src/content";
async function enter(page: Page) {
  await page.goto("./");
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByRole("button", { name: "Entrar en mi espacio" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect
    .poll(async () => (await state(page))?.profile.onboarded)
    .toBe(true);
  await expect(
    page.getByRole("heading", { name: "Hallo! Un buen día para aprender." }),
  ).toBeVisible();
}
async function go(page: Page, path: string) {
  await page.goto(`./#${path}`);
}
async function solve(page: Page, de: string) {
  const card = page.locator(".exercise-card");
  await expect(card).toBeVisible();
  if (await card.locator("textarea").count())
    await card.locator("textarea").fill(de);
  else if (await card.locator(".word-pool").count()) {
    for (const word of de.split(/\s+/)) {
      const buttons = await card
        .locator(".word-pool")
        .getByRole("button", { name: word, exact: true })
        .all();
      let found = false;
      for (const button of buttons) {
        if (await button.isEnabled()) {
          await button.click();
          found = true;
          break;
        }
      }
      expect(found, `token disponible: ${word}`).toBeTruthy();
    }
  } else
    await card
      .locator(".choices")
      .getByRole("button", { name: de, exact: true })
      .click();
  await card.getByRole("button", { name: "Comprobar", exact: true }).click();
  await expect(
    card.getByText("Richtig! Bien hecho.", { exact: true }),
  ).toBeVisible();
  await card.getByRole("button", { name: /^(Continuar|Terminar)$/ }).click();
}
async function state(page: Page) {
  return page.evaluate(async () => {
    return await new Promise<any>((resolve, reject) => {
      const request = indexedDB.open("deutschraum", 1);
      request.onsuccess = () => {
        const db = request.result;
        const r = db.transaction("state").objectStore("state").get("user");
        r.onsuccess = () => {
          resolve(r.result);
          db.close();
        };
        r.onerror = () => reject(r.error);
      };
      request.onerror = () => reject(request.error);
    });
  });
}

test("perfil, audio sin voz, borrador y progreso persistente", async ({
  page,
}) => {
  await enter(page);
  expect((await state(page)).attempts).toHaveLength(0);
  await go(page, "/curso/u01");
  await page.getByRole("button", { name: /Reconoce y practica/ }).click();
  await page.getByLabel("Tu respuesta", { exact: true }).fill("Hallo!");
  await expect
    .poll(async () => (await state(page)).drafts["lesson:u01-p1"])
    .toBe("Hallo!");
  await page.reload();
  await expect(page.getByLabel("Tu respuesta", { exact: true })).toHaveValue(
    "Hallo!",
  );
  await page.getByRole("button", { name: "Comprobar", exact: true }).click();
  await expect(
    page.getByText("Richtig! Bien hecho.", { exact: true }),
  ).toBeVisible();
  await expect.poll(async () => (await state(page)).attempts.length).toBe(1);
  await page.reload();
  expect((await state(page)).attempts[0].xp).toBe(10);
  await go(page, "/ajustes");
  await page.getByLabel("Apariencia", { exact: true }).selectOption("dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Comprobar audio alemán" }).click();
  await expect(
    page
      .getByText(/No hay una voz alemana disponible|No se ha podido reproducir/)
      .first(),
  ).toBeVisible();
});

for (const unit of units)
  test(`unidad ${unit.id}: lectura, lección completa y prueba final`, async ({
    page,
  }) => {
    await enter(page);
    await go(page, `/curso/${unit.id}`);
    await page.getByRole("button", { name: /Comprende una historia/ }).click();
    const r = unit.readings[0];
    for (let i = 0; i < r.questions.length; i++)
      await page
        .locator(".question")
        .nth(i)
        .getByRole("button", {
          name: r.questions[i].choices[r.questions[i].answer],
          exact: true,
        })
        .click();
    await page.getByRole("button", { name: "Comprobar comprensión" }).click();
    await expect(
      page.getByText("Lectura comprendida y guardada."),
    ).toBeVisible();
    await page
      .locator(".comprehension")
      .getByRole("button", { name: "Continuar", exact: true })
      .click();
    for (const p of unit.phrases) await solve(page, p.de);
    await expect(
      page.getByRole("heading", { name: "Gut gemacht!" }),
    ).toBeVisible();
    await go(page, `/curso/${unit.id}`);
    await page.getByRole("button", { name: /Comprueba lo aprendido/ }).click();
    for (const p of unit.phrases) await solve(page, p.de);
    await expect(
      page.getByRole("heading", { name: "100% al primer intento" }),
    ).toBeVisible();
    await expect.poll(async () => (await state(page)).tests[unit.id]).toBe(100);
    await page.getByRole("button", { name: "Volver al itinerario" }).click();
    await expect(
      page
        .getByRole("link")
        .filter({ hasText: unit.title })
        .filter({ hasText: "Consolidada" }),
    ).toBeVisible();
  });

test("vocabulario personal: crear, editar, repasar y eliminar", async ({
  page,
}) => {
  await enter(page);
  await go(page, "/vocabulario");
  await page
    .getByRole("button", { name: "Añadir palabra", exact: true })
    .click();
  await page.getByLabel("Alemán", { exact: true }).fill("die Erfahrung");
  await page.getByLabel("Significado en español").fill("la experiencia");
  await page.getByLabel("Categoría").selectOption("sustantivo");
  await page.getByLabel("Plural", { exact: true }).fill("Erfahrungen");
  await page.getByRole("button", { name: "Guardar palabra" }).click();
  await page.getByLabel("Buscar vocabulario").fill("Erfahrung");
  await page.getByRole("button", { name: "Editar die Erfahrung" }).click();
  await page.getByLabel("Significado en español").fill("la experiencia vivida");
  await page.getByRole("button", { name: "Guardar palabra" }).click();
  await expect(
    page.getByText("la experiencia vivida", { exact: true }),
  ).toBeVisible();
  await page
    .locator(".word-row")
    .getByRole("button", { name: "Tarjeta", exact: true })
    .click();
  await page.getByRole("button", { name: "Repasar pendientes" }).click();
  await page.getByRole("button", { name: "Mostrar significado" }).click();
  await page.getByRole("button", { name: "Me acordaba" }).click();
  await page.getByRole("button", { name: "Siguiente tarjeta" }).click();
  await expect.poll(async () => (await state(page)).cards[0].box).toBe(1);
  expect(Date.parse((await state(page)).cards[0].due)).toBeGreaterThan(
    Date.now(),
  );
  await page.reload();
  await page.getByLabel("Buscar vocabulario").fill("Erfahrung");
  page.once("dialog", (d) => d.accept());
  await page.getByRole("button", { name: "Eliminar die Erfahrung" }).click();
  await expect(
    page.getByText("Sin palabras con estos filtros.", { exact: false }),
  ).toBeVisible();
});

test("variantes, errata y rechazo gramatical; dictado con diferencias", async ({
  page,
}) => {
  await enter(page);
  await go(page, "/reformular?unidad=u09");
  for (let i = 0; i < 7; i++)
    await page
      .getByRole("button", { name: "Más ejercicios del banco" })
      .click();
  await page
    .getByLabel("Tu respuesta", { exact: true })
    .fill("Ich gehe heute zum Supermarkt.");
  await page.getByRole("button", { name: "Comprobar", exact: true }).click();
  await expect(
    page.getByText("Richtig! Bien hecho.", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Intentar otra vez" }).click();
  await page
    .getByLabel("Tu respuesta", { exact: true })
    .fill("Ich gehe heute zum Supermakrt.");
  await page.getByRole("button", { name: "Comprobar", exact: true }).click();
  await expect(
    page.getByText("Correcto, con una pequeña errata.", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Intentar otra vez" }).click();
  await page
    .getByLabel("Tu respuesta", { exact: true })
    .fill("Ich geht heute zum Supermarkt.");
  await page.getByRole("button", { name: "Comprobar", exact: true }).click();
  await expect(
    page.getByText("Tu respuesta no coincide con las soluciones registradas.", {
      exact: true,
    }),
  ).toBeVisible();
  await go(page, "/oido?unidad=u02");
  await page.getByLabel("Tu respuesta", { exact: true }).fill("Ich Spanien.");
  await page.getByRole("button", { name: "Comprobar", exact: true }).click();
  await expect(page.locator(".diff .missing").first()).toBeVisible();
  await go(page, "/gramatica?unidad=u10");
  await expect(
    page.getByText("Ich muss heute arbeiten.", { exact: true }),
  ).toBeVisible();
});

test("letras: huecos repartidos, versos y almacenamiento local", async ({
  page,
}) => {
  await enter(page);
  await go(page, "/canciones");
  await page.getByRole("button", { name: "Mi taller de letras" }).click();
  await page
    .getByLabel("Título", { exact: true })
    .fill("Texto propio de prueba");
  const lines = Array.from(
    { length: 12 },
    (_, i) => `Ich lerne Deutsch und lese jeden Tag ein Buch ${i}.`,
  );
  await page.getByLabel("Letra de la canción").fill(lines.join("\n"));
  await page.getByLabel("Guardar esta letra en mi biblioteca local").check();
  await page.getByRole("button", { name: "Generar ejercicios" }).click();
  const inputs = page.locator(".lyrics input");
  expect(await inputs.count()).toBeGreaterThan(10);
  await page
    .getByRole("button", { name: "Comprobar con el texto original" })
    .click();
  await expect(page.locator(".lyric-gap small").last()).toBeVisible();
  const prior = await page.locator(".lyric-gap small").allTextContents();
  await page.getByRole("button", { name: "Regenerar", exact: true }).click();
  await page
    .getByRole("button", { name: "Comprobar con el texto original" })
    .click();
  expect(await page.locator(".lyric-gap small").allTextContents()).not.toEqual(
    prior,
  );
  await page.getByLabel("Actividad", { exact: true }).selectOption("lines");
  await expect(page.locator(".word-pool button")).toHaveCount(12);
  await page.reload();
  await page.getByRole("button", { name: "Mi taller de letras" }).click();
  await expect(
    page
      .locator(".saved-songs")
      .getByRole("button", { name: "Texto propio de prueba", exact: true }),
  ).toBeVisible();
});

test("exportación e importación validada, con reemplazo explícito", async ({
  page,
}) => {
  await enter(page);
  await go(page, "/ajustes");
  await page.getByLabel("Objetivo diario").selectOption("40");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Exportar copia JSON" }).click();
  const download = await downloadPromise;
  const path = await download.path();
  await page.getByLabel("Objetivo diario").selectOption("10");
  await page.getByLabel("Archivo de copia de seguridad").setInputFiles(path!);
  await expect(page.getByText("Copia validada", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Objetivo diario")).toHaveValue("10");
  await page.getByRole("button", { name: "Importar y reemplazar" }).click();
  await expect(page.getByLabel("Objetivo diario")).toHaveValue("40");
  await page.getByLabel("Archivo de copia de seguridad").setInputFiles({
    name: "invalid.json",
    mimeType: "application/json",
    buffer: Buffer.from('{"schema":1,"attempts":"bad"}'),
  });
  await expect(page.getByRole("alert")).toContainText(
    "No se ha cambiado ningún dato",
  );
  await expect(page.getByLabel("Objetivo diario")).toHaveValue("40");
});

test("PWA: base de Pages, caché completa, navegación y recarga offline", async ({
  page,
  context,
  baseURL,
}) => {
  await enter(page);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await expect(
    page.getByText("Curso guardado offline", { exact: true }),
  ).toBeVisible();
  const manifest = await (
    await page.request.get(`${baseURL}manifest.webmanifest`)
  ).json();
  const pathname = new URL(baseURL!).pathname;
  expect(manifest.scope).toBe(pathname);
  expect(manifest.start_url).toBe(pathname + "#/");
  expect(
    (await page.request.get(`${baseURL}icons/icon-192.png`)).status(),
  ).toBe(200);
  await context.setOffline(true);
  await go(page, "/inmersion");
  await expect(
    page.getByRole("heading", { name: "Un poco más dentro del alemán." }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Un poco más dentro del alemán." }),
  ).toBeVisible();
  await go(page, "/reformular");
  await page.getByLabel("Tu respuesta", { exact: true }).fill("Hallo!");
  await page.getByRole("button", { name: "Comprobar", exact: true }).click();
  await expect(
    page.getByText("Richtig! Bien hecho.", { exact: true }),
  ).toBeVisible();
  await expect.poll(async () => (await state(page)).attempts.length).toBe(1);
});

test("móvil, modo oscuro, navegación y palabras repetidas", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await enter(page);
  for (const route of [
    "/",
    "/inmersion",
    "/vocabulario",
    "/oido",
    "/reformular",
    "/gramatica",
    "/orden",
    "/canciones",
    "/ajustes",
    "/estadisticas",
    "/curso",
  ]) {
    await go(page, route);
    await expect(page.locator("main")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `sin desbordamiento en ${route}`,
    ).toBeTruthy();
  }
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await page
    .getByRole("navigation", { name: "Secciones principales" })
    .getByRole("link", { name: "Orden de palabras", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Dale forma a lo que piensas." }),
  ).toBeVisible();
  await page.getByLabel("Filtrar por unidad").selectOption("u11");
  const p = phrases.find((p) => p.unit === "u11" && p.de.includes("aber"))!;
  for (let i = 0; i < 4; i++)
    await page
      .getByRole("button", { name: "Más ejercicios del banco" })
      .click();
  await solve(page, p.de);
  await page
    .getByRole("button", { name: "Cambiar modo claro u oscuro" })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("sin errores de JavaScript ni recursos remotos obligatorios", async ({
  page,
}) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => {
    if (
      !r.url().startsWith("http://127.0.0.1:4173") &&
      !r.url().startsWith("data:")
    )
      external.push(r.url());
  });
  await enter(page);
  for (const route of [
    "/inmersion",
    "/vocabulario",
    "/oido",
    "/reformular",
    "/gramatica",
    "/orden",
    "/canciones",
    "/estadisticas",
    "/ajustes",
  ]) {
    await go(page, route);
    await expect(page.locator("main h1")).toBeVisible();
  }
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

test("palabra de una historia a SRS, sin duplicados y con escritura", async ({
  page,
}) => {
  await enter(page);
  await go(page, "/inmersion?texto=u01-r1");
  await page
    .locator(".reader-lines")
    .getByRole("button", { name: "Hallo!", exact: true })
    .first()
    .click();
  await page
    .getByRole("button", { name: "Añadir a tarjetas", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Añadir a tarjetas", exact: true })
    .click();
  await expect.poll(async () => (await state(page)).cards.length).toBe(1);
  await go(page, "/vocabulario");
  await page
    .getByRole("button", { name: "Español → alemán", exact: true })
    .click();
  await page.getByRole("button", { name: "Repasar pendientes" }).click();
  await page.locator(".flashcard input").fill("hallo");
  await page
    .locator(".flashcard")
    .getByRole("button", { name: "Comprobar", exact: true })
    .click();
  await expect(
    page.getByText(
      "Guardado. Volverá a aparecer en su próxima fecha de repaso.",
    ),
  ).toBeVisible();
  await page.getByRole("button", { name: "Siguiente tarjeta" }).click();
  await expect.poll(async () => (await state(page)).cards[0].box).toBe(1);
});

test("sesión diaria configurable, sin perder actividades ni borradores", async ({
  page,
}) => {
  await enter(page);
  await page.getByLabel("Duración de sesión").selectOption("10");
  await page.getByRole("button", { name: "Comenzar mi sesión" }).click();
  await page.getByText("Organizar mi sesión", { exact: false }).click();
  await expect(page.locator(".plan-row")).toHaveCount(4);
  await page
    .getByRole("button", { name: "Quitar actividad 4", exact: true })
    .click();
  await expect(page.locator(".plan-row")).toHaveCount(3);
  const r = units[0].readings[0];
  for (let i = 0; i < r.questions.length; i++)
    await page
      .locator(".question")
      .nth(i)
      .getByRole("button", {
        name: r.questions[i].choices[r.questions[i].answer],
        exact: true,
      })
      .click();
  await page.getByRole("button", { name: "Comprobar comprensión" }).click();
  await page
    .locator(".comprehension")
    .getByRole("button", { name: "Continuar", exact: true })
    .click();
  await solve(page, phrases[0].de);
  await expect(page.locator(".plan-row button")).toHaveCount(0);
  await solve(page, phrases[1].de);
  await expect(
    page.getByRole("heading", { name: "Gut gemacht!" }),
  ).toBeVisible();
  await expect.poll(async () => (await state(page)).sessionsCompleted).toBe(1);
});

test("dos versiones de una traducción se comprueban por separado", async ({
  page,
}) => {
  await enter(page);
  await go(page, "/reformular?unidad=u09");
  for (let i = 0; i < 7; i++)
    await page
      .getByRole("button", { name: "Más ejercicios del banco" })
      .click();
  await page
    .getByLabel("Tu respuesta", { exact: true })
    .fill("Ich gehe heute zum Supermarkt.");
  await page.getByRole("button", { name: "Comprobar", exact: true }).click();
  await page
    .getByRole("button", { name: "Probar otra versión de esta frase" })
    .click();
  await page
    .getByLabel("Tu respuesta", { exact: true })
    .fill("Heute gehe ich zum Supermarkt.");
  await page.getByRole("button", { name: "Comprobar", exact: true }).click();
  await expect(page.locator(".versions p")).toHaveCount(2);
  await expect(
    page.locator(".versions").getByText("Registrada", { exact: true }),
  ).toHaveCount(2);
  expect(
    (await state(page)).attempts.filter((a: any) => a.xp > 0),
  ).toHaveLength(1);
});

test("las soluciones permiten consultar y guardar vocabulario", async ({
  page,
}) => {
  await enter(page);
  await go(page, "/reformular?unidad=u02");
  await page
    .getByLabel("Tu respuesta", { exact: true })
    .fill("Ich bin aus Spanien.");
  await page.getByRole("button", { name: "Comprobar", exact: true }).click();
  await page
    .locator(".feedback .clickable-sentence")
    .getByRole("button", { name: "Spanien.", exact: true })
    .click();
  await expect(page.locator(".feedback .word-popover")).toContainText("España");
  await page
    .getByRole("button", { name: "Añadir a tarjetas", exact: true })
    .click();
  await expect.poll(async () => (await state(page)).cards.length).toBe(1);
});
