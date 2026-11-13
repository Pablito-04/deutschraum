import { useMemo, useState } from "react";
import { dictionary, dictionaryIndex, lookupKey, type Word } from "../content";
import { useApp } from "../app/context";
import { AudioButton } from "./common";
import { Icon } from "./Icon";
// Consulta cerrada: muestra las formas del diccionario, sin inferir significados.
export function WordSentence({ text }: { text: string }) {
  const { data, addCard } = useApp();
  const custom = useMemo(
    () => dictionaryIndex(data.customWords),
    [data.customWords],
  );
  const [selected, setSelected] = useState<Word[]>([]);
  const [unknown, setUnknown] = useState("");
  const lookup = (token: string) => {
    const key = lookupKey(token);
    const entries = [
      ...(dictionary.get(key) ?? []),
      ...(custom.get(key) ?? []),
    ];
    setSelected(entries);
    setUnknown(entries.length ? "" : token);
  };
  return (
    <div className="clickable-sentence">
      <p lang="de">
        {text.split(/(\s+)/).map((t, i) =>
          /\p{L}/u.test(t) ? (
            <button className="inline-word" key={i} onClick={() => lookup(t)}>
              {t}
            </button>
          ) : (
            t
          ),
        )}
      </p>
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
          {unknown ? (
            <p>
              No hay una entrada exacta para «{unknown}». Consulta el
              significado de la frase o la regla.
            </p>
          ) : (
            <>
              {selected.length > 1 && (
                <p className="small">
                  Hay varias entradas posibles; elige según el contexto.
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
          )}
        </aside>
      )}
    </div>
  );
}
