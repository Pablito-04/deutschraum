import type { Phrase } from "../content/types";
import { normalize } from "../correction";

export function shuffled<T>(list: readonly T[], seed: string): T[] {
  const out = [...list];
  let n = [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  for (let i = out.length - 1; i > 0; i--) {
    n = (n * 1664525 + 1013904223) >>> 0;
    const j = n % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  if (out.length > 1 && out.every((v, i) => v === list[i]))
    out.push(out.shift()!);
  return out;
}

export interface WordToken {
  id: number;
  text: string;
}
export function buildWordBank(
  phrase: Phrase,
  phrases: readonly Phrase[],
  groups: readonly { unit: string; words: readonly string[] }[],
  seed: string,
): WordToken[] {
  // Los IDs de la respuesta original se conservan: los borradores publicados
  // anteriormente siguen significando lo mismo al añadir opciones nuevas.
  const words = phrase.de.split(/\s+/);
  const counts = (text: string) => {
    const result = new Map<string, number>();
    for (const word of text.split(/\s+/)) {
      const key = normalize(word);
      result.set(key, (result.get(key) ?? 0) + 1);
    }
    return result;
  };
  const available = counts(phrase.de);
  for (const variant of phrase.variants) {
    const needed = counts(variant);
    for (const text of variant.split(/\s+/)) {
      const key = normalize(text);
      if ((available.get(key) ?? 0) < needed.get(key)!) {
        words.push(text);
        available.set(key, (available.get(key) ?? 0) + 1);
      }
    }
  }
  const units = [...new Set(phrases.map((p) => p.unit))];
  const eligibleUnits = new Set(units.slice(0, units.indexOf(phrase.unit) + 1));
  const related = groups.filter(
    (g) =>
      eligibleUnits.has(g.unit) &&
      g.words.some((w) => available.has(normalize(w))),
  );
  const thematic = shuffled(
    related.flatMap((g) => g.words),
    seed + ":contrasts",
  );
  const sameUnit = shuffled(
    phrases
      .filter((p) => p.unit === phrase.unit)
      .flatMap((p) => p.de.split(/\s+/)),
    seed + ":unit",
  );
  const previous = shuffled(
    phrases
      .filter((p) => eligibleUnits.has(p.unit))
      .flatMap((p) => p.de.split(/\s+/)),
    seed + ":previous",
  );
  const distractorCount = phrase.de.split(/\s+/).length <= 3 ? 3 : 4;
  const distractors: string[] = [];
  const used = new Set(available.keys());
  for (const text of [...thematic, ...sameUnit, ...previous]) {
    const key = normalize(text);
    if (!key || used.has(key)) continue;
    used.add(key);
    distractors.push(text);
    if (distractors.length === distractorCount) break;
  }
  return [...words, ...distractors].map((text, id) => ({ id, text }));
}

export function sentenceChoices(
  phrase: Phrase,
  phrases: readonly Phrase[],
  seed: string,
): Phrase[] {
  const seen = new Set(
    [phrase.de, ...phrase.variants].map((s) => normalize(s)),
  );
  const candidates = shuffled(
    phrases.filter((p) => p.unit === phrase.unit && p.id !== phrase.id),
    seed + ":alternatives",
  );
  const choices = [phrase];
  for (const p of candidates) {
    const key = normalize(p.de);
    if (seen.has(key) || p.es === phrase.es) continue;
    seen.add(key);
    choices.push(p);
    if (choices.length === 4) break;
  }
  return shuffled(choices, seed + ":positions");
}
