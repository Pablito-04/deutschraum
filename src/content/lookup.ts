import type { Word } from "./types";
export function lookupKey(text: string) {
  return text
    .normalize("NFC")
    .toLocaleLowerCase("de")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}
// Solo formas documentadas: no se adivinan raíces ni traducciones por similitud.
export function dictionaryIndex(words: Word[]) {
  const map = new Map<string, Word[]>();
  const add = (key: string, w: Word) => {
    const k = lookupKey(key);
    if (!k) return;
    const list = map.get(k) ?? [];
    if (!list.some((x) => x.id === w.id)) map.set(k, [...list, w]);
  };
  for (const w of words) {
    add(w.de.replace(/^(der|die|das) /, ""), w);
    w.aliases.forEach((a) => add(a, w));
    if (w.plural && !["—", "solo plural"].includes(w.plural)) {
      const plural = w.plural.split(";")[0];
      if (/^\p{L}+$/u.test(plural)) add(plural, w);
    }
    for (const form of w.forms ?? []) {
      const parts = form.split(" ");
      if (/^(hat|ist)$/.test(parts[0]) && parts.length > 1)
        add(parts.at(-1)!, w);
      else if (/^(ich|du|er|sie|es|wir|ihr|Sie)$/.test(parts[0]) && parts[1])
        add(parts[1], w);
    }
  }
  return map;
}
