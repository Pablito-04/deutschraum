import type { Card, UserData } from "./types";
import { units, phrases } from "../content";
export const intervals = [1, 3, 7, 16];
export function schedule(card: Card, ok: boolean, now = new Date()): Card {
  const box = ok ? Math.min(card.box + 1, 4) : 0;
  const due = new Date(
    now.getTime() +
      (ok ? intervals[Math.max(0, box - 1)] * 86400000 : 10 * 60000),
  );
  return {
    ...card,
    box,
    due: due.toISOString(),
    history: [...card.history, { at: now.toISOString(), ok }],
  };
}
export const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export function stats(data: UserData, now = new Date()) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - 6 + i);
    const key = dayKey(d);
    const attempts = data.attempts.filter(
      (a) => dayKey(new Date(a.at)) === key,
    );
    return {
      key,
      label: d.toLocaleDateString("es-ES", { weekday: "short" }),
      xp: attempts.reduce((n, a) => n + a.xp, 0),
      minutes: attempts.reduce((n, a) => n + a.seconds, 0) / 60,
      correct: attempts.filter((a) => a.correct).length,
      total: attempts.length,
    };
  });
  const activity = new Set(data.attempts.map((a) => dayKey(new Date(a.at))));
  let streak = 0;
  const cursor = new Date(now);
  if (!activity.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (activity.has(dayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return {
    days,
    streak,
    xp: data.attempts.reduce((n, a) => n + a.xp, 0),
    today: days[6],
    due: data.cards.filter((c) => c.due <= now.toISOString()).length,
    learned: data.cards.filter((c) => c.box >= 2).length,
    accuracy: data.attempts.length
      ? Math.round(
          (100 * data.attempts.filter((a) => a.correct).length) /
            data.attempts.length,
        )
      : 0,
  };
}
export function unitStatus(data: UserData, id: string) {
  const unit = units.find((u) => u.id === id)!;
  const read = unit.readings.some((r) => data.completed.includes(r.id));
  const practiced = unit.phrases.filter((p) =>
    data.attempts.some((a) => a.exercise === `lesson:${p.id}` && a.correct),
  ).length;
  const test = data.tests[id] ?? 0;
  return {
    read,
    practiced,
    test,
    complete: read && practiced === unit.phrases.length && test >= 80,
  };
}
export function currentUnit(data: UserData) {
  return (
    units.find((u) => !unitStatus(data, u.id).complete) ??
    units[units.length - 1]
  );
}
export function dailyTasks(data: UserData, minutes: number): string[] {
  const unit = currentUnit(data);
  const due = data.cards
    .filter((c) => c.due <= new Date().toISOString())
    .slice(0, minutes === 10 ? 2 : 4)
    .map((c) => `card:${c.wordId}`);
  const mistakes = [...data.attempts]
    .reverse()
    .filter((a) => !a.correct && a.unit === unit.id)
    .map((a) => phrases.find((p) => a.exercise.endsWith(p.id)))
    .filter((p) => !!p)
    .slice(0, 2)
    .map((p) => `lesson:${p!.id}`);
  const fresh = unit.phrases
    .filter(
      (p) =>
        !data.attempts.some(
          (a) => a.exercise === `lesson:${p.id}` && a.correct,
        ),
    )
    .map((p) => `lesson:${p.id}`);
  const reading =
    unit.readings.find((r) => !data.completed.includes(r.id)) ??
    unit.readings[0];
  const count = minutes === 10 ? 4 : minutes === 20 ? 8 : 16;
  return [
    ...new Set([
      ...due,
      ...mistakes,
      `read:${reading.id}`,
      ...fresh,
      ...unit.phrases.map((p) => `dictation:${p.id}`),
      ...unit.phrases.map((p) => `order:${p.id}`),
    ]),
  ].slice(0, count);
}
