import { units, phrases } from "./curriculum";
import { readings } from "./readings";
import { vocabulary } from "./vocabulary";
import { transformations } from "./transformations";
import { dictionaryIndex, lookupKey } from "./lookup";
export { units, phrases, readings, vocabulary, transformations };
export { expressions, artists } from "./expressions";
export type * from "./types";
export { dictionaryIndex, lookupKey } from "./lookup";
export const dictionary = dictionaryIndex(vocabulary);
for (const unit of units)
  unit.readings = readings.filter((r) => r.unit === unit.id);
for (const reading of readings) {
  const text = lookupKey(reading.lines.map((l) => l.de).join(" "));
  const found = new Map(
    text
      .split(" ")
      .flatMap((t) => (dictionary.get(t) ?? []).map((w) => [w.id, w] as const)),
  );
  for (const w of vocabulary) {
    const key = lookupKey(w.de.replace(/^(der|die|das) /, ""));
    if (key.includes(" ") && ` ${text} `.includes(` ${key} `))
      found.set(w.id, w);
  }
  reading.targetVocabulary = [...found.values()]
    .filter((w) => w.unit === reading.unit)
    .map((w) => w.id);
  reading.knownVocabulary = [...found.values()]
    .filter((w) => w.unit < reading.unit)
    .map((w) => w.id);
}
export const counts = {
  units: units.length,
  words: vocabulary.length,
  readings: readings.length,
  questions: readings.reduce((n, r) => n + r.questions.length, 0),
  sources: phrases.length,
  translations: phrases.length,
  transformations: transformations.length,
  dictations: phrases.length,
  wordOrder:
    phrases.filter((p) => p.de.split(/\s+/).length >= 3).length +
    transformations.filter((p) => p.de.split(/\s+/).length >= 3).length,
};
