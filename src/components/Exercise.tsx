import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { Phrase } from "../content";
import { phrases, vocabulary } from "../content";
import { correct, type Correction, type Verdict } from "../correction";
import { useApp } from "../app/context";
import type { Skill } from "../learning/types";
import { AudioButton } from "./common";
import { Icon } from "./Icon";
import { WordSentence } from "./WordSentence";
export type Mode = "translation" | "dictation" | "order" | "choice";
export function shuffled<T>(list: T[], seed: string): T[] {
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
const lexicon = new Set(
  vocabulary.flatMap((w) => [
    ...w.de
      .replace(/^(der|die|das) /, "")
      .toLocaleLowerCase("de")
      .split(" "),
    ...(w.forms ?? []).flatMap((f) => f.toLocaleLowerCase("de").split(" ")),
    ...(w.plural ?? "").toLocaleLowerCase("de").split(/[^\p{L}]+/u),
  ]),
);
export function Exercise({
  phrase,
  mode,
  exerciseId,
  onAdvance,
  final = false,
  skillOverride,
}: {
  phrase: Phrase;
  mode: Mode;
  exerciseId: string;
  onAdvance?: (result: { correct: boolean; first: boolean }) => void;
  final?: boolean;
  skillOverride?: Skill;
}) {
  const { data, record, update } = useApp();
  const saved = data.drafts[exerciseId] ?? "";
  const [input, setInput] = useState(mode === "order" ? "" : saved);
  const [chosen, setChosen] = useState<number[]>(
    mode === "order" ? saved.split(",").filter(Boolean).map(Number) : [],
  );
  const [result, setResult] = useState<Correction | null>(null);
  const [versions, setVersions] = useState<
    { answer: string; status: Verdict }[]
  >([]);
  const multi =
    exerciseId.startsWith("reformular:") && phrase.variants.length > 0;
  const versionLimit = Math.min(3, phrase.variants.length + 1);
  const [firstCorrect, setFirstCorrect] = useState(
    data.attempts.find((a) => a.exercise === exerciseId)?.correct ?? false,
  );
  const [revealed, setRevealed] = useState(false);
  const started = useRef(performance.now());
  const tries = useRef(
    data.attempts.filter((a) => a.exercise === exerciseId).length,
  );
  const source = phrase.de.split(/\s+/);
  const pool = shuffled(
    source.map((text, id) => ({ text, id })),
    phrase.id,
  );
  const answer =
    mode === "order" ? chosen.map((id) => source[id]).join(" ") : input;
  const skill: Skill =
    skillOverride ??
    (mode === "order"
      ? "orden"
      : mode === "dictation" || mode === "choice"
        ? "oído"
        : "reformular");
  useEffect(() => {
    const value = mode === "order" ? chosen.join(",") : input;
    const timer = setTimeout(
      () =>
        update((d) => ({ ...d, drafts: { ...d.drafts, [exerciseId]: value } })),
      180,
    );
    return () => clearTimeout(timer);
  }, [input, chosen, exerciseId, mode]);
  const check = (solution = false) => {
    if (result) return;
    const verdict = solution
      ? { status: "incorrect" as const, expected: phrase.de, diff: [] }
      : correct(answer, [phrase.de, ...phrase.variants], {
          allowTypos: mode !== "order" && mode !== "choice",
          lexicon,
        });
    const ok = verdict.status !== "incorrect";
    if (tries.current === 0) setFirstCorrect(ok);
    tries.current++;
    setResult(verdict);
    if (multi && !solution)
      setVersions((v) =>
        [...v, { answer, status: verdict.status }].slice(0, 3),
      );
    setRevealed(solution);
    record(
      exerciseId,
      phrase.unit,
      skill,
      ok,
      answer,
      verdict.expected,
      (performance.now() - started.current) / 1000,
      verdict.status === "typo",
    );
    started.current = performance.now();
  };
  const choices = shuffled(
    [
      phrase,
      ...phrases
        .filter((p) => p.id !== phrase.id && p.unit === phrase.unit)
        .slice(0, 2),
    ],
    phrase.id + "choice",
  );
  return (
    <section className="exercise-card">
      <div className="exercise-top">
        <span className="pill">
          {mode === "order"
            ? "CONSTRUYE"
            : mode === "dictation"
              ? "ESCUCHA Y ESCRIBE"
              : mode === "choice"
                ? "ESCUCHA Y RECONOCE"
                : phrase.task
                  ? "TRANSFORMA"
                  : "ESCRIBE EN ALEMÁN"}
        </span>
        <span>{phrase.unit.toUpperCase()}</span>
      </div>
      <h2>
        {mode === "dictation"
          ? "¿Qué has escuchado?"
          : mode === "choice"
            ? "Elige la frase que oyes."
            : phrase.task
              ? phrase.task
              : phrase.es}
      </h2>
      {phrase.prompt && (
        <p className="prompt-source" lang="de">
          {phrase.prompt}
        </p>
      )}
      {mode === "dictation" || mode === "choice" ? (
        <div className="listen-orb">
          <AudioButton text={phrase.de} label="Reproducir frase" />
          <p>Escucha las veces que necesites. Velocidad en Ajustes.</p>
        </div>
      ) : (
        <AudioButton
          text={phrase.de}
          small
          label="Escuchar la solución alemana"
        />
      )}
      {mode === "order" ? (
        <>
          <div className="answer-slots" aria-label="Tu oración">
            {chosen.length === 0 ? (
              <span>Toca las palabras para construir la frase…</span>
            ) : (
              chosen.map((id, i) => (
                <button
                  disabled={!!result}
                  key={`${id}-${i}`}
                  className="word-token selected"
                  onClick={() => setChosen((c) => c.filter((_, j) => j !== i))}
                >
                  {source[id]}
                  <span className="sr-only">, devolver</span>
                </button>
              ))
            )}
          </div>
          <div className="word-pool" aria-label="Palabras disponibles">
            {pool.map((t) => (
              <button
                key={t.id}
                disabled={chosen.includes(t.id) || !!result}
                className="word-token"
                onClick={() => setChosen((c) => [...c, t.id])}
              >
                {t.text}
              </button>
            ))}
          </div>
          <div className="exercise-tools">
            <button
              disabled={!!result || !chosen.length}
              onClick={() => setChosen((c) => c.slice(0, -1))}
            >
              Deshacer
            </button>
            <button
              disabled={!!result || !chosen.length}
              onClick={() => setChosen([])}
            >
              Reiniciar
            </button>
            <button
              disabled={!!result || !chosen.length}
              onClick={() => check()}
            >
              ¿Mi orden también vale?
            </button>
          </div>
        </>
      ) : mode === "choice" ? (
        <div className="choices">
          {choices.map((p) => (
            <button
              disabled={!!result}
              className={input === p.de ? "selected" : ""}
              key={p.id}
              onClick={() => setInput(p.de)}
              lang="de"
            >
              {p.de}
            </button>
          ))}
        </div>
      ) : (
        <label className="answer-label">
          Tu respuesta
          <textarea
            maxLength={5000}
            aria-label="Tu respuesta"
            autoCapitalize="off"
            autoComplete="off"
            spellCheck={false}
            lang="de"
            placeholder="Escribe aquí en alemán…"
            value={input}
            disabled={!!result}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                (e.ctrlKey || e.metaKey) &&
                answer.trim()
              )
                check();
            }}
          />
        </label>
      )}
      {!result && (
        <div className="umlaut-keys">
          {mode !== "order" &&
            mode !== "choice" &&
            ["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"].map((c) => (
              <button
                aria-label={`Añadir ${c}`}
                key={c}
                onClick={() => setInput((v) => v + c)}
              >
                {c}
              </button>
            ))}
        </div>
      )}
      {result && (
        <div className={`feedback ${result.status}`} role="status">
          <strong>
            <Icon name={result.status === "incorrect" ? "info" : "check"} />
            {result.status === "correct"
              ? "Richtig! Bien hecho."
              : result.status === "typo"
                ? "Correcto, con una pequeña errata."
                : revealed
                  ? "Esta es una solución registrada."
                  : "Tu respuesta no coincide con las soluciones registradas."}
          </strong>
          <WordSentence text={result.expected} />
          {mode === "dictation" && result.diff.length > 0 && (
            <div className="diff">
              {result.diff.map((d, i) => (
                <span
                  key={i}
                  className={d.kind}
                  title={
                    d.kind === "missing"
                      ? "Omisión"
                      : d.kind === "added"
                        ? "Palabra añadida"
                        : d.kind === "changed"
                          ? "Palabra diferente"
                          : "Coincidencia"
                  }
                >
                  {d.kind === "match"
                    ? d.actual
                    : d.kind === "missing"
                      ? `+ ${d.expected}`
                      : d.kind === "added"
                        ? `− ${d.actual}`
                        : `${d.actual} → ${d.expected}`}
                </span>
              ))}
            </div>
          )}
          <p className="small">{phrase.hint}</p>
          {phrase.variants.length > 0 && (
            <details>
              <summary>Otras formas aceptadas</summary>
              {phrase.variants.map((v) => (
                <p key={v} lang="de">
                  {v}
                </p>
              ))}
            </details>
          )}
          <Link className="text-link" to={`/gramatica?unidad=${phrase.unit}`}>
            Consultar la regla
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      )}
      {multi && versions.length > 0 && (
        <div className="versions">
          <strong>
            Versiones comprobadas ({versions.length}/{versionLimit})
          </strong>
          {versions.map((v, i) => (
            <p key={i}>
              <span lang="de">{v.answer}</span>
              <span
                className={
                  v.status === "incorrect" ? "error-text" : "success-text"
                }
              >
                {v.status === "correct"
                  ? "Registrada"
                  : v.status === "typo"
                    ? "Con errata"
                    : "No reconocida"}
              </span>
            </p>
          ))}
          {result && versions.length < versionLimit && (
            <button
              className="text-link"
              onClick={() => {
                setInput("");
                setResult(null);
                setRevealed(false);
                started.current = performance.now();
              }}
            >
              Probar otra versión de esta frase
              <Icon name="plus" size={16} />
            </button>
          )}
        </div>
      )}
      <div className="exercise-footer">
        {!result ? (
          <>
            <details>
              <summary>Una pista</summary>
              <p>{phrase.hint}</p>
            </details>
            <div className="button-row">
              <button className="button ghost" onClick={() => check(true)}>
                Ver solución
              </button>
              <button
                className="button primary"
                disabled={!answer.trim()}
                onClick={() => check()}
              >
                Comprobar
                <Icon name="check" size={17} />
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              className="button secondary"
              onClick={() => {
                setResult(null);
                setRevealed(false);
                setInput("");
                setChosen([]);
                started.current = performance.now();
              }}
            >
              Intentar otra vez
            </button>
            {onAdvance && (
              <button
                className="button primary"
                onClick={() => {
                  update((d) => {
                    const drafts = { ...d.drafts };
                    delete drafts[exerciseId];
                    return { ...d, drafts };
                  });
                  onAdvance({
                    correct: result.status !== "incorrect",
                    first: firstCorrect,
                  });
                }}
              >
                {final ? "Terminar" : "Continuar"}
                <Icon name="arrow" size={17} />
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
