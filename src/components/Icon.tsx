import type { CSSProperties } from "react";
const paths: Record<string, string> = {
  sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5",
  book: "M3 4h6a4 4 0 0 1 3 2 4 4 0 0 1 3-2h6v15h-6a4 4 0 0 0-3 2 4 4 0 0 0-3-2H3V4m9 2v15",
  cards: "M6 3h14v17H6V3M3 6v16h14",
  audio: "M4 10v4h4l5 4V6l-5 4H4m12-3a7 7 0 0 1 0 10m3-13a11 11 0 0 1 0 16",
  edit: "m4 16-1 5 5-1L21 7l-4-4L4 16m10-10 4 4",
  grammar: "M3 5h18M7 5l5 15 5-15M8 14h8",
  order: "M3 5h12m-12 7h18M3 19h8m7-3 3 3-3 3",
  music:
    "M9 18V5l12-2v13M9 5l12-2M9 18a3 3 0 1 1-3-3c1.7 0 3 1.3 3 3m12-2a3 3 0 1 1-3-3c1.7 0 3 1.3 3 3",
  chart: "M4 3v18h18M8 17v-5m5 5V7m5 10v-8",
  settings:
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1 1-3",
  arrow: "M4 12h16m-6-6 6 6-6 6",
  check: "m5 12 4 4L20 5",
  play: "m8 5 11 7-11 7V5",
  close: "m6 6 12 12M6 18 18 6",
  plus: "M12 4v16M4 12h16",
  chevron: "m9 5 7 7-7 7",
  moon: "M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10",
  download: "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5",
  flame:
    "M12 2c2 5 6 6 6 12a6 6 0 1 1-12 0c0-2 1-4 3-6 0 4 2 5 3 5 2-3 0-6 0-11",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m0 4v6l4 2",
  menu: "M3 5h18M3 12h18M3 19h18",
  info: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m0 7v7m0-10v.1",
  refresh: "M20 8a9 9 0 1 0 1 7M20 3v5h-5",
};
export function Icon({
  name,
  size = 20,
  style,
}: {
  name: string;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      <path d={paths[name] ?? paths.book} />
    </svg>
  );
}
