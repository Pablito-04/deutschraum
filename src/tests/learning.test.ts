import { describe, it, expect } from "vitest";
import { schedule, stats, dailyTasks, unitStatus } from "../learning";
import { initialData } from "../storage";
import { gapIndices, lyricTokens } from "../learning/songs";
import { readings, phrases } from "../content";
import { validateContent } from "../../scripts/validate-content";
describe("curso y aprendizaje", () => {
  it("valida cobertura, referencias y soluciones del contenido", () =>
    expect(validateContent().words).toBe(800));
  it("usa intervalos reales y un fallo programa 10 minutos", () => {
    const now = new Date("2026-11-13T10:00:00Z");
    let card = {
      wordId: "u01-w-hallo",
      box: 0,
      due: now.toISOString(),
      history: [] as { at: string; ok: boolean }[],
    };
    for (const [i, days] of [1, 3, 7, 16].entries()) {
      card = schedule(card, true, now);
      expect(card.box).toBe(i + 1);
      expect(Date.parse(card.due) - now.getTime()).toBe(days * 86400000);
    }
    card = schedule(card, false, now);
    expect(card.box).toBe(0);
    expect(Date.parse(card.due) - now.getTime()).toBe(600000);
    expect(card.history).toHaveLength(5);
  });
  it("no inventa progreso en una instalación nueva", () => {
    const d = initialData();
    const s = stats(d);
    expect(s.xp).toBe(0);
    expect(s.streak).toBe(0);
    expect(s.due).toBe(0);
    expect(s.days.every((d) => d.xp === 0)).toBe(true);
    expect(unitStatus(d, "u01").complete).toBe(false);
  });
  it("da prioridad a tarjetas vencidas y conserva una lectura", () => {
    const d = initialData();
    d.cards = [
      {
        wordId: "u01-w-hallo",
        box: 0,
        due: "2020-01-01T00:00:00Z",
        history: [],
      },
    ];
    expect(dailyTasks(d, 20)[0]).toBe("card:u01-w-hallo");
    expect(dailyTasks(d, 20).some((t) => t.startsWith("read:"))).toBe(true);
    expect(dailyTasks(d, 10).length).toBeLessThanOrEqual(4);
  });
  it("exige lectura, práctica completa y umbral de prueba", () => {
    const d = initialData();
    d.completed = [readings[0].id];
    d.tests.u01 = 80;
    expect(unitStatus(d, "u01").complete).toBe(false);
    d.attempts = phrases
      .filter((p) => p.unit === "u01")
      .map((p) => ({
        id: p.id,
        exercise: `lesson:${p.id}`,
        unit: "u01",
        skill: "reformular",
        correct: true,
        typo: false,
        first: true,
        at: new Date().toISOString(),
        seconds: 1,
        answer: p.de,
        expected: p.de,
        xp: 10,
      }));
    expect(unitStatus(d, "u01").complete).toBe(true);
  });
  it("reparte huecos por toda la letra y los regenera sin repetir IDs", () => {
    const text = Array.from(
      { length: 20 },
      (_, i) => `Vers Nummer ${i} mit vielen Wörtern`,
    ).join("\n");
    const tokens = lyricTokens(text);
    const gaps = gapIndices(text, 25, 1);
    expect(new Set(gaps).size).toBe(gaps.length);
    expect(gaps[0]).toBeLessThan(tokens.length * 0.25);
    expect(gaps.at(-1)).toBeGreaterThan(tokens.length * 0.75);
    expect(gapIndices(text, 25, 2)).not.toEqual(gaps);
    expect(
      gapIndices(text, 25, 1, new Set(["vers"])).every(
        (i) => tokens[i].text === "Vers",
      ),
    ).toBe(true);
  });
});
