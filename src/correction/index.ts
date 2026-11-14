export type Verdict = "correct" | "typo" | "incorrect";
export interface Correction {
  status: Verdict;
  expected: string;
  diff: {
    actual: string;
    expected: string;
    kind: "match" | "changed" | "missing" | "added";
  }[];
}
export function normalize(s: string, caseSensitive = false): string {
  const t = s
    .normalize("NFC")
    .replace(/[.,!?¡¿;:…„“”"«»]/gu, " ")
    .replace(/\s+/gu, " ")
    .trim();
  return caseSensitive ? t : t.toLocaleLowerCase("de");
}
export function tokens(s: string): string[] {
  return normalize(s).split(" ").filter(Boolean);
}
const protectedWords = new Set(
  "der die das den dem des ein eine einen einem einer eines kein keine keinen keinem keiner keines ich du er sie es wir ihr Sie mich dich ihn uns euch mir dir ihm ihnen nicht nichts schon schön hat hast habe haben habt ist bist bin sind seid war warst waren wart hatte hattest hatten hattet kann kannst können könnt muss musst müssen müsst darf darfst dürfen dürft will willst wollen wollt soll sollst sollen sollt mag magst mögen mögt mein meine meinen meinem meiner dein deine seinen seine sein sind ihr ihre im am zum zur mit nach aus bei von zu in an auf für um vor hinter neben und oder aber denn weil wenn als so ja nein nur noch mehr viel wenig sehr es"
    .toLocaleLowerCase("de")
    .split(/\s+/),
);
// Damerau-Levenshtein acotado: solo una edición dentro de UNA palabra larga.
export function oneEdit(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1 || a === b) return false;
  if (a.length === b.length) {
    const diff = [...a]
      .map((c, i) => (c === b[i] ? -1 : i))
      .filter((i) => i >= 0);
    return (
      diff.length === 1 ||
      (diff.length === 2 &&
        diff[1] === diff[0] + 1 &&
        a[diff[0]] === b[diff[1]] &&
        a[diff[1]] === b[diff[0]])
    );
  }
  const [s, l] = a.length < b.length ? [a, b] : [b, a];
  let i = 0;
  while (i < s.length && s[i] === l[i]) i++;
  return s.slice(i) === l.slice(i + 1);
}
function safeTypo(a: string, b: string, lexicon: Set<string>): boolean {
  if (
    a.length < 5 ||
    b.length < 5 ||
    protectedWords.has(a) ||
    protectedWords.has(b) ||
    lexicon.has(a)
  )
    return false;
  // No suavizar diacríticos, finales flexivos ni la primera letra (puede cambiar una raíz).
  if (a[0] !== b[0] || a.slice(-1) !== b.slice(-1)) return false;
  // Los finales flexivos se preservan. En una raíz consonántica se permite una transposición interna.
  const ending = b.match(/(?:en|er|es|em|st|et|e|n|s|t)$/)?.[0];
  if (ending && !a.endsWith(ending)) return false;
  if (/[äöüß]/.test(a + b)) {
    const marks = (s: string) =>
      [...s].filter((c) => "äöüß".includes(c)).join("");
    if (marks(a) !== marks(b)) return false;
  }
  if (a.length === b.length) {
    const changed = [...a]
      .map((c, i) => (c === b[i] ? -1 : i))
      .filter((i) => i >= 0);
    if (changed.length === 1) {
      const i = changed[0];
      if (/[aeiouäöü]/.test(a[i] + b[i])) return false;
      const rows = ["qwertzuiop", "asdfghjkl", "yxcvbnm"];
      const position = (c: string) => {
        for (let y = 0; y < rows.length; y++) {
          const x = rows[y].indexOf(c);
          if (x >= 0) return [x + y * 0.3, y];
        }
        return null;
      };
      const p = position(a[i]),
        q = position(b[i]);
      if (!p || !q || Math.abs(p[0] - q[0]) > 1.4 || Math.abs(p[1] - q[1]) > 1)
        return false;
    }
  }
  return oneEdit(a, b);
}
export function wordDiff(actual: string, expected: string): Correction["diff"] {
  const a = actual.split(/\s+/).filter((word) => normalize(word).length > 0),
    b = expected.split(/\s+/).filter((word) => normalize(word).length > 0);
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array<number>(b.length + 1).fill(0),
  );
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] +
          (normalize(a[i - 1]) === normalize(b[j - 1]) ? 0 : 1),
      );
  const out: Correction["diff"] = [];
  let i = a.length,
    j = b.length;
  while (i || j) {
    if (
      i &&
      j &&
      dp[i][j] ===
        dp[i - 1][j - 1] + (normalize(a[i - 1]) === normalize(b[j - 1]) ? 0 : 1)
    ) {
      out.unshift({
        actual: a[--i],
        expected: b[--j],
        kind: normalize(a[i]) === normalize(b[j]) ? "match" : "changed",
      });
    } else if (j && dp[i][j] === dp[i][j - 1] + 1) {
      out.unshift({ actual: "", expected: b[--j], kind: "missing" });
    } else {
      out.unshift({ actual: a[--i], expected: "", kind: "added" });
    }
  }
  return out;
}
export function correct(
  actual: string,
  answers: string[],
  options: {
    caseSensitive?: boolean;
    allowTypos?: boolean;
    keyboardVariants?: string[];
    lexicon?: Set<string>;
  } = {},
): Correction {
  const accepted = [...answers, ...(options.keyboardVariants ?? [])];
  const norm = normalize(actual, options.caseSensitive);
  const exact = accepted.find(
    (s) => normalize(s, options.caseSensitive) === norm,
  );
  if (exact)
    return {
      status: "correct",
      expected: exact,
      diff: wordDiff(actual, exact),
    };
  const a = tokens(actual);
  if (!options.caseSensitive && options.allowTypos !== false) {
    for (const answer of accepted) {
      const b = tokens(answer);
      if (a.length !== b.length) continue;
      const changed = a
        .map((v, i) => (v === b[i] ? -1 : i))
        .filter((i) => i >= 0);
      if (
        changed.length === 1 &&
        safeTypo(a[changed[0]], b[changed[0]], options.lexicon ?? new Set())
      )
        return {
          status: "typo",
          expected: answer,
          diff: wordDiff(actual, answer),
        };
    }
  }
  const expected =
    accepted
      .map((s) => ({
        s,
        score: wordDiff(actual, s).filter((d) => d.kind !== "match").length,
      }))
      .sort((x, y) => x.score - y.score)[0]?.s ?? "";
  return { status: "incorrect", expected, diff: wordDiff(actual, expected) };
}
