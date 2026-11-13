import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAudio } from "../audio/useAudio";
import { useApp } from "../app/context";
import { units } from "../content";
import { Icon } from "./Icon";
export function PageHead({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-head">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </header>
  );
}
export function UnitFilter({
  value,
  onChange,
  all = true,
}: {
  value: string;
  onChange: (v: string) => void;
  all?: boolean;
}) {
  return (
    <label className="filter-label">
      Unidad
      <select
        aria-label="Filtrar por unidad"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {all && <option value="">Todas las unidades</option>}
        {units.map((u) => (
          <option key={u.id} value={u.id}>
            {String(u.number).padStart(2, "0")} · {u.title}
          </option>
        ))}
      </select>
    </label>
  );
}
export function AudioButton({
  text,
  small = false,
  label = "Escuchar",
}: {
  text: string;
  small?: boolean;
  label?: string;
}) {
  const { data } = useApp();
  const audio = useAudio(data.profile.voice, data.profile.rate);
  return (
    <span className="audio-wrap">
      <button
        type="button"
        className={small ? "icon-button" : "button secondary"}
        aria-label={label}
        onClick={() => (audio.speaking ? audio.stop() : audio.speak(text))}
      >
        <Icon name={audio.speaking ? "close" : "audio"} />
        {!small && (audio.speaking ? "Detener" : label)}
      </button>
      {audio.error && (
        <span className="audio-error" role="status">
          {audio.error}
        </span>
      )}
    </span>
  );
}
export function SectionLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <Icon name="arrow" size={17} />
    </Link>
  );
}
export function Progress({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
    >
      <span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}
export function Empty({ children }: { children: ReactNode }) {
  return (
    <div className="empty">
      <Icon name="book" size={32} />
      <p>{children}</p>
    </div>
  );
}
export function Tabs({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="tabs" role="group" aria-label="Modo de práctica">
      {options.map((o) => (
        <button
          aria-pressed={value === o.id}
          className={value === o.id ? "active" : ""}
          key={o.id}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
export function Details({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="disclosure">
      <button
        className="text-link"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {title}
        <Icon name={open ? "close" : "plus"} size={16} />
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}
