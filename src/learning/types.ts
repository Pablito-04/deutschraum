import type { Word } from "../content/types";
export type Skill =
  | "lectura"
  | "oído"
  | "vocabulario"
  | "gramática"
  | "orden"
  | "reformular"
  | "canciones";
export interface Attempt {
  id: string;
  exercise: string;
  unit: string;
  skill: Skill;
  correct: boolean;
  typo: boolean;
  first: boolean;
  at: string;
  seconds: number;
  answer: string;
  expected: string;
  xp: number;
}
export interface Card {
  wordId: string;
  box: number;
  due: string;
  history: { at: string; ok: boolean }[];
}
export interface Session {
  id: string;
  unit: string;
  type: "lesson" | "test" | "daily";
  index: number;
  tasks: string[];
  correct: number;
  firstCorrect: number;
  started: string;
}
export interface UserData {
  schema: 1;
  started: string;
  profile: {
    onboarded: boolean;
    minutes: 10 | 20 | 40;
    theme: "system" | "light" | "dark";
    voice: string;
    rate: number;
  };
  attempts: Attempt[];
  cards: Card[];
  customWords: Word[];
  completed: string[];
  listened: string[];
  tests: Record<string, number>;
  session: Session | null;
  sessionsCompleted: number;
  drafts: Record<string, string>;
  songs: { id: string; title: string; text: string }[];
}
