import { useRef, useState } from "react";
import { useApp, initialData } from "../app/context";
import { useAudio } from "../audio/useAudio";
import { parseBackup, saveData } from "../storage";
import type { UserData } from "../learning/types";
import { counts } from "../content";
import { PageHead } from "../components/common";
import { Icon } from "../components/Icon";
export function AudioSettings() {
  const { data, update } = useApp();
  const audio = useAudio(data.profile.voice, data.profile.rate);
  return (
    <>
      <label>
        Voz alemana
        <select
          value={data.profile.voice}
          onChange={(e) =>
            update((d) => ({
              ...d,
              profile: { ...d.profile, voice: e.target.value },
            }))
          }
        >
          <option value="">Automática (preferir voz local alemana)</option>
          {audio.voices.map((v) => (
            <option key={v.voiceURI} value={v.voiceURI}>
              {v.name} · {v.lang}
              {v.localService ? " · local" : ""}
            </option>
          ))}
        </select>
      </label>
      <label>
        Velocidad de práctica
        <select
          value={data.profile.rate}
          onChange={(e) =>
            update((d) => ({
              ...d,
              profile: { ...d.profile, rate: Number(e.target.value) },
            }))
          }
        >
          <option value="1">Normal</option>
          <option value="0.85">Lenta</option>
          <option value="0.6">Muy lenta</option>
        </select>
      </label>
      <button
        className="button secondary"
        onClick={() => audio.speak("Guten Tag! Ich lerne Deutsch.")}
      >
        <Icon name="audio" />
        Comprobar audio alemán
      </button>
      <p className="small">
        {audio.voices.length
          ? `${audio.voices.length} voces alemanas disponibles. ${audio.voices.filter((v) => v.localService).length} marcadas como locales por el navegador.`
          : "Aún no hay voces alemanas disponibles. Puedes seguir con el curso escrito e instalar una voz en el dispositivo."}{" "}
        El TTS offline depende del dispositivo y no está garantizado.
      </p>
      {audio.error && (
        <p className="notice" role="status">
          {audio.error}
        </p>
      )}
    </>
  );
}
export function Settings() {
  const { data, update, notice } = useApp();
  const [pending, setPending] = useState<UserData | null>(null);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `deutschraum-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    notice("Copia JSON exportada.");
  };
  return (
    <>
      <PageHead
        eyebrow="A TU MANERA"
        title="Este espacio es tuyo."
        description="Ajusta el ritmo, escucha una voz alemana y cuida tu progreso."
      />
      <div className="settings-grid">
        <section className="panel">
          <h2>Tu ritmo y tu pantalla</h2>
          <label>
            Objetivo diario
            <select
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
              <option value="10">10 minutos · sesión corta</option>
              <option value="20">20 minutos · sesión normal</option>
              <option value="40">40 minutos · sesión larga</option>
            </select>
          </label>
          <label>
            Apariencia
            <select
              aria-label="Apariencia"
              value={data.profile.theme}
              onChange={(e) =>
                update((d) => ({
                  ...d,
                  profile: {
                    ...d.profile,
                    theme: e.target.value as UserData["profile"]["theme"],
                  },
                }))
              }
            >
              <option value="system">Seguir al sistema</option>
              <option value="light">Modo claro</option>
              <option value="dark">Modo oscuro</option>
            </select>
          </label>
          <p className="small">
            Alemán estándar de Alemania · explicaciones en español · inicio A0 ·
            objetivo A1.
          </p>
        </section>
        <section className="panel">
          <h2>Escucha y pronunciación</h2>
          <AudioSettings />
        </section>
        <section className="panel">
          <h2>Tu progreso, a salvo</h2>
          <p>
            El progreso se almacena en IndexedDB en este navegador. No se
            sincroniza entre dispositivos.
          </p>
          <div className="button-row">
            <button className="button primary" onClick={exportData}>
              <Icon name="download" />
              Exportar copia JSON
            </button>
            <button
              className="button secondary"
              onClick={() => input.current?.click()}
            >
              Importar una copia
            </button>
          </div>
          <input
            ref={input}
            className="sr-only"
            tabIndex={-1}
            aria-label="Archivo de copia de seguridad"
            type="file"
            accept=".json,application/json"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                if (file.size > 25_000_000)
                  throw new Error("La copia supera 25 MB.");
                setPending(parseBackup(await file.text()));
                setError("");
              } catch (err) {
                setError(
                  err instanceof Error ? err.message : "Archivo no válido.",
                );
              }
              e.target.value = "";
            }}
          />
          {error && (
            <p role="alert" className="error-text">
              {error}
            </p>
          )}
          {pending && (
            <div className="import-preview">
              <h3>Copia validada</h3>
              <p>
                {pending.attempts.length} respuestas · {pending.cards.length}{" "}
                tarjetas · {pending.customWords.length} palabras personales.
              </p>
              <p>
                Importar reemplazará el progreso de este navegador. Exporta
                primero tu copia actual si quieres conservarla.
              </p>
              <div className="button-row">
                <button
                  className="button primary"
                  onClick={() => {
                    update(() => pending);
                    setPending(null);
                    notice("Copia importada.");
                  }}
                >
                  Importar y reemplazar
                </button>
                <button
                  className="button secondary"
                  onClick={() => setPending(null)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </section>
        <section className="panel">
          <h2>Un curso sin servidores</h2>
          <p>
            {counts.units} unidades · {counts.words} entradas léxicas ·{" "}
            {counts.readings} lecturas · {counts.sources} frases base
            reutilizadas en escucha, traducción y orden.
          </p>
          <p className="small">
            El curso escrito puede usarse offline después de preparar la caché.
            El audio requiere una voz alemana compatible. Instala la aplicación
            desde el menú de tu navegador cuando esté disponible.
          </p>
          <p className="small">
            La estimación de progreso A1 no es una certificación oficial.
          </p>
          <details>
            <summary>Referencias curriculares</summary>
            <p>
              <a
                href="https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors-search"
                target="_blank"
                rel="noreferrer"
              >
                Descriptores MCER (Consejo de Europa) ↗
              </a>
            </p>
            <p>
              <a
                href="https://www.goethe.de/de/spr/prf/ueb/pa1.html"
                target="_blank"
                rel="noreferrer"
              >
                Ámbitos y materiales A1 (Goethe-Institut) ↗
              </a>
            </p>
            <p>
              Contenido original de Deutschraum. Cobertura orientativa; sin
              afiliación a esas instituciones.
            </p>
          </details>
        </section>
        <section className="panel danger-zone">
          <h2>Gestionar datos locales</h2>
          <div className="button-row">
            <button
              className="button secondary"
              onClick={() => {
                if (
                  confirm(
                    "¿Vaciar tus tarjetas? Se conservarán palabras personales, resultados y lecciones.",
                  )
                )
                  update((d) => ({ ...d, cards: [] }));
              }}
            >
              Vaciar tarjetas
            </button>
            <button
              className="button secondary"
              onClick={() => {
                if (confirm("¿Borrar todas las letras guardadas?"))
                  update((d) => ({
                    ...d,
                    songs: [],
                    drafts: { ...d.drafts, "song-import": "" },
                  }));
              }}
            >
              Borrar letras guardadas
            </button>
            <button
              className="button danger"
              onClick={() => {
                if (
                  confirm(
                    "¿Restablecer TODO el progreso? Esta acción borra tarjetas, palabras personales, letras y resultados. Exporta una copia antes.",
                  )
                ) {
                  update(() => initialData());
                  notice("Progreso restablecido.");
                }
              }}
            >
              Restablecer progreso
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
export function Onboarding() {
  const { data, update } = useApp();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  if (data.profile.onboarded && !saving) return null;
  return (
    <div className="modal-backdrop onboarding-backdrop">
      <section
        className="modal onboarding"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
      >
        <div className="brand-symbol" />
        <div className="eyebrow">BIENVENIDO A DEUTSCHRAUM</div>
        <h1 id="welcome-title">
          {step === 0 ? "Tu alemán empieza aquí." : "Escucha tu primera frase."}
        </h1>
        {step === 0 ? (
          <>
            <p>
              De cero a situaciones cotidianas. Primero comprende, después
              practica y vuelve a encontrar lo aprendido.
            </p>
            <div className="welcome-level">
              <strong>A0 → A1</strong>
              <span>
                Empezamos desde cero.
                <br />
                Sin cuenta. A tu ritmo.
              </span>
            </div>
            <label>
              ¿Cuánto tiempo quieres dedicar al día?
              <select
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
                <option value="10">10 minutos</option>
                <option value="20">20 minutos</option>
                <option value="40">40 minutos</option>
              </select>
            </label>
            <label>
              Apariencia
              <select
                value={data.profile.theme}
                onChange={(e) =>
                  update((d) => ({
                    ...d,
                    profile: {
                      ...d.profile,
                      theme: e.target.value as UserData["profile"]["theme"],
                    },
                  }))
                }
              >
                <option value="system">Seguir al sistema</option>
                <option value="light">Claro</option>
                <option value="dark">Oscuro</option>
              </select>
            </label>
            <button className="button primary wide" onClick={() => setStep(1)}>
              Continuar
              <Icon name="arrow" />
            </button>
          </>
        ) : (
          <>
            <p>
              La aplicación utiliza las voces alemanas de tu navegador. Escucha
              y repite si te apetece; no evaluamos tu pronunciación.
            </p>
            <AudioSettings />
            <button
              className="button primary wide"
              disabled={saving}
              onClick={async () => {
                setSaving(true);
                await update((d) => ({
                  ...d,
                  profile: { ...d.profile, onboarded: true },
                }));
                setSaving(false);
              }}
            >
              {saving ? "Guardando…" : "Entrar en mi espacio"}
              <Icon name="arrow" />
            </button>
            <button className="text-link" onClick={() => setStep(0)}>
              Volver
            </button>
          </>
        )}
      </section>
    </div>
  );
}
