export type Level = "A0" | "A1" | "A2";
export interface Phrase {
  id: string;
  unit: string;
  de: string;
  es: string;
  variants: string[];
  hint: string;
  rule: string;
  task?: string;
  prompt?: string;
}
export interface Question {
  prompt: string;
  choices: string[];
  answer: number;
  explanation: string;
}
export interface Reading {
  id: string;
  unit: string;
  title: string;
  context: string;
  kind: "Diálogo" | "Historia" | "Mensaje";
  lines: { de: string; es: string }[];
  questions: Question[];
  level: Level;
  targetVocabulary: string[];
  knownVocabulary: string[];
  grammar: string[];
  minutes: number;
}
export interface Grammar {
  id: string;
  title: string;
  explanation: string;
  rule: string;
  example: string;
  translation: string;
  blocks: { text: string; role: string }[];
  tip: string;
  error: string;
  correction: string;
  exception: string;
}
export interface Unit {
  id: string;
  number: number;
  level: Level;
  title: string;
  subtitle: string;
  goals: string[];
  previous: string[];
  grammar: Grammar;
  phrases: Phrase[];
  readings: Reading[];
}
export interface Word {
  id: string;
  de: string;
  es: string;
  pos: string;
  level: Level;
  unit: string;
  article?: string;
  gender?: string;
  plural?: string;
  forms?: string[];
  irregular?: string;
  example: string;
  translation: string;
  aliases: string[];
  related: string[];
  custom?: boolean;
}
export interface Expression {
  id: string;
  de: string;
  literal: string;
  meaning: string;
  context: string;
  register: string;
  example: string;
}
