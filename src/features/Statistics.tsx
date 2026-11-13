import { Link } from "react-router-dom";
import { useApp } from "../app/context";
import { units, readings } from "../content";
import { stats, unitStatus } from "../learning";
import type { Skill } from "../learning/types";
import { PageHead, Progress } from "../components/common";
export function Statistics() {
  const { data } = useApp();
  const s = stats(data);
  const skillNames: Skill[] = [
    "lectura",
    "oído",
    "vocabulario",
    "gramática",
    "orden",
    "reformular",
    "canciones",
  ];
  const first = data.attempts.filter((a) => a.first);
  const errors = [...data.attempts]
    .reverse()
    .filter((a) => !a.correct)
    .slice(0, 30);
  return (
    <>
      <PageHead
        eyebrow="TU ACTIVIDAD REAL"
        title="Mira lo que estás construyendo."
        description="Comprensión, práctica y recuerdo. Cada dato nace de una actividad que has realizado."
      />
      <div className="statistics-summary">
        <div className="panel">
          <strong>{s.xp}</strong>
          <span>XP acumulados</span>
        </div>
        <div className="panel">
          <strong>{s.accuracy}%</strong>
          <span>aciertos en {data.attempts.length} respuestas</span>
        </div>
        <div className="panel">
          <strong>
            {first.length
              ? Math.round(
                  (first.filter((a) => a.correct).length / first.length) * 100,
                )
              : 0}
            %
          </strong>
          <span>aciertos al primer intento</span>
        </div>
        <div className="panel">
          <strong>
            {(data.attempts.reduce((n, a) => n + a.seconds, 0) / 60).toFixed(1)}
          </strong>
          <span>minutos de actividad registrada</span>
        </div>
      </div>
      <div className="settings-grid">
        <section className="panel">
          <h2>Actividad semanal</h2>
          <div className="week-chart">
            {s.days.map((d) => (
              <div className="day-bar" key={d.key}>
                <span className="bar-value">{d.xp}</span>
                <div className="bar-track">
                  <span
                    style={{
                      height: `${(d.xp / Math.max(50, ...s.days.map((v) => v.xp))) * 100}%`,
                    }}
                  />
                </div>
                <span>{d.label}</span>
                <small>{d.minutes.toFixed(1)} min</small>
              </div>
            ))}
          </div>
        </section>
        <section className="panel">
          <h2>Por habilidad</h2>
          {skillNames.map((skill) => {
            const a = data.attempts.filter((x) => x.skill === skill);
            const accuracy = a.length
              ? (a.filter((x) => x.correct).length / a.length) * 100
              : 0;
            return (
              <div className="skill-row" key={skill}>
                <div>
                  <span>{skill}</span>
                  <span>
                    {a.length
                      ? `${Math.round(accuracy)}% · ${a.length} respuestas`
                      : "Sin práctica registrada"}
                  </span>
                </div>
                <Progress value={accuracy} label={`Aciertos de ${skill}`} />
              </div>
            );
          })}
        </section>
        <section className="panel">
          <h2>Palabras y comprensión</h2>
          <div className="data-line">
            <span>Tarjetas guardadas</span>
            <strong>{data.cards.length}</strong>
          </div>
          <div className="data-line">
            <span>Recordadas (caja 2 o más)</span>
            <strong>{s.learned}</strong>
          </div>
          <div className="data-line">
            <span>Entradas reconocidas en contexto</span>
            <strong>
              {
                new Set(
                  readings
                    .filter((r) => data.completed.includes(r.id))
                    .flatMap((r) => r.targetVocabulary),
                ).size
              }
            </strong>
          </div>
          <div className="data-line">
            <span>Lecturas comprendidas</span>
            <strong>
              {data.completed.length}/{readings.length}
            </strong>
          </div>
          <div className="data-line">
            <span>Historias escuchadas hasta el final</span>
            <strong>{data.listened.length}</strong>
          </div>
          <div className="data-line">
            <span>Sesiones completadas</span>
            <strong>{data.sessionsCompleted}</strong>
          </div>
          <p className="small">
            Reconocimiento en contexto significa haber comprendido una lectura
            con esas entradas objetivo; no demuestra recuerdo individual. El
            repaso de reconocimiento usa tu propia valoración.
          </p>
        </section>
        <section className="panel">
          <h2>Tu camino hacia A1</h2>
          {units.map((u) => {
            const st = unitStatus(data, u.id);
            return (
              <div className="unit-progress-row" key={u.id}>
                <Link to={`/curso/${u.id}`}>
                  {u.number}. {u.title}
                </Link>
                <span>
                  {st.complete
                    ? "Consolidada"
                    : `${st.practiced}/8 · prueba ${st.test}%`}
                </span>
              </div>
            );
          })}
          <p className="small">
            Progreso estimado por actividades, sin equivalencia a una
            certificación.
          </p>
        </section>
      </div>
      <div className="settings-grid metric-charts">
        <section className="panel">
          <h2>Evolución de aciertos</h2>
          <div
            className="week-chart"
            role="img"
            aria-label="Porcentaje de aciertos por día; sin datos se muestra un guion"
          >
            {s.days.map((d) => (
              <div className="day-bar" key={d.key}>
                <span className="bar-value">
                  {d.total
                    ? `${Math.round((d.correct / d.total) * 100)}%`
                    : "—"}
                </span>
                <div className="bar-track">
                  <span
                    style={{
                      height: `${d.total ? (d.correct / d.total) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span>{d.label}</span>
              </div>
            ))}
          </div>
          <p className="small chart-caption">
            Una jornada sin respuestas no se cuenta como un 0% de acierto.
          </p>
        </section>
        <section className="panel">
          <h2>El recuerdo crece con el repaso</h2>
          <div
            className="week-chart"
            role="img"
            aria-label="Tarjetas actuales que habían alcanzado caja dos al final de cada día"
          >
            {s.days.map((d) => {
              const cutoff = new Date(d.key + "T23:59:59").getTime();
              const n = data.cards.filter(
                (c) =>
                  c.history
                    .filter((h) => Date.parse(h.at) <= cutoff)
                    .sort((a, b) => Date.parse(a.at) - Date.parse(b.at))
                    .reduce((box, h) => (h.ok ? Math.min(4, box + 1) : 0), 0) >=
                  2,
              ).length;
              return (
                <div className="day-bar" key={d.key}>
                  <span className="bar-value">{n}</span>
                  <div className="bar-track">
                    <span
                      style={{
                        height: `${(n / Math.max(1, data.cards.length)) * 100}%`,
                      }}
                    />
                  </div>
                  <span>{d.label}</span>
                </div>
              );
            })}
          </div>
          <p className="small chart-caption">
            Reconstruido desde el historial de tus tarjetas actuales. Caja 2 o
            superior; no certifica dominio de cada palabra.
          </p>
        </section>
      </div>
      <section className="panel recent">
        <h2>Errores para repasar</h2>
        {errors.length ? (
          errors.map((a) => (
            <div className="error-history" key={a.id}>
              <span>
                {new Date(a.at).toLocaleDateString("es-ES")} · {a.skill}
              </span>
              <p lang="de">
                <del>{a.answer || "Respuesta revelada u omitida"}</del>
              </p>
              <strong lang="de">{a.expected}</strong>
              <Link className="text-link" to={`/gramatica?unidad=${a.unit}`}>
                Consultar regla
              </Link>
            </div>
          ))
        ) : (
          <p>
            Todavía no hay errores registrados. Aparecerán aquí como
            oportunidades de repaso.
          </p>
        )}
      </section>
    </>
  );
}
