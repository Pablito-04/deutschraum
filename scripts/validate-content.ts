import assert from "node:assert/strict";
import {
  units,
  phrases,
  readings,
  vocabulary,
  transformations,
  expressions,
  counts,
} from "../src/content/index";
import { normalize } from "../src/correction/index";
export function validateContent() {
  const ids = new Set<string>();
  const add = (id: string) => {
    assert(!ids.has(id), `ID repetido: ${id}`);
    ids.add(id);
  };
  const unitIds = new Set(units.map((u) => u.id));
  const wordIds = new Set(vocabulary.map((w) => w.id));
  const ruleIds = new Set(units.map((u) => u.grammar.id));
  const valid = (s: string | undefined, label: string) =>
    assert(
      s &&
        s.trim() &&
        !/lorem ipsum|próximamente|contenido pendiente|palabra \d+|ejercicio pendiente/i.test(
          s,
        ),
      `Texto vacío o ficticio: ${label}`,
    );
  assert(units.length >= 18 && units.length <= 24);
  assert(vocabulary.length >= 700);
  assert(readings.length >= 50);
  assert(phrases.length >= 150);
  assert(counts.dictations >= 100);
  assert(counts.wordOrder >= 150);
  assert.equal(expressions.length, 30);
  for (const u of units) {
    add(u.id);
    add(u.grammar.id);
    assert(u.goals.length >= 3);
    assert(u.phrases.length >= 8);
    assert(u.readings.length >= 2);
    assert(u.previous.every((p) => unitIds.has(p) && p < u.id));
    Object.entries(u.grammar)
      .filter(([k]) => k !== "blocks")
      .forEach(([k, v]) => valid(String(v), u.id + k));
    assert(u.grammar.blocks.length > 0);
  }
  for (const p of [...phrases, ...transformations]) {
    add(p.id);
    valid(p.de, p.id);
    valid(p.es, p.id);
    valid(p.hint, p.id);
    assert(unitIds.has(p.unit));
    assert(ruleIds.has(p.rule));
    assert(p.variants.every((v) => normalize(v) !== normalize(p.de)));
  }
  for (const r of readings) {
    add(r.id);
    valid(r.context, r.id);
    assert(unitIds.has(r.unit));
    assert(r.lines.length >= 4);
    r.lines.forEach((l) => {
      valid(l.de, r.id);
      valid(l.es, r.id);
    });
    assert(r.questions.length >= 2);
    for (const q of r.questions) {
      assert(q.choices.length >= 3);
      assert(q.answer >= 0 && q.answer < q.choices.length);
      assert(new Set(q.choices).size === q.choices.length);
      valid(q.explanation, r.id);
    }
    assert(r.targetVocabulary.every((id) => wordIds.has(id)));
    assert(r.knownVocabulary.every((id) => wordIds.has(id)));
    assert(r.grammar.every((id) => ruleIds.has(id)));
  }
  for (const w of vocabulary) {
    add(w.id);
    ["de", "es", "example", "translation"].forEach((k) =>
      valid(w[k as keyof typeof w] as string, w.id + k),
    );
    assert(unitIds.has(w.unit));
    if (w.pos === "sustantivo") {
      assert(w.article && ["der", "die", "das"].includes(w.article));
      assert(w.plural);
      assert(w.gender);
    }
    if (w.pos === "verbo") assert(w.forms && w.forms.length >= 2, w.id);
  }
  for (const e of expressions) {
    add(e.id);
    Object.values(e).forEach((v) => valid(v, e.id));
  }
  return counts;
}
console.log("Contenido validado:", JSON.stringify(validateContent(), null, 2));
