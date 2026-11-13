import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  readings,
  vocabulary,
  dictionary,
  dictionaryIndex,
  lookupKey,
  type Reading,
  type Word,
} from "../content";
import { useApp } from "../app/context";
import { useAudio } from "../audio/useAudio";
import {
  PageHead,
  UnitFilter,
  AudioButton,
  Progress,
} from "../components/common";
import { Icon } from "../components/Icon";
export function ReadingView({
  reading,
  onDone,
}: {
  reading: Reading;
  onDone?: () => void;
}) {
  const { data, update, record, addCard } = useApp();
  const [showText, setShowText] = useState(true);
  const [translations, setTranslations] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState<Word[]>([]);
  const [unknown, setUnknown] = useState("");
  const [rate, setRate] = useState(data.profile.rate);
  const customDictionary = useMemo(
    () => dictionaryIndex(data.customWords),
    [data.customWords],
  );
  const audio = useAudio(data.profile.voice, rate);
  const start = useRef(performance.now());
  useEffect(() => () => audio.stop(), []);
  const lookup = (token: string) => {
    const key = lookupKey(token);
    const found = [
      ...(dictionary.get(key) ?? []),
      ...(customDictionary.get(key) ?? []),
    ];
    setSelected(found);
    setUnknown(found.length ? "" : token);
  };
  const submit = () => {
    if (checked) return;
    setChecked(true);
    reading.questions.forEach((q, i) =>
      record(
        `reading:${reading.id}:${i}`,
        reading.unit,
        "lectura",
        answers[i] === q.answer,
        q.choices[answers[i]] ?? "",
        q.choices[q.answer],
        i === 0 ? (performance.now() - start.current) / 1000 : 0,
      ),
    );
    const ok = reading.questions.every((q, i) => answers[i] === q.answer);
    if (ok)
      update((d) => ({
        ...d,
        completed: [...new Set([...d.completed, reading.id])],
      }));
  };
  const allCorrect =
    checked && reading.questions.every((q, i) => answers[i] === q.answer);
  return (
    <article className="reader">
      <div className="reader-head">
        <span className="pill">
          {reading.kind} · {reading.level} · {reading.minutes} min
        </span>
        <h2 lang="de">{reading.title}</h2>
        <p>{reading.context}</p>
      </div>
      <div className="reader-toolbar">
        <button
          className="button primary"
          onClick={() =>
            audio.speaking
              ? audio.stop()
              : audio.speak(
                  reading.lines.map((l) => l.de),
                  undefined,
                  () =>
                    update((d) => ({
                      ...d,
                      listened: [...new Set([...d.listened, reading.id])],
                    })),
                )
          }
        >
          <Icon name={audio.speaking ? "close" : "play"} />
          {audio.speaking ? "Detener" : "Escuchar historia"}
        </button>
        <button
          className="button secondary"
          onClick={() => setShowText(!showText)}
        >
          {showText ? "Ocultar texto" : "Mostrar texto"}
        </button>
        <label>
          Velocidad
          <select
            aria-label="Velocidad de lectura"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          >
            <option value="1">Normal</option>
            <option value="0.8">Lenta</option>
            <option value="0.6">Muy lenta</option>
          </select>
        </label>
      </div>
      {audio.error && (
        <p className="notice" role="status">
          {audio.error}
        </p>
      )}
      <div className="reader-lines">
        {reading.lines.map((l, i) => (
          <div
            className={`reader-line ${audio.active === i ? "playing" : ""}`}
            key={i}
          >
            <span className="line-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              {showText ? (
                <p lang="de">
                  {l.de.split(/(\s+)/).map((token, j) =>
                    /\p{L}/u.test(token) ? (
                      <button
                        className="inline-word"
                        key={j}
                        onClick={() => lookup(token)}
                      >
                        {token}
                      </button>
                    ) : (
                      token
                    ),
                  )}
                </p>
              ) : (
                <p className="hidden-line">Texto oculto · Escucha primero</p>
              )}
              <button
                className="translation-toggle"
                aria-expanded={translations.includes(i)}
                onClick={() =>
                  setTranslations((t) =>
                    t.includes(i) ? t.filter((v) => v !== i) : [...t, i],
                  )
                }
              >
                {translations.includes(i)
                  ? "Ocultar traducción"
                  : "Ver traducción"}
              </button>
              {translations.includes(i) && (
                <p className="line-translation">{l.es}</p>
              )}
            </div>
            <button
              className="icon-button"
              aria-label={`Escuchar frase ${i + 1}`}
              onClick={() => audio.speak(l.de)}
            >
              <Icon name="audio" size={18} />
            </button>
          </div>
        ))}
      </div>
      {(selected.length > 0 || unknown) && (
        <aside className="word-popover">
          <button
            className="icon-button close-pop"
            aria-label="Cerrar significado"
            onClick={() => {
              setSelected([]);
              setUnknown("");
            }}
          >
            <Icon name="close" />
          </button>
          {selected.length > 0 ? (
            <>
              {selected.length > 1 && (
                <p className="small">
                  Hay varias entradas posibles; el contexto ayuda a elegir.
                </p>
              )}
              {selected.map((w) => (
                <div className="lookup-entry" key={w.id}>
                  <strong lang="de">{w.de}</strong>
                  <p>
                    {w.es} · {w.pos}
                  </p>
                  {w.plural && <p className="small">Plural: {w.plural}</p>}
                  <p lang="de">{w.example}</p>
                  <div className="button-row">
                    <AudioButton text={w.de} small />
                    <button
                      className="button secondary"
                      onClick={() => addCard(w.id)}
                    >
                      <Icon name="plus" size={16} />
                      Añadir a tarjetas
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <strong>{unknown}</strong>
              <p>
                No hay una entrada exacta en el diccionario local. Consulta la
                traducción de la frase para comprender el contexto.
              </p>
            </>
          )}
        </aside>
      )}
      <div className="comprehension">
        <div className="eyebrow">COMPRUEBA EL MENSAJE</div>
        <h3>¿Qué has entendido?</h3>
        {reading.questions.map((q, i) => (
          <fieldset className="question" key={i}>
            <legend>
              {i + 1}. {q.prompt}
            </legend>
            <div className="choices">
              {q.choices.map((c, j) => (
                <button
                  disabled={checked}
                  key={j}
                  aria-pressed={answers[i] === j}
                  className={`${answers[i] === j ? "selected" : ""} ${checked && q.answer === j ? "right" : ""}`}
                  onClick={() => setAnswers((a) => ({ ...a, [i]: j }))}
                >
                  {c}
                </button>
              ))}
            </div>
            {checked && (
              <p
                className={
                  answers[i] === q.answer ? "success-text" : "error-text"
                }
              >
                {answers[i] === q.answer ? "Correcto. " : "Revisa el mensaje. "}
                {q.explanation}
              </p>
            )}
          </fieldset>
        ))}
        {!checked ? (
          <button
            className="button primary"
            disabled={Object.keys(answers).length !== reading.questions.length}
            onClick={submit}
          >
            Comprobar comprensión
            <Icon name="check" />
          </button>
        ) : (
          <div className="button-row">
            {allCorrect ? (
              <>
                <span className="success-text">
                  Lectura comprendida y guardada.
                </span>
                {onDone && (
                  <button className="button primary" onClick={onDone}>
                    Continuar
                    <Icon name="arrow" />
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  className="button secondary"
                  onClick={() => {
                    setChecked(false);
                    setAnswers({});
                    start.current = performance.now();
                  }}
                >
                  Volver a intentarlo
                </button>
                {onDone && (
                  <button className="button ghost" onClick={onDone}>
                    Continuar y repasar después
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <details className="reading-meta">
        <summary>Lo que estás practicando</summary>
        <p>
          Objetivos:{" "}
          {reading.targetVocabulary
            .map((id) => vocabulary.find((w) => w.id === id)?.de)
            .join(", ") || "Expresiones de la unidad"}
          .
        </p>
        <p>
          Reencuentras {reading.knownVocabulary.length} entradas de unidades
          anteriores. Gramática: {reading.grammar.join(", ")}.
        </p>
      </details>
    </article>
  );
}
export function Immersion() {
  const { data } = useApp();
  const [params, setParams] = useSearchParams();
  const [unit, setUnit] = useState("");
  const [kind, setKind] = useState("");
  const [search, setSearch] = useState("");
  const active = readings.find((r) => r.id === params.get("texto"));
  const list = readings.filter(
    (r) =>
      (!unit || r.unit === unit) &&
      (!kind || r.kind === kind) &&
      `${r.title} ${r.context}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <PageHead
        eyebrow="ESCUCHAR · LEER · COMPRENDER"
        title="Un poco más dentro del alemán."
        description="Historias pequeñas, situaciones reales. Primero el mensaje; después, las palabras."
      />
      {active ? (
        <>
          <button className="text-link back" onClick={() => setParams({})}>
            ← Volver a la biblioteca
          </button>
          <ReadingView key={active.id} reading={active} />
        </>
      ) : (
        <>
          <div className="filters">
            <UnitFilter value={unit} onChange={setUnit} />
            <label>
              Tipo
              <select value={kind} onChange={(e) => setKind(e.target.value)}>
                <option value="">Todos los contenidos</option>
                {["Historia", "Diálogo", "Mensaje"].map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </select>
            </label>
            <label>
              Buscar
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Título o situación…"
              />
            </label>
          </div>
          <p className="small">
            {list.length} contenidos ·{" "}
            {
              data.completed.filter((id) => readings.some((r) => r.id === id))
                .length
            }{" "}
            comprendidos
          </p>
          <div className="reading-grid">
            {list.map((r, i) => (
              <button
                className="reading-tile"
                key={r.id}
                onClick={() => setParams({ texto: r.id })}
              >
                <div className={`reading-art art-${i % 4}`} aria-hidden="true">
                  <span>
                    {r.kind === "Diálogo"
                      ? "»"
                      : r.kind === "Mensaje"
                        ? "↗"
                        : "Aa"}
                  </span>
                  <small>{r.unit.slice(1)}</small>
                </div>
                <div className="reading-tile-body">
                  <div className="eyebrow">
                    {r.level} · {r.kind} · {r.minutes} MIN
                  </div>
                  <h3 lang="de">{r.title}</h3>
                  <p>{r.context}</p>
                  <div className="tile-footer">
                    <span>
                      {data.completed.includes(r.id)
                        ? "Comprendido"
                        : "Descubrir historia"}
                    </span>
                    <Icon
                      name={data.completed.includes(r.id) ? "check" : "arrow"}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
          {list.length === 0 && (
            <p>
              No hay textos con estos filtros. Prueba otra unidad o búsqueda.
            </p>
          )}
        </>
      )}
    </>
  );
}
