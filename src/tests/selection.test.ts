import { describe, it, expect } from "vitest";
import { phrases, transformations } from "../content";
import { wordConfusions } from "../content/distractors";
import {
  buildWordBank,
  sentenceChoices,
  shuffled,
} from "../learning/selection";
import { normalize } from "../correction";

describe("selección con alternativas", () => {
  it("Hola exige elegir entre cuatro significados distintos", () => {
    const bank = buildWordBank(phrases[0], phrases, wordConfusions, "hola");
    expect(bank.map((t) => normalize(t.text)).sort()).toEqual(
      ["hallo", "tschüss", "danke", "bitte"].sort(),
    );
  });
  it("todas las actividades tienen distractores, IDs únicos y todas sus soluciones construibles", () => {
    for (const phrase of [...phrases, ...transformations]) {
      const bank = buildWordBank(phrase, phrases, wordConfusions, "coverage");
      const answerWords = new Set(
        [phrase.de, ...phrase.variants].flatMap((a) =>
          a.split(/\s+/).map((w) => normalize(w)),
        ),
      );
      expect(
        bank.filter((t) => !answerWords.has(normalize(t.text))).length,
        phrase.id,
      ).toBeGreaterThanOrEqual(3);
      expect(new Set(bank.map((t) => t.id)).size).toBe(bank.length);
      // Compatibilidad con los índices que se guardaban antes de esta corrección.
      expect(
        bank.slice(0, phrase.de.split(/\s+/).length).map((t) => t.text),
      ).toEqual(phrase.de.split(/\s+/));
      for (const answer of [phrase.de, ...phrase.variants]) {
        const available = [...bank];
        for (const word of answer.split(/\s+/)) {
          const i = available.findIndex(
            (t) => normalize(t.text) === normalize(word),
          );
          expect(i, `${phrase.id}: ${word}`).toBeGreaterThanOrEqual(0);
          available.splice(i, 1);
        }
      }
    }
  });
  it("repite el mismo banco al recargar y varía entre rondas", () => {
    const p = phrases.find((p) => p.unit === "u11")!;
    expect(buildWordBank(p, phrases, wordConfusions, "saved")).toEqual(
      buildWordBank(p, phrases, wordConfusions, "saved"),
    );
    const variations = new Set(
      Array.from({ length: 10 }, (_, i) =>
        JSON.stringify(buildWordBank(p, phrases, wordConfusions, String(i))),
      ),
    );
    expect(variations.size).toBeGreaterThan(1);
    expect(shuffled([0, 1, 2, 3], "a")).not.toEqual(
      shuffled([0, 1, 2, 3], "b"),
    );
  });
  it("las preguntas de reconocimiento tienen cuatro opciones distintas y aleatorias", () => {
    for (const p of phrases) {
      const options = sentenceChoices(p, phrases, "round");
      expect(options, p.id).toHaveLength(4);
      expect(new Set(options.map((q) => normalize(q.de))).size).toBe(4);
      expect(options.some((q) => q.id === p.id)).toBe(true);
    }
    expect(
      sentenceChoices(phrases[0], phrases, "one").map((p) => p.id),
    ).not.toEqual(sentenceChoices(phrases[0], phrases, "two").map((p) => p.id));
  });
});
