import type { UserData } from "../learning/types";
export const DB_NAME = "deutschraum";
export function initialData(): UserData {
  return {
    schema: 1,
    started: new Date().toISOString(),
    profile: {
      onboarded: false,
      minutes: 20,
      theme: "system",
      voice: "",
      rate: 0.85,
    },
    attempts: [],
    cards: [],
    customWords: [],
    completed: [],
    listened: [],
    tests: {},
    session: null,
    sessionsCompleted: 0,
    drafts: {},
    songs: [],
  };
}
let connection: Promise<IDBDatabase> | undefined;
function db(): Promise<IDBDatabase> {
  return (connection ??= new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains("state"))
        req.result.createObjectStore("state");
    };
    req.onsuccess = () => {
      req.result.onversionchange = () => {
        req.result.close();
        connection = undefined;
      };
      resolve(req.result);
    };
    req.onerror = () => {
      connection = undefined;
      reject(req.error);
    };
    req.onblocked = () =>
      reject(
        new Error(
          "Cierra otras pestañas de Deutschraum para actualizar los datos.",
        ),
      );
  }));
}
export async function loadData(): Promise<UserData> {
  const database = await db();
  return new Promise((resolve, reject) => {
    const req = database.transaction("state").objectStore("state").get("user");
    req.onsuccess = () => {
      try {
        resolve(req.result ? validateData(req.result) : initialData());
      } catch (e) {
        reject(e);
      }
    };
    req.onerror = () => reject(req.error);
  });
}
export async function saveData(data: UserData): Promise<void> {
  const database = await db();
  return new Promise((resolve, reject) => {
    const tx = database.transaction("state", "readwrite");
    tx.objectStore("state").put(data, "user");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}
const fail = (): never => {
  throw new Error(
    "La copia no tiene un formato Deutschraum válido (versión 1). No se ha cambiado ningún dato.",
  );
};
const obj = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v);
const str = (v: unknown, max = 10000): v is string =>
  typeof v === "string" && v.length <= max;
const integer = (v: unknown, min = 0, max = 10000000) =>
  typeof v === "number" && Number.isInteger(v) && v >= min && v <= max;
const date = (v: unknown) =>
  str(v, 40) && /^\d{4}-\d\d-\d\dT/.test(v) && Number.isFinite(Date.parse(v));
const arr = (v: unknown, max = 200000): v is unknown[] =>
  Array.isArray(v) && v.length <= max;
const skills = new Set([
  "lectura",
  "oído",
  "vocabulario",
  "gramática",
  "orden",
  "reformular",
  "canciones",
]);
export function validateData(input: unknown): UserData {
  if (
    !obj(input) ||
    input.schema !== 1 ||
    !date(input.started) ||
    !obj(input.profile)
  )
    return fail();
  const p = input.profile;
  if (
    typeof p.onboarded !== "boolean" ||
    ![10, 20, 40].includes(p.minutes as number) ||
    !["system", "light", "dark"].includes(p.theme as string) ||
    !str(p.voice, 300) ||
    typeof p.rate !== "number" ||
    p.rate < 0.4 ||
    p.rate > 1.2
  )
    return fail();
  if (
    !arr(input.attempts) ||
    !input.attempts.every(
      (a) =>
        obj(a) &&
        str(a.id, 200) &&
        str(a.exercise, 300) &&
        str(a.unit, 50) &&
        skills.has(a.skill as string) &&
        typeof a.correct === "boolean" &&
        typeof a.typo === "boolean" &&
        typeof a.first === "boolean" &&
        date(a.at) &&
        typeof a.seconds === "number" &&
        a.seconds >= 0 &&
        a.seconds <= 600 &&
        integer(a.xp, 0, 20) &&
        str(a.answer, 100000) &&
        str(a.expected, 100000),
    )
  )
    return fail();
  if (
    !arr(input.cards, 20000) ||
    !input.cards.every(
      (c) =>
        obj(c) &&
        str(c.wordId, 300) &&
        integer(c.box, 0, 4) &&
        date(c.due) &&
        arr(c.history, 100000) &&
        c.history.every(
          (h) => obj(h) && date(h.at) && typeof h.ok === "boolean",
        ),
    )
  )
    return fail();
  if (
    new Set(input.cards.map((c) => (c as { wordId: string }).wordId)).size !==
    input.cards.length
  )
    return fail();
  if (
    !arr(input.customWords, 10000) ||
    !input.customWords.every(
      (w) =>
        obj(w) &&
        w.custom === true &&
        str(w.id, 300) &&
        (w.id as string).startsWith("custom-") &&
        str(w.de, 300) &&
        str(w.es, 1000) &&
        str(w.pos, 100) &&
        str(w.unit, 50) &&
        ["A0", "A1", "A2"].includes(w.level as string) &&
        str(w.example) &&
        str(w.translation) &&
        arr(w.aliases, 30) &&
        w.aliases.every((x) => str(x, 300)) &&
        arr(w.related, 100) &&
        w.related.every((x) => str(x, 300)) &&
        ["article", "gender", "plural", "irregular"].every(
          (k) => w[k] === undefined || str(w[k], 1000),
        ) &&
        (w.forms === undefined ||
          (arr(w.forms, 50) && w.forms.every((x) => str(x, 300)))),
    )
  )
    return fail();
  if (
    new Set(input.customWords.map((w) => (w as { id: string }).id)).size !==
    input.customWords.length
  )
    return fail();
  if (
    input.listened !== undefined &&
    (!arr(input.listened) || !input.listened.every((x) => str(x, 300)))
  )
    return fail();
  if (
    !arr(input.completed) ||
    !input.completed.every((x) => str(x, 300)) ||
    !obj(input.tests) ||
    !Object.entries(input.tests).every(
      ([k, v]) => /^u\d{2}$/.test(k) && integer(v, 0, 100),
    ) ||
    !integer(input.sessionsCompleted) ||
    !obj(input.drafts) ||
    !Object.entries(input.drafts).every(
      ([k, v]) => str(k, 300) && str(v, 100000),
    )
  )
    return fail();
  if (input.session !== null) {
    const s = input.session;
    if (
      !obj(s) ||
      !str(s.id, 200) ||
      !str(s.unit, 50) ||
      !["lesson", "test", "daily"].includes(s.type as string) ||
      !arr(s.tasks, 200) ||
      s.tasks.length === 0 ||
      !s.tasks.every((t) => str(t, 300)) ||
      !integer(s.index, 0, s.tasks.length - 1) ||
      !integer(s.correct, 0, s.tasks.length) ||
      !integer(s.firstCorrect, 0, s.tasks.length) ||
      !date(s.started)
    )
      return fail();
  }
  if (
    !arr(input.songs, 1000) ||
    !input.songs.every(
      (s) =>
        obj(s) && str(s.id, 200) && str(s.title, 300) && str(s.text, 100000),
    )
  )
    return fail();
  // Clonar JSON elimina prototipos y evita compartir referencias con un archivo importado.
  return JSON.parse(
    JSON.stringify({ ...input, listened: input.listened ?? [] }),
  ) as UserData;
}
export function parseBackup(text: string): UserData {
  if (text.length > 25_000_000) throw new Error("La copia supera 25 MB.");
  return validateData(JSON.parse(text));
}
