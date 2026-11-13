import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { phrases, transformations, units } from "../content";
import { useApp } from "../app/context";
import { Exercise, type Mode } from "../components/Exercise";
import { PageHead, UnitFilter, Tabs, AudioButton } from "../components/common";
import { Icon } from "../components/Icon";
const sounds = [
  [
    "ä / e",
    "spät, Käse, Mädchen",
    "Una ä larga suele ser más abierta que e larga. Escucha sin sustituirla automáticamente por a.",
  ],
  [
    "ö / o",
    "schön, schon",
    "Los labios se redondean en ö, con la lengua más adelantada que en o. No significan lo mismo.",
  ],
  [
    "ü / u",
    "Tür, Uhr",
    "En ü, redondea labios como para u con lengua adelantada. Escucha cada palabra.",
  ],
  [
    "Larga / breve",
    "bieten, bitten; Staat, Stadt",
    "La duración vocálica distingue palabras. Doble consonante suele señalar vocal breve.",
  ],
  [
    "ich-Laut / ach-Laut",
    "ich, nicht; Bach, machen",
    "Tras vocales anteriores, ch es suave; tras a/o/u suele articularse más atrás.",
  ],
  [
    "ch / sch",
    "ich, Fisch; machen, Tasche",
    "sch es un único sonido fricativo. Evita añadir una vocal tras consonantes finales.",
  ],
  [
    "Diptongos",
    "mein, neu, Haus",
    "ei se parece a ai; eu/äu a oi; au combina a y u en una sílaba.",
  ],
  [
    "Consonantes finales",
    "Tag, Rad, ab",
    "Al final de palabra g, d y b suelen ensordecerse. No deduzcas la escritura solo por el sonido.",
  ],
  [
    "Ritmo y entonación",
    "Ich komme aus Spanien. Kommst du aus Spanien?",
    "Escucha el relieve de las palabras importantes y el contorno final. La r admite variantes regionales.",
  ],
  [
    "Alfabeto",
    "A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z",
    "Escucha con una voz alemana. J se llama Jot; W se llama We; V se llama Vau.",
  ],
  [
    "Coloquial y estándar",
    "Wie geht es dir? Wie geht’s?",
    "Wie geht’s? es una contracción informal habitual. En escritura estándar conserva las formas completas cuando el ejercicio las pida.",
  ],
];
export function Practice({
  section,
}: {
  section: "oido" | "orden" | "reformular";
}) {
  const { data } = useApp();
  const [params] = useSearchParams();
  const [unit, setUnit] = useState(params.get("unidad") ?? "u01");
  const [tab, setTab] = useState(
    section === "oido"
      ? "dictation"
      : section === "orden"
        ? "order"
        : "translation",
  );
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState("");
  const [mistakes, setMistakes] = useState(false);
  const categories: Record<string, number[]> = {
    preguntas: [2, 3, 9, 13],
    negación: [7],
    modales: [10, 11],
    separables: [12],
    casos: [6, 8, 9, 14, 15],
    complementos: [5, 12, 13, 16],
    pasado: [17, 18],
    subordinadas: [19],
  };
  const bank = (
    tab === "transform"
      ? transformations
      : section === "orden"
        ? [...phrases, ...transformations]
        : phrases
  ).filter(
    (p) =>
      (!unit || p.unit === unit) &&
      (!filter || categories[filter]?.includes(Number(p.unit.slice(1)))) &&
      (section !== "orden" || p.de.split(/\s+/).length >= 3) &&
      (!mistakes ||
        data.attempts.some((a) => a.exercise.endsWith(p.id) && !a.correct)),
  );
  const phrase = bank[index % Math.max(1, bank.length)];
  const titles = {
    oido: [
      "OÍR · RECONOCER · ENTENDER",
      "Abre el oído al alemán.",
      "Escucha con calma, reconoce el mensaje y después prueba un dictado.",
    ],
    orden: [
      "CADA PIEZA EN SU SITIO",
      "Dale forma a lo que piensas.",
      "Construye frases con palabras y descubre cómo funciona el orden alemán.",
    ],
    reformular: [
      "UNA IDEA · DISTINTAS FORMAS",
      "Encuentra tu forma de decirlo.",
      "Traducciones y transformaciones cerradas, con soluciones preparadas.",
    ],
  };
  const t = titles[section];
  return (
    <>
      <PageHead eyebrow={t[0]} title={t[1]} description={t[2]} />
      <Tabs
        value={tab}
        onChange={(v) => {
          setTab(v);
          setIndex(0);
        }}
        options={
          section === "oido"
            ? [
                { id: "dictation", label: "Dictados" },
                { id: "choice", label: "Escucha y elige" },
                { id: "sounds", label: "Sonidos y pronunciación" },
              ]
            : section === "reformular"
              ? [
                  { id: "translation", label: "Traducir" },
                  { id: "transform", label: "Transformar" },
                ]
              : [{ id: "order", label: "Construir frases" }]
        }
      />
      {tab === "sounds" ? (
        <div className="sound-grid">
          {sounds.map(([title, text, explanation]) => (
            <article className="panel" key={title}>
              <div className="sound-symbol" lang="de">
                {title}
              </div>
              <h2 lang="de">{text}</h2>
              <p>{explanation}</p>
              <AudioButton text={text} />
            </article>
          ))}
        </div>
      ) : (
        <>
          <div className="filters">
            <UnitFilter
              value={unit}
              onChange={(v) => {
                setUnit(v);
                setIndex(0);
              }}
            />
            {section === "orden" && (
              <label>
                Estructura
                <select
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                    setUnit("");
                    setIndex(0);
                  }}
                >
                  <option value="">Todas las estructuras</option>
                  {Object.keys(categories).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
            )}
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={mistakes}
                onChange={(e) => {
                  setMistakes(e.target.checked);
                  setIndex(0);
                }}
              />
              Solo errores anteriores
            </label>
            <span className="small">{bank.length} actividades disponibles</span>
          </div>
          {phrase ? (
            <>
              <div className="practice-counter">
                {(index % bank.length) + 1} / {bank.length} ·{" "}
                {units.find((u) => u.id === phrase.unit)?.subtitle}
              </div>
              <Exercise
                key={`${section}:${tab}:${phrase.id}`}
                phrase={phrase}
                mode={(tab === "transform" ? "translation" : tab) as Mode}
                exerciseId={`${section}:${tab}:${phrase.id}`}
                onAdvance={() => setIndex((i) => i + 1)}
              />
              <button
                className="text-link more-exercises"
                onClick={() => setIndex((i) => i + 1)}
              >
                Más ejercicios del banco
                <Icon name="refresh" size={17} />
              </button>
            </>
          ) : (
            <div className="panel empty">
              No hay actividades con estos filtros. Prueba otra unidad o
              desactiva el filtro de errores.
            </div>
          )}
        </>
      )}
      <p className="page-footnote">
        Las variantes válidas están registradas. Una forma no reconocida puede
        ser correcta fuera de este ejercicio; consulta las soluciones y su
        contexto.
      </p>
    </>
  );
}
