import "fake-indexeddb/auto";
import { describe, it, expect } from "vitest";
import { initialData, loadData, saveData, parseBackup } from "../storage";
describe("persistencia y copias", () => {
  it("guarda y recupera preferencias, progreso y tarjetas en IndexedDB", async () => {
    const d = initialData();
    d.profile.onboarded = true;
    d.profile.theme = "dark";
    d.cards = [
      {
        wordId: "u01-w-hallo",
        box: 1,
        due: new Date().toISOString(),
        history: [{ at: new Date().toISOString(), ok: true }],
      },
    ];
    await saveData(d);
    expect(await loadData()).toEqual(d);
  });
  it("exporta e importa un documento real sin referencias compartidas", () => {
    const d = initialData();
    const restored = parseBackup(JSON.stringify(d));
    expect(restored).toEqual(d);
    expect(restored).not.toBe(d);
  });
  it.each([
    { schema: 2 },
    { schema: 1, profile: {} },
    { schema: 1, started: "hola" },
    null,
    [],
  ])("rechaza estructuras ajenas sin escribir datos", (input) =>
    expect(() => parseBackup(JSON.stringify(input))).toThrow(),
  );
  it("rechaza tarjetas, fechas y sesiones malformadas", () => {
    const d = initialData();
    expect(() =>
      parseBackup(
        JSON.stringify({
          ...d,
          cards: [{ wordId: "a", box: 99, due: "no", history: [] }],
        }),
      ),
    ).toThrow();
    expect(() =>
      parseBackup(JSON.stringify({ ...d, session: { index: -1 } })),
    ).toThrow();
    expect(() =>
      parseBackup(
        JSON.stringify({
          ...d,
          session: {
            id: "s",
            unit: "u01",
            type: "daily",
            index: 0,
            tasks: [],
            correct: 0,
            firstCorrect: 0,
            started: d.started,
          },
        }),
      ),
    ).toThrow();
    expect(() =>
      parseBackup(
        JSON.stringify({ ...d, profile: { ...d.profile, rate: "slow" } }),
      ),
    ).toThrow();
  });
  it("migra aditivamente una copia anterior sin historial de escucha", () => {
    const d = initialData();
    const legacy = { ...d } as Partial<typeof d>;
    delete legacy.listened;
    const restored = parseBackup(JSON.stringify(legacy));
    expect(restored.listened).toEqual([]);
    expect(restored.started).toBe(d.started);
  });
  it("no convierte documentos con código HTML en contenido ejecutable", () => {
    const d = initialData();
    d.songs = [
      { id: "one", title: "<script>alert(1)</script>", text: "Texto" },
    ];
    expect(parseBackup(JSON.stringify(d)).songs[0].title).toBe(
      "<script>alert(1)</script>",
    );
  });
});
