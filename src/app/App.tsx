import { useEffect, useState } from "react";
import {
  HashRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";
import { Provider, useApp } from "./context";
import { usePwa } from "./usePwa";
import { Dashboard } from "../features/Dashboard";
import { Immersion } from "../features/Immersion";
import { Vocabulary } from "../features/Vocabulary";
import { Practice } from "../features/Practice";
import { Grammar } from "../features/Grammar";
import { Songs } from "../features/Songs";
import { Settings, Onboarding } from "../features/Settings";
import { Statistics } from "../features/Statistics";
import { Course, StudySession } from "../features/Course";
import { Icon } from "../components/Icon";
import { stats, currentUnit } from "../learning";
import { saveData } from "../storage";
const nav = [
  ["/", "sun", "Hoy"],
  ["/inmersion", "book", "Inmersión"],
  ["/vocabulario", "cards", "Vocabulario"],
  ["/oido", "audio", "Oído"],
  ["/reformular", "edit", "Reformular"],
  ["/gramatica", "grammar", "Gramática"],
  ["/orden", "order", "Orden de palabras"],
  ["/canciones", "music", "Canciones"],
];
function Shell() {
  const { data, update, flush } = useApp();
  const location = useLocation();
  const [menu, setMenu] = useState(false);
  const pwa = usePwa();
  const s = stats(data);
  useEffect(() => {
    setMenu(false);
    window.scrollTo(0, 0);
    window.speechSynthesis?.cancel();
    document.title = `${nav.find((n) => n[0] === location.pathname)?.[2] ?? (location.pathname.startsWith("/curso") ? "Itinerario" : "Mi espacio")} · Deutschraum`;
  }, [location.pathname]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const modal = document.querySelector<HTMLElement>('[role="dialog"]');
      if (!modal || e.key !== "Tab") return;
      const els = Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]),input:not([disabled]),select,textarea,a[href],[tabindex="0"]',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (!els.length) return;
      const first = els[0],
        last = els[els.length - 1];
      if (!modal.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <div className="app-shell" inert={!data.profile.onboarded}>
        <aside className={`sidebar ${menu ? "is-open" : ""}`}>
          <Link className="brand" to="/" aria-label="Deutschraum, inicio">
            <span className="brand-symbol" />
            <span>
              deutschraum<span className="brand-dot">.</span>
              <small>UN ESPACIO PARA EL ALEMÁN</small>
            </span>
          </Link>
          <div className="sidebar-label">MI APRENDIZAJE</div>
          <nav aria-label="Secciones principales">
            {nav.map(([to, icon, label]) => (
              <NavLink
                end={to === "/"}
                to={to}
                key={to}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
              >
                <Icon name={icon} />
                <span>{label}</span>
                {to === "/vocabulario" && s.due > 0 && (
                  <span className="nav-count">{s.due}</span>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <div className="sidebar-course">
              <span className="pill">A0 → A1</span>
              <p>
                De las primeras palabras
                <br />a tu vida en alemán.
              </p>
              <Link className="text-link" to="/curso">
                Mi itinerario
                <Icon name="arrow" size={16} />
              </Link>
            </div>
            <NavLink className="nav-item" to="/estadisticas">
              <Icon name="chart" />
              Mi progreso
            </NavLink>
            <NavLink className="nav-item" to="/ajustes">
              <Icon name="settings" />
              Ajustes
            </NavLink>
            <div className="local-note">
              <span className="dot" />
              Tu aprendizaje se queda contigo.
            </div>
          </div>
        </aside>
        {menu && (
          <button
            className="menu-scrim"
            aria-label="Cerrar menú"
            onClick={() => setMenu(false)}
          />
        )}
        <div className="workspace">
          <header className="topbar">
            <div className="breadcrumb">
              <button
                className="icon-button mobile-menu"
                aria-label="Abrir menú"
                aria-expanded={menu}
                onClick={() => setMenu(!menu)}
              >
                <Icon name="menu" />
              </button>
              <span>Mein Lernraum</span>
              <span className="breadcrumb-slash">/</span>
              <strong>
                {nav.find((n) => n[0] === location.pathname)?.[2] ??
                  "Mi espacio"}
              </strong>
            </div>
            <div className="topbar-right">
              <span className="offline-status">
                <span className="dot" />
                {pwa.offline
                  ? "Sin conexión"
                  : pwa.ready
                    ? "Curso guardado offline"
                    : "Progreso local"}
              </span>
              <button
                className="icon-button theme-toggle"
                aria-label="Cambiar modo claro u oscuro"
                onClick={() =>
                  update((d) => ({
                    ...d,
                    profile: {
                      ...d.profile,
                      theme:
                        document.documentElement.dataset.theme === "dark"
                          ? "light"
                          : "dark",
                    },
                  }))
                }
              >
                <Icon
                  name={
                    document.documentElement.dataset.theme === "dark"
                      ? "sun"
                      : "moon"
                  }
                />
              </button>
              <Link
                to="/ajustes"
                className="profile-avatar"
                aria-label="Perfil y ajustes"
              >
                {currentUnit(data).level}
              </Link>
            </div>
          </header>
          {pwa.waiting && (
            <div className="update-banner" role="status">
              Hay una nueva versión del curso.
              <button
                className="text-link"
                onClick={async () => {
                  await flush();
                  await saveData(data);
                  navigator.serviceWorker.addEventListener(
                    "controllerchange",
                    () => window.location.reload(),
                    { once: true },
                  );
                  pwa.waiting?.postMessage("ACTIVATE");
                }}
              >
                Guardar y actualizar
              </button>
            </div>
          )}
          {pwa.error && <div className="notice">{pwa.error}</div>}
          <main id="main" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inmersion" element={<Immersion />} />
              <Route path="/vocabulario" element={<Vocabulary />} />
              <Route
                path="/oido"
                element={<Practice key="oido" section="oido" />}
              />
              <Route
                path="/reformular"
                element={<Practice key="reformular" section="reformular" />}
              />
              <Route
                path="/orden"
                element={<Practice key="orden" section="orden" />}
              />
              <Route path="/gramatica" element={<Grammar />} />
              <Route path="/canciones" element={<Songs />} />
              <Route path="/curso" element={<Course />} />
              <Route path="/curso/:unit" element={<Course />} />
              <Route path="/sesion" element={<StudySession />} />
              <Route path="/ajustes" element={<Settings />} />
              <Route path="/estadisticas" element={<Statistics />} />
              <Route
                path="*"
                element={
                  <div className="panel">
                    <h1>Volvamos a tu espacio.</h1>
                    <Link className="button primary" to="/">
                      Ir a Hoy
                    </Link>
                  </div>
                }
              />
            </Routes>
          </main>
          <footer className="app-footer">
            <span>deutschraum.</span>
            <span>Un poco de alemán. Cada día.</span>
            <span>A0–A1 · Sin cuenta · Local</span>
          </footer>
        </div>
      </div>
      <Onboarding />
    </>
  );
}
export default function App() {
  return (
    <Provider>
      <HashRouter>
        <Shell />
      </HashRouter>
    </Provider>
  );
}
