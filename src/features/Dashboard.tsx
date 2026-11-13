import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../app/context";
import { units, counts } from "../content";
import { currentUnit, dailyTasks, stats, unitStatus } from "../learning";
import { PageHead, Progress, SectionLink } from "../components/common";
import { Icon } from "../components/Icon";
export function Dashboard() {
  const { data, update } = useApp();
  const navigate = useNavigate();
  const unit = currentUnit(data),
    s = stats(data);
  const status = unitStatus(data, unit.id);
  const completed = units.filter((u) => unitStatus(data, u.id).complete).length;
  const mistakes = [...data.attempts]
    .reverse()
    .filter((a) => !a.correct)
    .filter(
      (a, i, all) => all.findIndex((b) => b.exercise === a.exercise) === i,
    )
    .slice(0, 3);
  const start = () => {
    if (!data.session)
      update((d) => ({
        ...d,
        session: {
          id: crypto.randomUUID(),
          unit: unit.id,
          type: "daily",
          index: 0,
          tasks: dailyTasks(d, d.profile.minutes),
          correct: 0,
          firstCorrect: 0,
          started: new Date().toISOString(),
        },
      }));
    navigate("/sesion");
  };
  return (
    <>
      <PageHead
        eyebrow="TU ESPACIO DE CADA DÍA"
        title="Hallo! Un buen día para aprender."
        description="A tu ritmo. Una historia, unas palabras y un poco más de alemán."
      >
        <span className="level-chip">
          <span />
          {unit.level} ·{" "}
          {completed === 20
            ? "Repaso A1"
            : unit.level === "A0"
              ? "Primeros pasos"
              : "En camino a A1"}
        </span>
      </PageHead>
      <div className="dashboard-top">
        <section className="daily-hero">
          <div className="hero-copy">
            <div className="eyebrow">DEUTSCH, JEDEN TAG.</div>
            <h2>
              Un pequeño paso.
              <br />
              <em>Un mundo nuevo.</em>
            </h2>
            <p>
              Tu sesión de hoy combina comprensión y práctica. El progreso
              empieza con lo que entiendes.
            </p>
            <button className="button primary" onClick={start}>
              {data.session ? "Retomar mi sesión" : "Comenzar mi sesión"}
              <Icon name="arrow" />
            </button>
            <div className="hero-foot">
              <Icon name="clock" size={16} />
              <label className="session-duration">
                <span className="sr-only">Duración de sesión</span>
                <select
                  aria-label="Duración de sesión"
                  value={data.profile.minutes}
                  onChange={(e) =>
                    update((d) => ({
                      ...d,
                      profile: {
                        ...d.profile,
                        minutes: Number(e.target.value) as 10 | 20 | 40,
                      },
                    }))
                  }
                >
                  <option value="10">10 min</option>
                  <option value="20">20 min</option>
                  <option value="40">40 min</option>
                </select>
              </label>{" "}
              orientativos<span>·</span>Sin prisas, sin penalizaciones
            </div>
          </div>
          <div className="bauhaus" aria-hidden="true">
            <div className="shape-grid" />
            <div className="shape-sun" />
            <div className="shape-arch" />
            <div className="shape-block" />
            <div className="shape-circle" />
            <span className="art-hallo">hallo.</span>
            <span className="art-small">ein neuer Anfang</span>
          </div>
        </section>
        <section className="goal-card">
          <div className="eyebrow">TU OBJETIVO DIARIO</div>
          <div
            className="goal-ring"
            style={{
              background: `conic-gradient(var(--green) ${Math.min(100, (s.today.xp / (data.profile.minutes * 5)) * 100)}%,var(--line) 0)`,
            }}
          >
            <div>
              <strong>{s.today.xp}</strong>
              <span>de {data.profile.minutes * 5} XP</span>
            </div>
          </div>
          <h3>Cada momento cuenta.</h3>
          <p>{s.today.minutes.toFixed(1)} min de actividad registrada hoy.</p>
          <SectionLink to="/ajustes">Ajustar mi objetivo</SectionLink>
        </section>
      </div>
      <div className="metric-strip">
        <div>
          <Icon name="flame" />
          <strong>{s.streak}</strong>
          <span>días de racha</span>
        </div>
        <div>
          <Icon name="chart" />
          <strong>{s.xp}</strong>
          <span>XP aprendiendo</span>
        </div>
        <div>
          <Icon name="cards" />
          <strong>{s.due}</strong>
          <span>tarjetas pendientes</span>
        </div>
        <div>
          <Icon name="check" />
          <strong>{data.completed.length}</strong>
          <span>lecturas comprendidas</span>
        </div>
      </div>
      <div className="dashboard-bottom">
        <section className="panel continue-panel">
          <div className="section-heading">
            <h2>Tu siguiente paso</h2>
            <SectionLink to="/curso">Ver itinerario</SectionLink>
          </div>
          <div className="unit-feature">
            <div className="unit-number">
              {String(unit.number).padStart(2, "0")}
              <span>{unit.level}</span>
            </div>
            <div>
              <div className="eyebrow">UNIDAD EN CURSO</div>
              <h3 lang="de">{unit.title}</h3>
              <p>{unit.subtitle}</p>
              <Progress
                value={
                  ((status.practiced / 8) * 0.5 +
                    Number(status.read) * 0.2 +
                    (status.test / 100) * 0.3) *
                  100
                }
                label="Progreso de unidad"
              />
              <div className="small">
                {status.practiced}/8 frases practicadas ·{" "}
                {status.read ? "Lectura comprendida" : "Lectura por descubrir"}
              </div>
            </div>
          </div>
          <Link to={`/curso/${unit.id}`} className="button secondary wide">
            {status.practiced
              ? "Continuar unidad"
              : "Explorar la primera lección"}
            <Icon name="arrow" />
          </Link>
          <div className="course-line">
            <span>Tu recorrido A0 → A1</span>
            <strong>{completed}/20 unidades</strong>
          </div>
          <Progress
            value={(completed / 20) * 100}
            label="Unidades consolidadas"
          />
        </section>
        <section className="panel week-panel">
          <div className="section-heading">
            <h2>Tu semana, en alemán</h2>
            <SectionLink to="/estadisticas">Ver más</SectionLink>
          </div>
          <div
            className="week-chart"
            aria-label="XP registrados en los últimos siete días"
          >
            {s.days.map((d) => (
              <div className="day-bar" key={d.key}>
                <span className="bar-value">{d.xp}</span>
                <div className="bar-track">
                  <span
                    style={{
                      height: `${d.xp ? Math.max(4, (d.xp / Math.max(50, ...s.days.map((v) => v.xp))) * 100) : 0}%`,
                    }}
                  />
                </div>
                <span>{d.label.replace(".", "")}</span>
              </div>
            ))}
          </div>
          <div className="week-note">
            <span className="dot" />
            Actividad real · {s.days.reduce((n, d) => n + d.xp, 0)} XP esta
            semana
          </div>
        </section>
      </div>
      <div className="section-heading explore-head">
        <h2>Aprende de otra manera</h2>
        <span className="small">Comprender. Practicar. Reencontrar.</span>
      </div>
      <div className="quick-grid">
        {[
          {
            to: "/inmersion",
            icon: "book",
            tag: "EL MENSAJE PRIMERO",
            title: "Pequeñas historias",
            text: `${counts.readings} situaciones para entrar en el alemán.`,
            color: "sage",
          },
          {
            to: "/vocabulario",
            icon: "cards",
            tag: "PALABRAS QUE SE QUEDAN",
            title: "Tu próxima palabra",
            text: `${counts.words} entradas con ejemplos y repaso.`,
            color: "peach",
          },
          {
            to: "/oido",
            icon: "audio",
            tag: "AFINA TU OÍDO",
            title: "Escucha con calma",
            text: "Reconoce sonidos y escribe lo que oyes.",
            color: "lavender",
          },
        ].map((q) => (
          <Link className={`quick-card ${q.color}`} key={q.to} to={q.to}>
            <Icon name={q.icon} size={27} />
            <div className="eyebrow">{q.tag}</div>
            <h3>{q.title}</h3>
            <p>{q.text}</p>
            <Icon name="arrow" />
          </Link>
        ))}
      </div>
      {mistakes.length > 0 && (
        <section className="panel recent">
          <div className="section-heading">
            <h2>Para reencontrar con calma</h2>
            <SectionLink to="/estadisticas">Todos mis errores</SectionLink>
          </div>
          {mistakes.map((m) => (
            <div className="recent-error" key={m.id}>
              <span lang="de">{m.expected}</span>
              <Link to={`/reformular?unidad=${m.unit}`} className="text-link">
                Repasar
                <Icon name="arrow" size={16} />
              </Link>
            </div>
          ))}
        </section>
      )}
      <p className="page-footnote">
        Tu progreso se guarda en este navegador. Haz una copia desde Ajustes
        para llevarlo a otro dispositivo.
      </p>
    </>
  );
}
