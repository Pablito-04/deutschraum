import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { UserData, Skill } from "../learning/types";
import { loadData, saveData, initialData } from "../storage";
import { vocabulary } from "../content";
interface Context {
  data: UserData;
  update: (fn: (d: UserData) => UserData) => Promise<void>;
  flush: () => Promise<void>;
  record: (
    exercise: string,
    unit: string,
    skill: Skill,
    correct: boolean,
    answer: string,
    expected: string,
    seconds: number,
    typo?: boolean,
  ) => void;
  addCard: (id: string) => void;
  notice: (s: string) => void;
}
const State = createContext<Context | null>(null);
export function Provider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<UserData | null>(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const queue = useRef(Promise.resolve());
  const dataRef = useRef<UserData | null>(null);
  useEffect(() => {
    loadData()
      .then((d) => {
        dataRef.current = d;
        setData(d);
      })
      .catch((e) =>
        setError(
          `No se ha podido abrir tu progreso: ${e.message}. Revisa que el navegador permita IndexedDB. No borres los datos sin una copia.`,
        ),
      );
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4500);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    if (!data) return;
    const m = matchMedia("(prefers-color-scheme: dark)");
    const sync = () =>
      (document.documentElement.dataset.theme =
        data.profile.theme === "system"
          ? m.matches
            ? "dark"
            : "light"
          : data.profile.theme);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, [data?.profile.theme]);
  const update = (fn: (d: UserData) => UserData) => {
    const old = dataRef.current;
    if (!old) return Promise.resolve();
    const next = fn(old);
    dataRef.current = next;
    setData(next);
    queue.current = queue.current
      .then(() => saveData(next))
      .catch((e) => {
        setError(
          `No se ha podido guardar: ${e.message}. Exporta una copia antes de cerrar.`,
        );
      });
    return queue.current;
  };
  const record = (
    exercise: string,
    unit: string,
    skill: Skill,
    ok: boolean,
    answer: string,
    expected: string,
    seconds: number,
    typo = false,
  ) => {
    const at = new Date().toISOString();
    update((d) => {
      const previous = d.attempts.filter((a) => a.exercise === exercise);
      const xp = ok && !previous.some((a) => a.correct) ? 10 : 0;
      const event = {
        id: crypto.randomUUID(),
        exercise,
        unit,
        skill,
        correct: ok,
        typo,
        first: previous.length === 0,
        at,
        seconds: Math.min(600, Math.max(0, seconds)),
        answer,
        expected,
        xp,
      };
      return { ...d, attempts: [...d.attempts, event] };
    });
  };
  const addCard = (id: string) =>
    update((d) => {
      if (d.cards.some((c) => c.wordId === id)) {
        setToast("Esta palabra ya está en tus tarjetas.");
        return d;
      }
      if (![...vocabulary, ...d.customWords].some((w) => w.id === id)) return d;
      setToast("Palabra añadida a tus tarjetas.");
      return {
        ...d,
        cards: [
          ...d.cards,
          { wordId: id, box: 0, due: new Date().toISOString(), history: [] },
        ],
      };
    });
  if (!data)
    return (
      <div className="boot">
        <div className="brand-symbol" />
        {error || "Abriendo tu espacio de alemán…"}
      </div>
    );
  return (
    <State.Provider
      value={{
        data,
        update,
        flush: () => queue.current,
        record,
        addCard,
        notice: setToast,
      }}
    >
      {error && (
        <div className="storage-error" role="alert">
          {error}
          <button onClick={() => setError("")}>Cerrar aviso</button>
        </div>
      )}
      {children}
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </State.Provider>
  );
}
export function useApp() {
  const value = useContext(State);
  if (!value) throw new Error("Falta Provider");
  return value;
}
export { initialData };
