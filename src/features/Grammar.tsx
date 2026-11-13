import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  units,
  transformations,
  expressions,
  vocabulary,
  lookupKey,
  type Expression,
  type Word,
} from "../content";
import { useApp } from "../app/context";
import { Exercise, shuffled } from "../components/Exercise";
import { PageHead, Tabs, AudioButton } from "../components/common";
import { Icon } from "../components/Icon";
export function Grammar() {
  const { data, update, notice, record, addCard } = useApp();
  const [params, setParams] = useSearchParams();
  const [tab, setTab] = useState("rules");
  const unit = units.find((u) => u.id === params.get("unidad")) ?? units[0];
  const [game, setGame] = useState(0);
  const [selection, setSelection] = useState("");
  const target = expressions[game % expressions.length];
  const choices = shuffled(
    [
      target,
      ...expressions
        .filter((e) => e.id !== target.id)
        .slice((game % 5) * 3, (game % 5) * 3 + 3),
    ],
    target.id,
  );
  const add = (e: Expression) => {
    const existing = [...vocabulary, ...data.customWords].find(
      (w) => lookupKey(w.de) === lookupKey(e.de),
    );
    if (existing) {
      addCard(existing.id);
      return;
    }
    const id = `custom-${e.id}`;
    const w: Word = {
      id,
      de: e.de,
      es: e.meaning,
      unit: "personal",
      level: "A1",
      pos: "expresión",
      example: e.example,
      translation: e.exampleTranslation,
      aliases: [],
      related: [],
      custom: true,
    };
    update((d) => ({
      ...d,
      customWords: d.customWords.some((x) => x.id === id)
        ? d.customWords
        : [...d.customWords, w],
      cards: d.cards.some((c) => c.wordId === id)
        ? d.cards
        : [
            ...d.cards,
            { wordId: id, box: 0, due: new Date().toISOString(), history: [] },
          ],
    }));
    notice("Expresión añadida a tarjetas.");
  };
  return (
    <>
      <PageHead
        eyebrow="ENTENDER LAS PIEZAS"
        title="La gramática tiene sentido."
        description="Una explicación breve, una estructura visible y una ocasión para usarla."
      />
      <Tabs
        value={tab}
        onChange={setTab}
        options={[
          { id: "rules", label: "Manual A0–A1" },
          { id: "expressions", label: "30 expresiones útiles" },
          { id: "game", label: "Asocia el significado" },
        ]}
      />
      {tab === "rules" ? (
        <div className="grammar-layout">
          <nav className="grammar-nav" aria-label="Reglas del curso">
            {units.map((u) => (
              <button
                className={u.id === unit.id ? "active" : ""}
                key={u.id}
                onClick={() => setParams({ unidad: u.id })}
              >
                <span>{String(u.number).padStart(2, "0")}</span>
                {u.grammar.title}
              </button>
            ))}
          </nav>
          <div className="grammar-content">
            <article className="panel grammar-rule">
              <span className="eyebrow">
                {unit.level} · UNIDAD {unit.number}
              </span>
              <h2>{unit.grammar.title}</h2>
              <p>{unit.grammar.explanation}</p>
              <div className="sentence-blocks">
                {unit.grammar.blocks.map((b, i) => (
                  <div className={`sentence-block role-${b.role}`} key={i}>
                    <strong lang="de">{b.text}</strong>
                    <span>{b.role}</span>
                  </div>
                ))}
              </div>
              <p>{unit.grammar.translation}</p>
              <AudioButton text={unit.grammar.example} />
              <div className="rule-box">
                <strong>La regla</strong>
                <p>{unit.grammar.rule}</p>
              </div>
              <p>
                <strong>Para recordarlo:</strong> {unit.grammar.tip}
              </p>
              <div className="common-mistake">
                <strong>Un error frecuente</strong>
                <p lang="de">
                  <del>{unit.grammar.error}</del>
                </p>
                <p lang="de" className="success-text">
                  {unit.grammar.correction}
                </p>
              </div>
              <p className="small">
                <strong>Un matiz:</strong> {unit.grammar.exception}
              </p>
              <Link
                className="text-link"
                to={`/inmersion?texto=${unit.readings[0].id}`}
              >
                Reencontrarlo en una historia
                <Icon name="arrow" />
              </Link>
            </article>
            <div className="section-heading">
              <h2>Ahora, úsalo.</h2>
            </div>
            <Exercise
              key={unit.id}
              phrase={transformations.find((p) => p.unit === unit.id)!}
              mode="translation"
              skillOverride="gramática"
              exerciseId={`grammar:${unit.id}`}
            />
          </div>
        </div>
      ) : tab === "expressions" ? (
        <div className="expressions-grid">
          {expressions.map((e) => (
            <article className="panel expression-card" key={e.id}>
              <div className="expression-title">
                <h2 lang="de">{e.de}</h2>
                <AudioButton text={e.example} small />
              </div>
              <strong>{e.meaning}</strong>
              <p className="small">Literal: {e.literal}</p>
              <p>
                {e.context} · <span className="pill">{e.register}</span>
              </p>
              <p lang="de">{e.example}</p>
              <p className="small">{e.exampleTranslation}</p>
              <button className="text-link" onClick={() => add(e)}>
                <Icon name="plus" size={17} />
                Añadir a tarjetas
              </button>
            </article>
          ))}
        </div>
      ) : (
        <section className="panel expression-game">
          <span className="eyebrow">¿QUÉ QUIERE DECIR?</span>
          <h2 lang="de">{target.de}</h2>
          <AudioButton text={target.example} />
          <p>Contexto: {target.context}</p>
          <div className="choices">
            {choices.map((c) => (
              <button
                disabled={!!selection}
                className={`${selection === c.id ? "selected" : ""} ${selection && c.id === target.id ? "right" : ""}`}
                key={c.id}
                onClick={() => {
                  setSelection(c.id);
                  record(
                    `expression:${target.id}`,
                    "u01",
                    "gramática",
                    c.id === target.id,
                    c.meaning,
                    target.meaning,
                    0,
                  );
                }}
              >
                {c.meaning}
              </button>
            ))}
          </div>
          {selection && (
            <>
              <p
                className={
                  selection === target.id ? "success-text" : "error-text"
                }
              >
                {selection === target.id ? "Correcto. " : ""}
                {target.meaning} · {target.context}
              </p>
              <button
                className="button primary"
                onClick={() => {
                  setGame((g) => g + 1);
                  setSelection("");
                }}
              >
                Otra expresión
                <Icon name="arrow" />
              </button>
            </>
          )}
        </section>
      )}
    </>
  );
}
