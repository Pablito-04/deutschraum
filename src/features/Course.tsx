import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { units, phrases, readings } from "../content";
import { useApp } from "../app/context";
import { unitStatus } from "../learning";
import { Exercise, type Mode } from "../components/Exercise";
import { ReadingView } from "./Immersion";
import { CardReview } from "./Vocabulary";
import { PageHead, Progress, SectionLink } from "../components/common";
import { Icon } from "../components/Icon";
export function Course() {
  const { data, update } = useApp();
  const { unit: id } = useParams();
  const navigate = useNavigate();
  const unit = units.find((u) => u.id === id);
  const [reading, setReading] = useState(false);
  const start = (test = false) => {
    if (!unit) return;
    if (data.session) {
      navigate("/sesion");
      return;
    }
    update((d) => ({
      ...d,
      session: {
        id: crypto.randomUUID(),
        unit: unit.id,
        type: test ? "test" : "lesson",
        index: 0,
        tasks: unit.phrases.map(
          (p, i) =>
            `${test ? ["dictation", "order", "translation", "choice"][i % 4] : "lesson"}:${p.id}`,
        ),
        correct: 0,
        firstCorrect: 0,
        started: new Date().toISOString(),
      },
    }));
    navigate("/sesion");
  };
  if (!unit)
    return (
      <>
        <PageHead
          eyebrow="DE CERO A LO COTIDIANO"
          title="Un camino con sentido."
          description="20 unidades que conectan palabras, estructuras e historias. Puedes volver a cualquier paso."
        />
        <div className="curriculum-list">
          {units.map((u) => {
            const st = unitStatus(data, u.id);
            return (
              <Link
                className="curriculum-unit panel"
                key={u.id}
                to={`/curso/${u.id}`}
              >
                <span className={`unit-number ${st.complete ? "done" : ""}`}>
                  {st.complete ? (
                    <Icon name="check" />
                  ) : (
                    String(u.number).padStart(2, "0")
                  )}
                </span>
                <div>
                  <span className="eyebrow">
                    {u.level} · {u.goals[0]}
                  </span>
                  <h2 lang="de">{u.title}</h2>
                  <p>{u.subtitle}</p>
                </div>
                <div className="unit-state">
                  <span>
                    {st.complete
                      ? "Consolidada"
                      : st.practiced
                        ? `${st.practiced}/8 practicadas`
                        : "Por explorar"}
                  </span>
                  <Icon name="chevron" />
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  const st = unitStatus(data, unit.id);
  return (
    <>
      <PageHead
        eyebrow={`UNIDAD ${String(unit.number).padStart(2, "0")} · ${unit.level}`}
        title={unit.title}
        description={unit.subtitle}
      >
        <Link className="button secondary" to="/curso">
          Ver itinerario
        </Link>
      </PageHead>
      <div className="unit-overview">
        <section className="panel">
          <h2>Al terminar podrás…</h2>
          <ul className="goal-list">
            {unit.goals.map((g) => (
              <li key={g}>
                <Icon name="check" />
                {g}
              </li>
            ))}
          </ul>
          <p className="small">
            {unit.previous.length
              ? `Reutiliza lo aprendido en la unidad ${Number(unit.previous[0].slice(1))}.`
              : "Empezamos desde cero. Escucha sin exigir perfección."}
          </p>
          <Progress
            value={
              ((Number(st.read) + st.practiced / 8 + st.test / 100) / 3) * 100
            }
            label="Práctica de la unidad"
          />
        </section>
        <section className="panel">
          <div className="eyebrow">LA ESTRUCTURA DE HOY</div>
          <h2>{unit.grammar.title}</h2>
          <p>{unit.grammar.explanation}</p>
          <SectionLink to={`/gramatica?unidad=${unit.id}`}>
            Explorar la regla y practicar
          </SectionLink>
        </section>
      </div>
      <div className="lesson-steps">
        <button
          className="panel lesson-step"
          onClick={() => setReading(!reading)}
        >
          <span className="step-count">01</span>
          <div>
            <h3>Comprende una historia</h3>
            <p>
              {unit.readings[0].title} ·{" "}
              {st.read ? "Comprendida" : "Escucha, lee y responde"}
            </p>
          </div>
          <Icon name={st.read ? "check" : "chevron"} />
        </button>
        {reading && (
          <ReadingView
            reading={unit.readings[0]}
            onDone={() => {
              setReading(false);
              start();
            }}
          />
        )}
        <button className="panel lesson-step" onClick={() => start()}>
          <span className="step-count">02</span>
          <div>
            <h3>Reconoce y practica</h3>
            <p>
              8 actividades · {st.practiced}/8 acertadas · escritura, oído y
              orden
            </p>
          </div>
          <Icon name={st.practiced === 8 ? "check" : "chevron"} />
        </button>
        <Link
          className="panel lesson-step"
          to={`/vocabulario?unidad=${unit.id}`}
        >
          <span className="step-count">03</span>
          <div>
            <h3>Elige tus palabras</h3>
            <p>Guarda vocabulario en tarjetas y repásalo cuando toque.</p>
          </div>
          <Icon name="chevron" />
        </Link>
        <button className="panel lesson-step" onClick={() => start(true)}>
          <span className="step-count">04</span>
          <div>
            <h3>Comprueba lo aprendido</h3>
            <p>
              Prueba de unidad ·{" "}
              {st.test
                ? `Mejor resultado: ${st.test}%`
                : "8 actividades, objetivo: 80% al primer intento"}
            </p>
          </div>
          <Icon name={st.test >= 80 ? "check" : "chevron"} />
        </button>
      </div>
      <div className="notice">
        Una unidad queda consolidada al comprender una lectura, acertar sus 8
        frases de práctica y obtener al menos un 80% al primer intento en una
        prueba. Puedes practicar libremente antes.
      </div>
    </>
  );
}
export function StudySession() {
  const { data, update } = useApp();
  const navigate = useNavigate();
  const [summary, setSummary] = useState<{
    type: string;
    score: number;
    correct: number;
    total: number;
  } | null>(null);
  const session = data.session;
  const advance = (result: { correct: boolean; first: boolean }) => {
    if (!session) return;
    const correct = session.correct + Number(result.correct),
      firstCorrect = session.firstCorrect + Number(result.first);
    if (session.index + 1 >= session.tasks.length) {
      const score = Math.round((firstCorrect / session.tasks.length) * 100);
      setSummary({
        type: session.type,
        score,
        correct,
        total: session.tasks.length,
      });
      update((d) => ({
        ...d,
        session: null,
        sessionsCompleted: d.sessionsCompleted + 1,
        tests:
          session.type === "test"
            ? {
                ...d.tests,
                [session.unit]: Math.max(d.tests[session.unit] ?? 0, score),
              }
            : d.tests,
      }));
    } else
      update((d) => ({
        ...d,
        session: {
          ...session,
          index: session.index + 1,
          correct,
          firstCorrect,
        },
      }));
  };
  if (summary)
    return (
      <section className="session-complete panel">
        <div className="completion-mark">
          <Icon name="check" size={44} />
        </div>
        <div className="eyebrow">UN PASO MÁS</div>
        <h1>
          {summary.type === "test"
            ? `${summary.score}% al primer intento`
            : "Gut gemacht!"}
        </h1>
        <p>
          {summary.correct} de {summary.total} actividades acertadas al
          continuar. El progreso y los errores se han guardado.
        </p>
        {summary.type === "test" && summary.score < 80 && (
          <p>
            Vuelve a las estructuras que lo necesitan y prueba otra vez cuando
            quieras.
          </p>
        )}
        <button className="button primary" onClick={() => navigate("/curso")}>
          Volver al itinerario
          <Icon name="arrow" />
        </button>
      </section>
    );
  if (!session)
    return (
      <>
        <PageHead
          eyebrow="TU SESIÓN"
          title="Elige por dónde seguir."
          description="Inicia una sesión desde Hoy o abre una unidad del itinerario."
        />
        <Link className="button primary" to="/">
          Ir a Hoy
        </Link>
      </>
    );
  const task = session.tasks[session.index];
  const [kind, id] = task.split(":");
  const phrase = phrases.find((p) => p.id === id);
  const reading = readings.find((r) => r.id === id);
  const mode: Mode =
    kind === "lesson"
      ? (["translation", "order", "dictation", "choice"] as Mode[])[
          session.index % 4
        ]
      : kind === "dictation"
        ? "dictation"
        : kind === "order"
          ? "order"
          : kind === "choice"
            ? "choice"
            : "translation";
  return (
    <>
      <div className="session-heading">
        <Link to={`/curso/${session.unit}`} className="text-link">
          ← Guardar y salir
        </Link>
        <span>
          {session.type === "test"
            ? "Prueba de unidad"
            : session.type === "daily"
              ? "Mi sesión de hoy"
              : "Práctica guiada"}{" "}
          · {session.index + 1}/{session.tasks.length}
        </span>
      </div>
      <Progress
        value={(session.index / session.tasks.length) * 100}
        label="Sesión completada"
      />
      {session.type === "daily" && (
        <details className="session-plan panel">
          <summary>
            Organizar mi sesión · puedes cambiar las actividades pendientes
          </summary>
          {session.tasks.map((t, i) => (
            <div className="plan-row" key={t}>
              <span>
                {i < session.index ? "✓ " : `${i + 1}. `}
                {t.startsWith("read:")
                  ? "Comprender una lectura"
                  : t.startsWith("card:")
                    ? "Repasar una tarjeta"
                    : t.startsWith("dictation:")
                      ? "Dictado"
                      : t.startsWith("order:")
                        ? "Orden de palabras"
                        : "Práctica de una frase"}
              </span>
              {i >= session.index &&
                session.tasks.length > session.index + 1 && (
                  <div className="button-row">
                    <button
                      aria-label={`Adelantar actividad ${i + 1}`}
                      disabled={i <= session.index}
                      onClick={() =>
                        update((d) => {
                          if (!d.session) return d;
                          const tasks = [...d.session.tasks];
                          [tasks[i - 1], tasks[i]] = [tasks[i], tasks[i - 1]];
                          return { ...d, session: { ...d.session, tasks } };
                        })
                      }
                    >
                      ↑
                    </button>
                    <button
                      aria-label={`Quitar actividad ${i + 1}`}
                      onClick={() =>
                        update((d) => {
                          if (!d.session) return d;
                          return {
                            ...d,
                            session: {
                              ...d.session,
                              tasks: d.session.tasks.filter((_, j) => j !== i),
                            },
                          };
                        })
                      }
                    >
                      Quitar
                    </button>
                  </div>
                )}
            </div>
          ))}
          <p className="small">
            También puedes salir y elegir cualquier actividad desde el menú.
          </p>
        </details>
      )}
      {kind === "read" && reading ? (
        <ReadingView
          key={task}
          reading={reading}
          onDone={() =>
            advance({
              correct: data.completed.includes(reading.id),
              first:
                !data.attempts.some(
                  (a) =>
                    a.exercise.startsWith(`reading:${reading.id}`) &&
                    !a.correct,
                ) && data.completed.includes(reading.id),
            })
          }
        />
      ) : kind === "card" ? (
        <CardReview
          key={task}
          wordId={id}
          onDone={(ok) => advance({ correct: ok, first: ok })}
        />
      ) : phrase ? (
        <Exercise
          key={`${session.id}:${session.index}`}
          phrase={phrase}
          mode={mode}
          exerciseId={
            session.type === "test" ? `${session.id}:${phrase.id}` : task
          }
          onAdvance={advance}
          final={session.index === session.tasks.length - 1}
        />
      ) : (
        <section className="panel">
          <p>
            Este contenido ya no está disponible. Tu progreso anterior se
            conserva.
          </p>
          <button
            className="button secondary"
            onClick={() => advance({ correct: false, first: false })}
          >
            Continuar
          </button>
        </section>
      )}
      <p className="page-footnote">
        Puedes salir y retomar esta sesión. Se conserva la actividad y tu
        respuesta escrita.
      </p>
    </>
  );
}
