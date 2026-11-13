export interface LyricToken {
  text: string;
  word: boolean;
  index: number;
}
export function lyricTokens(text: string): LyricToken[] {
  return (text.match(/\p{L}+(?:['’]\p{L}+)*|[^\p{L}]+/gu) ?? []).map(
    (text, index) => ({ text, word: /^\p{L}/u.test(text), index }),
  );
}
export function gapIndices(
  text: string,
  percent: number,
  seed: number,
  known?: Set<string>,
): number[] {
  const candidates = lyricTokens(text)
    .filter(
      (t) => t.word && (!known || known.has(t.text.toLocaleLowerCase("de"))),
    )
    .map((t) => t.index);
  const n = Math.min(
    candidates.length,
    Math.max(
      candidates.length ? 1 : 0,
      Math.round((candidates.length * percent) / 100),
    ),
  );
  const selected: number[] = [];
  let state = seed >>> 0;
  for (let i = 0; i < n; i++) {
    const begin = Math.floor((i * candidates.length) / n),
      end = Math.floor(((i + 1) * candidates.length) / n);
    state = (state * 1664525 + 1013904223) >>> 0;
    selected.push(candidates[begin + (state % Math.max(1, end - begin))]);
  }
  return selected;
}
