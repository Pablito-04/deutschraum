import { useRef, useState } from "react";
import { artists, vocabulary } from "../content";
import { useApp } from "../app/context";
import { gapIndices, lyricTokens } from "../learning/songs";
import { normalize } from "../correction";
import { PageHead, Tabs, AudioButton } from "../components/common";
import { shuffled } from "../components/Exercise";
import { Icon } from "../components/Icon";
const original =
  "Guten Morgen, neuer Tag.\nIch lerne Wörter, die ich mag.\nEin kleiner Schritt, ein neuer Klang.\nIch höre zu und fange an.\nAm Abend lese ich ein Buch.\nUnd morgen mache ich es noch einmal.";
export function Songs() {
  const { data, update, record, notice, addCard } = useApp();
  const [tab, setTab] = useState("library");
  const [title, setTitle] = useState("");
  const [text, setText] = useState(data.drafts["song-import"] ?? "");
  const [source, setSource] = useState("");
  const [save, setSave] = useState(false);
  const [percent, setPercent] = useState(25);
  const [seed, setSeed] = useState(1);
  const [mode, setMode] = useState("gaps");
  const [knownOnly, setKnownOnly] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [order, setOrder] = useState<number[]>([]);
  const [line, setLine] = useState(0);
  const start = useRef(performance.now());
  const known = new Set(
    vocabulary.map((w) =>
      w.de.replace(/^(der|die|das) /, "").toLocaleLowerCase("de"),
    ),
  );
  const tokens = lyricTokens(source);
  const gaps = gapIndices(source, percent, seed, knownOnly ? known : undefined);
  const lines = source.split("\n").filter((l) => l.trim());
  const activeLine = lines[line % Math.max(1, lines.length)] ?? "";
  const pieces = mode === "words" ? activeLine.split(/\s+/) : lines;
  const pool = shuffled(
    pieces.map((text, id) => ({ text, id })),
    String(seed) + mode,
  );
  const matched = vocabulary
    .filter((w) =>
      tokens.some(
        (t) =>
          t.word &&
          t.text.toLocaleLowerCase("de") ===
            w.de.replace(/^(der|die|das) /, "").toLocaleLowerCase("de"),
      ),
    )
    .slice(0, 24);
  const reset = () => {
    setAnswers({});
    setChecked(false);
    setOrder([]);
    start.current = performance.now();
  };
  const begin = () => {
    if (!text.trim()) return;
    setSource(text.trim());
    setSeed((s) => s + 1);
    reset();
    if (save) {
      update((d) => ({
        ...d,
        songs: [
          ...d.songs,
          {
            id: crypto.randomUUID(),
            title: title.trim() || "Mi canción",
            text: text.trim(),
          },
        ],
      }));
      notice("Letra guardada únicamente en este navegador.");
    }
    update((d) => ({ ...d, drafts: { ...d.drafts, "song-import": "" } }));
  };
  const check = () => {
    if (checked) return;
    setChecked(true);
    const ok =
      mode === "gaps"
        ? gaps.every(
            (i) =>
              normalize(answers[i] ?? "", true) ===
              normalize(tokens[i].text, true),
          )
        : order.map((i) => pieces[i]).join(mode === "words" ? " " : "\n") ===
          pieces.join(mode === "words" ? " " : "\n");
    record(
      `song:${source.slice(0, 30)}:${seed}:${mode}`,
      "personal",
      "canciones",
      ok,
      mode === "gaps"
        ? gaps.map((i) => answers[i] ?? "").join(" ")
        : order.map((i) => pieces[i]).join(" "),
      mode === "gaps"
        ? gaps.map((i) => tokens[i].text).join(" ")
        : pieces.join(" "),
      (performance.now() - start.current) / 1000,
    );
  };
  return (
    <>
      <PageHead
        eyebrow="OTRA FORMA DE ESCUCHAR"
        title="Dale ritmo a tu alemán."
        description="Explora música en alemán o practica con una letra que tú aportes."
      />
      <Tabs
        value={tab}
        onChange={setTab}
        options={[
          { id: "library", label: "Descubrir artistas" },
          { id: "practice", label: "Mi taller de letras" },
        ]}
      />
      {tab === "library" ? (
        <>
          <div className="music-intro">
            <div className="record-art" aria-hidden="true">
              <span />
            </div>
            <div>
              <div className="eyebrow">ESCUCHA POR GUSTO</div>
              <h2>No hace falta entender cada palabra.</h2>
              <p>
                Busca un fragmento, reconoce lo familiar y vuelve a escucharlo.
                Las dificultades son orientativas; muchas canciones superan A1.
              </p>
              <button
                className="button primary"
                onClick={() => setTab("practice")}
              >
                Abrir mi taller
                <Icon name="arrow" />
              </button>
            </div>
          </div>
          <div className="artist-grid">
            {artists.map((a, i) => (
              <article className="panel artist-card" key={a.name}>
                <div
                  className={`artist-monogram art-${i % 4}`}
                  aria-hidden="true"
                >
                  {a.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 3)
                    .join("")}
                </div>
                <span className="eyebrow">{a.genre}</span>
                <h2>{a.name}</h2>
                <span className="pill">{a.difficulty}</span>
                <p>{a.description}</p>
                <div className="button-row">
                  <a
                    className="text-link"
                    target="_blank"
                    rel="noreferrer"
                    href={`https://open.spotify.com/search/${encodeURIComponent(a.query)}`}
                  >
                    Spotify ↗
                  </a>
                  <a
                    className="text-link"
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(a.query)}`}
                  >
                    YouTube ↗
                  </a>
                  <a
                    className="text-link"
                    target="_blank"
                    rel="noreferrer"
                    href={a.url}
                  >
                    Web oficial ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <>
          <section className="panel song-import">
            <h2>Trae una letra a tu espacio.</h2>
            <p>
              Se generan ejercicios mecánicos. No se inventan traducciones ni
              análisis de canciones desconocidas.
            </p>
            <label>
              Título
              <input
                value={title}
                maxLength={300}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nombre de tu canción"
              />
            </label>
            <label>
              Letra en alemán
              <textarea
                aria-label="Letra de la canción"
                maxLength={100000}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  update((d) => ({
                    ...d,
                    drafts: { ...d.drafts, "song-import": e.target.value },
                  }));
                }}
                placeholder="Pega aquí una letra que tengas derecho a utilizar…"
              />
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={save}
                onChange={(e) => setSave(e.target.checked)}
              />
              Guardar esta letra en mi biblioteca local
            </label>
            <div className="button-row">
              <button
                className="button primary"
                disabled={!text.trim()}
                onClick={begin}
              >
                Generar ejercicios
                <Icon name="arrow" />
              </button>
              <button
                className="button secondary"
                onClick={() => {
                  setTitle(
                    "Ein kleiner Schritt · texto original de Deutschraum",
                  );
                  setText(original);
                }}
              >
                Usar texto original de práctica
              </button>
            </div>
            {data.songs.length > 0 && (
              <div className="saved-songs">
                <h3>Mis letras guardadas</h3>
                {data.songs.map((s) => (
                  <div key={s.id}>
                    <button
                      className="text-link"
                      onClick={() => {
                        setTitle(s.title);
                        setText(s.text);
                        setSource(s.text);
                        reset();
                      }}
                    >
                      {s.title}
                    </button>
                    <button
                      className="icon-button"
                      aria-label={`Eliminar ${s.title}`}
                      onClick={() => {
                        if (confirm("¿Eliminar esta letra guardada?"))
                          update((d) => ({
                            ...d,
                            songs: d.songs.filter((x) => x.id !== s.id),
                          }));
                      }}
                    >
                      <Icon name="close" size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
          {source && (
            <section className="panel song-workshop">
              <div className="section-heading">
                <h2>{title || "Mi texto"}</h2>
                <AudioButton text={source} label="Escuchar texto (TTS)" />
              </div>
              <div className="filters">
                <label>
                  Actividad
                  <select
                    aria-label="Actividad"
                    value={mode}
                    onChange={(e) => {
                      setMode(e.target.value);
                      reset();
                    }}
                  >
                    <option value="gaps">Completar huecos</option>
                    <option value="lines">Reconstruir versos</option>
                    <option value="words">Ordenar un verso</option>
                  </select>
                </label>
                {mode === "gaps" ? (
                  <>
                    <label>
                      Palabras ocultas
                      <select
                        value={percent}
                        onChange={(e) => {
                          setPercent(Number(e.target.value));
                          reset();
                        }}
                      >
                        {[15, 25, 40, 60].map((v) => (
                          <option value={v} key={v}>
                            {v}%
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={knownOnly}
                        onChange={(e) => {
                          setKnownOnly(e.target.checked);
                          reset();
                        }}
                      />
                      Solo diccionario local
                    </label>
                  </>
                ) : mode === "words" ? (
                  <label>
                    Verso
                    <select
                      value={line}
                      onChange={(e) => {
                        setLine(Number(e.target.value));
                        reset();
                      }}
                    >
                      {lines.map((_, i) => (
                        <option value={i} key={i}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}
                <button
                  className="button secondary"
                  onClick={() => {
                    setSeed((s) => s + 1);
                    reset();
                  }}
                >
                  <Icon name="refresh" />
                  Regenerar
                </button>
              </div>
              {mode === "gaps" ? (
                <div className="lyrics">
                  {tokens.map((t) =>
                    gaps.includes(t.index) ? (
                      <span
                        className={`lyric-gap ${checked ? (normalize(answers[t.index] ?? "", true) === normalize(t.text, true) ? "ok" : "wrong") : ""}`}
                        key={t.index}
                      >
                        <input
                          aria-label={`Hueco ${gaps.indexOf(t.index) + 1}`}
                          disabled={checked}
                          spellCheck={false}
                          autoComplete="off"
                          value={answers[t.index] ?? ""}
                          onChange={(e) =>
                            setAnswers((a) => ({
                              ...a,
                              [t.index]: e.target.value,
                            }))
                          }
                          style={{
                            width: `${Math.max(6, t.text.length + 1)}ch`,
                          }}
                        />
                        {checked && <small lang="de">{t.text}</small>}
                      </span>
                    ) : (
                      <span key={t.index}>{t.text}</span>
                    ),
                  )}
                </div>
              ) : (
                <>
                  <div className="answer-slots">
                    {order.map((id, i) => (
                      <button
                        disabled={checked}
                        className="word-token selected"
                        key={id}
                        onClick={() =>
                          setOrder((a) => a.filter((_, j) => j !== i))
                        }
                      >
                        {pieces[id]}
                      </button>
                    ))}
                  </div>
                  <div className="word-pool">
                    {pool.map((p) => (
                      <button
                        className="word-token"
                        disabled={checked || order.includes(p.id)}
                        key={p.id}
                        onClick={() => setOrder((a) => [...a, p.id])}
                      >
                        {p.text}
                      </button>
                    ))}
                  </div>
                  {checked && (
                    <div className="notice">
                      <strong>Orden original:</strong>
                      <p className="lyrics" lang="de">
                        {pieces.join(mode === "words" ? " " : "\n")}
                      </p>
                    </div>
                  )}
                </>
              )}
              {mode === "gaps" && !gaps.length ? (
                <p>
                  No hay palabras reconocidas para ocultar. Desactiva «Solo
                  diccionario local».
                </p>
              ) : (
                <button
                  className="button primary"
                  disabled={
                    checked ||
                    (mode !== "gaps" && order.length !== pieces.length)
                  }
                  onClick={check}
                >
                  Comprobar con el texto original
                  <Icon name="check" />
                </button>
              )}
              {checked && (
                <p role="status">
                  Comparación guardada. Regenera para practicar otra selección.
                </p>
              )}
              <details>
                <summary>
                  Vocabulario reconocido con coincidencia exacta (
                  {matched.length})
                </summary>
                {matched.map((w) => (
                  <div className="recognized-word" key={w.id}>
                    <span lang="de">{w.de}</span>
                    <span>{w.es}</span>
                    <button className="text-link" onClick={() => addCard(w.id)}>
                      Guardar tarjeta
                    </button>
                  </div>
                ))}
              </details>
            </section>
          )}
        </>
      )}
      <p className="page-footnote">
        No se descargan ni redistribuyen letras comerciales. Los enlaces
        musicales necesitan conexión. El taller y las letras guardadas funcionan
        localmente.
      </p>
    </>
  );
}
