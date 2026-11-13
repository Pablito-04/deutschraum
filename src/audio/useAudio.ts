import { useEffect, useState } from "react";
export function useAudio(preferred = "", rate = 0.85) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [error, setError] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [active, setActive] = useState(-1);
  const supported =
    typeof window !== "undefined" && "speechSynthesis" in window;
  useEffect(() => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    const refresh = () =>
      setVoices(
        synth
          .getVoices()
          .filter((v) => /^de(-|_)/i.test(v.lang) || v.lang === "de")
          .sort((a, b) => Number(b.localService) - Number(a.localService)),
      );
    refresh();
    synth.addEventListener("voiceschanged", refresh);
    return () => {
      synth.removeEventListener("voiceschanged", refresh);
      synth.cancel();
    };
  }, [supported]);
  const stop = () => {
    if (supported) window.speechSynthesis.cancel();
    setSpeaking(false);
    setActive(-1);
  };
  const speak = (
    text: string | string[],
    onLine?: (index: number) => void,
    onComplete?: () => void,
  ) => {
    setError("");
    if (!supported) {
      setError(
        "Este navegador no ofrece síntesis de voz. Puedes seguir con el curso escrito.",
      );
      return;
    }
    const available = window.speechSynthesis
      .getVoices()
      .filter((v) => /^de[-_]/i.test(v.lang) || v.lang === "de");
    const voice =
      available.find((v) => v.voiceURI === preferred) ||
      available.find((v) => v.localService) ||
      available[0];
    if (!voice) {
      setError(
        "No hay una voz alemana disponible. Instala una voz de alemán en tu dispositivo o prueba otro navegador.",
      );
      return;
    }
    window.speechSynthesis.cancel();
    const lines = Array.isArray(text) ? text : [text];
    lines.forEach((line, index) => {
      const u = new SpeechSynthesisUtterance(line);
      u.voice = voice;
      u.lang = "de-DE";
      u.rate = rate;
      u.onstart = () => {
        setSpeaking(true);
        setActive(index);
        onLine?.(index);
      };
      u.onend = () => {
        if (index === lines.length - 1) {
          setSpeaking(false);
          setActive(-1);
          onComplete?.();
        }
      };
      u.onerror = (e) => {
        if (e.error !== "interrupted" && e.error !== "canceled")
          setError(`No se ha podido reproducir el audio (${e.error}).`);
        setSpeaking(false);
        setActive(-1);
      };
      window.speechSynthesis.speak(u);
    });
  };
  return { voices, error, speaking, active, supported, speak, stop };
}
