import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { vocabulary, type Word } from "../content";
import { useApp } from "../app/context";
import { schedule, dayKey } from "../learning";
import { correct } from "../correction";
import {
  PageHead,
  UnitFilter,
  Tabs,
  AudioButton,
  Empty,
} from "../components/common";
import { Icon } from "../components/Icon";
export function CardReview({
  wordId,
  onDone,
  mode = "recognize",
}: {
  wordId: string;
  onDone: (ok: boolean) => void;
  mode?: string;
}) {
  const { data, update, record } = useApp();
  const [flip, setFlip] = useState(false);
  const [input, setInput] = useState("");
  const [graded, setGraded] = useState<boolean | null>(null);
  const start = useRef(performance.now());
  const word = [...vocabulary, ...data.customWords].find(
    (w) => w.id === wordId,
  );
  const card = data.cards.find((c) => c.wordId === wordId);
  if (!word || !card)
    return (
      <div className="panel">
        <p>Esta tarjeta ya no está disponible.</p>
        <button className="button secondary" onClick={() => onDone(false)}>
          Continuar
        </button>
      </div>
    );
  const grade = (ok: boolean) => {
    if (graded !== null) return;
    setGraded(ok);
    update((d) => ({
      ...d,
      cards: d.cards.map((c) => (c.wordId === wordId ? schedule(c, ok) : c)),
    }));
    record(
      `srs:${wordId}:${dayKey(new Date())}:${card.history.length}`,
      word.unit,
      "vocabulario",
      ok,
      mode === "write" ? input : ok ? "Recuerdo declarado" : "No recuerdo",
      word.de,
      (performance.now() - start.current) / 1000,
    );
  };
  const check = () => {
    const r = correct(input, [word.de, ...word.aliases], { allowTypos: false });
    setFlip(true);
    grade(r.status === "correct");
  };
  return (
    <section className="flashcard panel">
      <div className="exercise-top">
        <span className="pill">
          {mode === "write"
            ? "ESPAÑOL → ALEMÁN"
            : mode === "context"
              ? "EN CONTEXTO"
              : "ALEMÁN → ESPAÑOL"}
        </span>
        <span>Caja {card.box} / 4</span>
      </div>
      <h2 lang={mode === "write" ? "es" : "de"}>
        {mode === "write"
          ? word.es
          : mode === "context"
            ? word.example
            : word.de}
      </h2>
      {mode !== "write" && (
        <AudioButton text={mode === "context" ? word.example : word.de} />
      )}
      <p className="small">
        {mode === "write"
          ? "Escribe con artículo si es un sustantivo."
          : "Piensa en el significado antes de revelar la tarjeta."}
      </p>
      {mode === "write" && (
        <label>
          Tu respuesta
          <input
            lang="de"
            spellCheck={false}
            autoComplete="off"
            value={input}
            disabled={graded !== null}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim() && graded === null) check();
            }}
          />
        </label>
      )}
      {flip && (
        <div className="card-back">
          <h3 lang={mode === "write" ? "de" : "es"}>
            {mode === "write" ? word.de : word.es}
          </h3>
          {word.plural && <p>Plural: {word.plural}</p>}
          <p lang="de">{word.example}</p>
          <p className="muted">{word.translation}</p>
          {word.forms && <p className="small">{word.forms.join(" · ")}</p>}
        </div>
      )}
      {graded === null ? (
        mode === "write" ? (
          <button
            className="button primary"
            disabled={!input.trim()}
            onClick={check}
          >
            Comprobar
          </button>
        ) : !flip ? (
          <button className="button primary" onClick={() => setFlip(true)}>
            Mostrar significado
          </button>
        ) : (
          <div className="button-row">
            <button className="button secondary" onClick={() => grade(false)}>
              Necesito repasarla
            </button>
            <button className="button primary" onClick={() => grade(true)}>
              Me acordaba
              <Icon name="check" />
            </button>
          </div>
        )
      ) : (
        <>
          <p className={graded ? "success-text" : "error-text"}>
            {graded
              ? "Guardado. Volverá a aparecer en su próxima fecha de repaso."
              : "Guardado. Volverá a estar pendiente en 10 minutos."}
          </p>
          <button className="button primary" onClick={() => onDone(graded)}>
            Siguiente tarjeta
            <Icon name="arrow" />
          </button>
        </>
      )}
    </section>
  );
}
function WordForm({ word, onClose }: { word?: Word; onClose: () => void }) {
  const { update, notice } = useApp();
  const [de, setDe] = useState(word?.de ?? "");
  const [es, setEs] = useState(word?.es ?? "");
  const [pos, setPos] = useState(word?.pos ?? "expresión");
  const [plural, setPlural] = useState(word?.plural ?? "");
  const [example, setExample] = useState(word?.example ?? "");
  const [translation, setTranslation] = useState(word?.translation ?? "");
  const [error, setError] = useState("");
  return (
    <div className="modal-backdrop">
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="word-form-title"
      >
        <button
          className="icon-button modal-close"
          aria-label="Cerrar formulario"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
        <div className="eyebrow">TU DICCIONARIO PERSONAL</div>
        <h2 id="word-form-title">
          {word ? "Editar palabra" : "Una palabra para ti."}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const article = /^(der|die|das) /.exec(de.trim())?.[1];
            if (pos === "sustantivo" && !article) {
              setError("Incluye der, die o das delante del sustantivo.");
              return;
            }
            const next: Word = {
              id: word?.id ?? `custom-${crypto.randomUUID()}`,
              unit: "personal",
              level: "A1",
              de: de.trim(),
              es: es.trim(),
              pos,
              article,
              gender:
                article === "der"
                  ? "masculino"
                  : article === "das"
                    ? "neutro"
                    : article
                      ? "femenino"
                      : undefined,
              plural:
                pos === "sustantivo"
                  ? plural.trim() || "No indicado"
                  : undefined,
              example: example.trim(),
              translation: translation.trim(),
              aliases: [],
              related: [],
              custom: true,
            };
            update((d) => ({
              ...d,
              customWords: word
                ? d.customWords.map((w) => (w.id === word.id ? next : w))
                : [...d.customWords, next],
            }));
            notice("Palabra personal guardada.");
            onClose();
          }}
        >
          <label>
            Alemán
            <input
              required
              maxLength={300}
              lang="de"
              value={de}
              onChange={(e) => setDe(e.target.value)}
              placeholder="Por ejemplo: der Alltag"
            />
          </label>
          <label>
            Significado en español
            <input
              required
              maxLength={1000}
              value={es}
              onChange={(e) => setEs(e.target.value)}
            />
          </label>
          <label>
            Categoría
            <select value={pos} onChange={(e) => setPos(e.target.value)}>
              <option value="sustantivo">Sustantivo (con artículo)</option>
              <option value="verbo">Verbo</option>
              <option value="expresión">Palabra o expresión</option>
            </select>
          </label>
          {pos === "sustantivo" && (
            <label>
              Plural
              <input
                maxLength={1000}
                value={plural}
                onChange={(e) => setPlural(e.target.value)}
              />
            </label>
          )}
          <label>
            Ejemplo en alemán (opcional)
            <input
              maxLength={10000}
              lang="de"
              value={example}
              onChange={(e) => setExample(e.target.value)}
            />
          </label>
          <label>
            Traducción del ejemplo
            <input
              maxLength={10000}
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
            />
          </label>
          {error && (
            <p role="alert" className="error-text">
              {error}
            </p>
          )}
          <button className="button primary" type="submit">
            Guardar palabra
            <Icon name="check" />
          </button>
        </form>
      </section>
    </div>
  );
}
export function Vocabulary() {
  const { data, addCard, update, notice } = useApp();
  const [params] = useSearchParams();
  const [unit, setUnit] = useState(params.get("unidad") ?? "");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [mode, setMode] = useState("recognize");
  const [queue, setQueue] = useState<string[]>([]);
  const [newWord, setNewWord] = useState(false);
  const [edit, setEdit] = useState<Word | undefined>();
  const [page, setPage] = useState(0);
  const now = new Date().toISOString();
  const words = [...vocabulary, ...data.customWords];
  const list = words.filter(
    (w) =>
      (!unit || w.unit === unit) &&
      `${w.de} ${w.es}`
        .toLocaleLowerCase("de")
        .includes(search.toLocaleLowerCase("de")) &&
      (filter === "all" ||
        (filter === "personal" && w.custom) ||
        (filter === "saved" && data.cards.some((c) => c.wordId === w.id)) ||
        (filter === "learned" &&
          data.cards.some((c) => c.wordId === w.id && c.box >= 2)) ||
        (filter === "hard" &&
          data.cards.some(
            (c) => c.wordId === w.id && c.history.some((h) => !h.ok),
          ))),
  );
  const due = data.cards.filter(
    (c) =>
      c.due <= now &&
      (!unit || words.find((w) => w.id === c.wordId)?.unit === unit),
  );
  return (
    <>
      <PageHead
        eyebrow="RECUERDA · REENCUENTRA · CONSOLIDA"
        title="Palabras que se quedan."
        description="Aprende con contexto y deja que el repaso llegue a su tiempo."
      >
        <button
          className="button secondary"
          onClick={() => {
            setEdit(undefined);
            setNewWord(true);
          }}
        >
          <Icon name="plus" />
          Añadir palabra
        </button>
      </PageHead>
      <section className="srs-banner">
        <div>
          <span className="eyebrow">TU REPASO ESPACIADO</span>
          <h2>
            {due.length
              ? `${due.length} tarjetas te esperan.`
              : "Hoy puedes descubrir nuevas palabras."}
          </h2>
          <p>
            {data.cards.length} guardadas · intervalos de 1, 3, 7 y 16 días ·
            fallos: reaprendizaje en 10 min
          </p>
        </div>
        <button
          className="button primary"
          disabled={!due.length}
          onClick={() => setQueue(due.map((c) => c.wordId))}
        >
          Repasar pendientes
          <Icon name="arrow" />
        </button>
      </section>
      <Tabs
        value={mode}
        onChange={setMode}
        options={[
          { id: "recognize", label: "Alemán → español" },
          { id: "write", label: "Español → alemán" },
          { id: "context", label: "En contexto" },
        ]}
      />
      {queue.length > 0 && (
        <>
          <CardReview
            key={queue[0] + mode}
            wordId={queue[0]}
            mode={mode}
            onDone={() => setQueue((q) => q.slice(1))}
          />
          <p className="small">
            {queue.length} en esta ronda. En los modos de reconocimiento tú
            indicas si lo recordabas.
          </p>
          <button className="text-link" onClick={() => setQueue([])}>
            Cerrar repaso
          </button>
        </>
      )}
      <div className="filters">
        <UnitFilter
          value={unit}
          onChange={(v) => {
            setUnit(v);
            setPage(0);
          }}
        />
        <label>
          Mostrar
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(0);
            }}
          >
            <option value="all">Todo el diccionario</option>
            <option value="saved">Mis tarjetas</option>
            <option value="hard">Palabras difíciles</option>
            <option value="learned">Recordadas (caja 2 o más)</option>
            <option value="personal">Palabras personales</option>
          </select>
        </label>
        <label>
          Buscar
          <input
            aria-label="Buscar vocabulario"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            placeholder="Alemán o español…"
          />
        </label>
      </div>
      <div className="section-heading">
        <h2>Tu diccionario</h2>
        <div className="button-row">
          <span className="small">{list.length} entradas</span>
          {(filter !== "all" || unit) &&
            list.some((w) => data.cards.some((c) => c.wordId === w.id)) && (
              <button
                className="text-link"
                onClick={() =>
                  setQueue(
                    list
                      .filter((w) => data.cards.some((c) => c.wordId === w.id))
                      .map((w) => w.id),
                  )
                }
              >
                Repasar esta selección
                <Icon name="arrow" size={16} />
              </button>
            )}
        </div>
      </div>
      <div className="vocabulary-list">
        {list.slice(page * 30, page * 30 + 30).map((w) => {
          const card = data.cards.find((c) => c.wordId === w.id);
          return (
            <article className="word-row" key={w.id}>
              <AudioButton text={w.de} small />
              <div className="word-main">
                <h3 lang="de">{w.de}</h3>
                <span>{w.es}</span>
                <div className="word-meta">
                  {w.pos}
                  {w.plural && ` · plural: ${w.plural}`}
                  {card &&
                    ` · caja ${card.box} · próximo: ${new Date(card.due).toLocaleDateString("es-ES")}`}
                </div>
                <details>
                  <summary>En contexto</summary>
                  <p lang="de">{w.example || "Sin ejemplo personal."}</p>
                  <p>{w.translation}</p>
                  {w.forms && <p className="small">{w.forms.join(" · ")}</p>}
                </details>
              </div>
              <div className="word-actions">
                {w.custom && (
                  <>
                    <button
                      className="icon-button"
                      aria-label={`Editar ${w.de}`}
                      onClick={() => {
                        setEdit(w);
                        setNewWord(true);
                      }}
                    >
                      <Icon name="edit" />
                    </button>
                    <button
                      className="icon-button"
                      aria-label={`Eliminar ${w.de}`}
                      onClick={() => {
                        if (
                          confirm(
                            `¿Eliminar «${w.de}» y su tarjeta? El historial de estudio se conservará.`,
                          )
                        ) {
                          update((d) => ({
                            ...d,
                            customWords: d.customWords.filter(
                              (x) => x.id !== w.id,
                            ),
                            cards: d.cards.filter((c) => c.wordId !== w.id),
                          }));
                          notice("Palabra eliminada.");
                        }
                      }}
                    >
                      <Icon name="close" />
                    </button>
                  </>
                )}
                {card ? (
                  <button
                    className="icon-button saved"
                    aria-label={`Repasar ${w.de} ahora`}
                    onClick={() => setQueue([w.id])}
                  >
                    <Icon name="check" />
                  </button>
                ) : (
                  <button
                    className="button compact secondary"
                    onClick={() => addCard(w.id)}
                  >
                    <Icon name="plus" size={16} />
                    Tarjeta
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {list.length === 0 && (
        <Empty>
          Sin palabras con estos filtros. Busca otra palabra o añade una entrada
          personal.
        </Empty>
      )}
      {list.length > 30 && (
        <div className="pagination">
          <button
            className="button secondary"
            disabled={!page}
            onClick={() => setPage((p) => p - 1)}
          >
            Anterior
          </button>
          <span>
            {page + 1} / {Math.ceil(list.length / 30)}
          </span>
          <button
            className="button secondary"
            disabled={(page + 1) * 30 >= list.length}
            onClick={() => setPage((p) => p + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
      {newWord && <WordForm word={edit} onClose={() => setNewWord(false)} />}
    </>
  );
}
