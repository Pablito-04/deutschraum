import type { Expression } from "./types";
const raw = `Wie geht's?|¿Cómo va?|¿Cómo estás?|Saludo entre conocidos|informal|Hallo Anna, wie geht's?
Alles klar?|¿Todo claro?|¿Todo bien? / ¿Entendido?|Comprobar bienestar o comprensión|informal|Alles klar? Ja, danke.
Kein Problem.|Ningún problema.|No hay problema.|Aceptar una petición|neutro|Kein Problem, ich helfe dir.
Das macht nichts.|Eso no hace nada.|No pasa nada.|Quitar importancia a un error|neutro|Du bist spät? Das macht nichts.
Es tut mir leid.|Me causa pena.|Lo siento.|Disculparse o expresar empatía|neutro|Es tut mir leid, ich kann nicht kommen.
Keine Ahnung.|Ninguna idea.|No lo sé.|Admitir desconocimiento|informal|Wo ist Ben? Keine Ahnung.
Mal sehen.|Ver una vez.|Ya veremos.|No decidir todavía|informal|Kommst du morgen? Mal sehen.
Na klar!|¡Pues claro!|¡Claro que sí!|Aceptar con disposición|informal|Hilfst du mir? Na klar!
Ach so!|¡Ah, así!|¡Ah, entiendo!|Reaccionar a una explicación|informal|Halb acht ist sieben dreißig. Ach so!
Wie bitte?|¿Cómo, por favor?|¿Perdón? ¿Puedes repetir?|Pedir repetición|neutro|Wie bitte? Ich verstehe Sie nicht.
Noch einmal, bitte.|Una vez más, por favor.|Repítelo, por favor.|Pedir repetición|neutro|Noch einmal, bitte. Langsamer.
Guten Appetit!|¡Buen apetito!|¡Que aproveche!|Antes de comer|neutro|Die Suppe ist fertig. Guten Appetit!
Zum Wohl!|¡Al bienestar!|¡Salud! (brindis)|Brindar|neutro|Zum Wohl! Auf dich!
Gesundheit!|¡Salud!|¡Salud! (estornudo)|Después de un estornudo|neutro|Gesundheit! Danke.
Gute Besserung!|¡Buena mejoría!|¡Que te mejores!|Ante una enfermedad|neutro|Du bist krank? Gute Besserung!
Viel Spaß!|¡Mucha diversión!|¡Que te diviertas!|Desear que disfruten una actividad|neutro|Ihr geht ins Kino? Viel Spaß!
Viel Glück!|¡Mucha suerte!|¡Buena suerte!|Desear éxito|neutro|Viel Glück bei der Prüfung!
Bis gleich!|¡Hasta enseguida!|¡Hasta ahora!|Reencuentro en poco tiempo|neutro|Ich komme in fünf Minuten. Bis gleich!
Bis später!|¡Hasta más tarde!|¡Hasta luego!|Despedida el mismo día|neutro|Ich gehe jetzt. Bis später!
Schönen Tag noch!|¡Bonito día todavía!|¡Que tengas buen día!|Despedirse en una tienda|neutro|Danke. Schönen Tag noch!
Schönes Wochenende!|¡Bonito fin de semana!|¡Buen fin de semana!|Despedida el viernes|neutro|Bis Montag. Schönes Wochenende!
Stimmt so.|Así es correcto.|Quédese con el cambio.|Al pagar con propina|neutro|Hier sind zehn Euro. Stimmt so.
Zusammen oder getrennt?|¿Juntos o separados?|¿Pagan juntos o por separado?|Restauración|neutro|Die Rechnung, bitte. Zusammen oder getrennt?
Ich hätte gern …|Yo tendría con gusto…|Querría…|Pedir cortésmente|neutro|Ich hätte gern einen Tee.
Das passt.|Eso encaja.|Me viene bien.|Aceptar una hora o propuesta|neutro|Um sechs? Das passt.
Ich bin dran.|Estoy en ello.|Me toca.|Turnos|informal|Jetzt bin ich dran.
Du hast recht.|Tienes razón.|Tienes razón.|Mostrar acuerdo|neutro|Du hast recht, das ist besser.
Auf jeden Fall.|En cada caso.|Sin duda / en cualquier caso.|Afirmar con seguridad|neutro|Kommst du? Auf jeden Fall.
Mach's gut!|¡Hazlo bien!|¡Cuídate!|Despedida cercana|informal|Tschüss, Ben. Mach's gut!
Bis zum nächsten Mal!|¡Hasta la próxima vez!|¡Hasta la próxima!|Cerrar un encuentro|neutro|Danke und bis zum nächsten Mal!`;
export const expressions: Expression[] = raw.split("\n").map((row, i) => {
  const [de, literal, meaning, context, register, example] = row.split("|");
  return {
    id: `exp-${i + 1}`,
    de,
    literal,
    meaning,
    context,
    register,
    example,
  };
});
export const artists = [
  {
    name: "NENA",
    genre: "Pop / Neue Deutsche Welle",
    difficulty: "A1 con apoyo → A2",
    description:
      "Estribillos claros y repetición; empieza por reconocer palabras de un fragmento.",
    query: "NENA 99 Luftballons",
    url: "https://www.nena.de/",
  },
  {
    name: "Die Prinzen",
    genre: "Pop vocal",
    difficulty: "A2 con apoyo",
    description:
      "Voces definidas y juegos verbales. Trabaja una estrofa breve, sin intentar entenderlo todo.",
    query: "Die Prinzen",
    url: "https://www.dieprinzen.de/",
  },
  {
    name: "AnnenMayKantereit",
    genre: "Pop / rock",
    difficulty: "A2 → B1",
    description:
      "Canciones narrativas y voz muy característica. El alemán cantado puede reducir sonidos.",
    query: "AnnenMayKantereit",
    url: "https://www.annenmaykantereit.com/",
  },
  {
    name: "Wir sind Helden",
    genre: "Indie pop",
    difficulty: "B1 con apoyo",
    description:
      "Textos con metáforas y sintaxis más compleja; opción para explorar, fuera del núcleo A1.",
    query: "Wir sind Helden",
    url: "https://www.wirsindhelden.com/",
  },
];
