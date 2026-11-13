import type { Word } from "./types";
// Palabras funcionales, calendario y expresiones de alta utilidad que atraviesan temas.
const raw = `u02|expresión|alle|todos|Alle sind hier.|Todos están aquí.
u02|expresión|allein|solo (sin compañía)|Ich wohne allein.|Vivo solo.
u02|expresión|nur|solo; solamente|Ich spreche nur ein bisschen Deutsch.|Solo hablo un poco de alemán.
u02|pronombre|jemand|alguien|Ist jemand hier?|¿Hay alguien aquí?
u02|pronombre|niemand|nadie|Niemand ist zu Hause.|No hay nadie en casa.
u02|interrogativo|wer|quién|Wer ist das?|¿Quién es?
u03|interrogativo|was|qué|Was ist das?|¿Qué es eso?
u03|interrogativo|wie viel|cuánto|Wie viel kostet das?|¿Cuánto cuesta?
u03|interrogativo|wie viele|cuántos|Wie viele Kinder hast du?|¿Cuántos hijos tienes?
u03|número|einundzwanzig|veintiuno|Ich bin einundzwanzig Jahre alt.|Tengo veintiún años.
u03|expresión|geboren|nacido|Ich bin in Madrid geboren.|Nací en Madrid.
u04|adjetivo|freundlich|amable|Meine Nachbarin ist freundlich.|Mi vecina es amable.
u04|expresión|beide|ambos|Beide Kinder sind hier.|Los dos niños están aquí.
u04|adjetivo|verwandt|emparentado|Wir sind verwandt.|Somos parientes.
u05|interrogativo|wann|cuándo|Wann arbeitest du?|¿Cuándo trabajas?
u05|interrogativo|warum|por qué|Warum lernst du Deutsch?|¿Por qué estudias alemán?
u05|expresión|lange|durante mucho tiempo|Am Sonntag schlafe ich lange.|El domingo duermo hasta tarde.
u05|expresión|schnell|rápido|Er spricht sehr schnell.|Habla muy rápido.
u05|expresión|schwer|pesado; difícil|Mein Koffer ist schwer.|Mi maleta pesa mucho.
u06|expresión|etwas|algo|Ich möchte etwas trinken.|Querría beber algo.
u06|expresión|genug|suficiente|Ich habe genug Wasser.|Tengo suficiente agua.
u06|expresión|getrennt|por separado|Wir zahlen getrennt.|Pagamos por separado.
u06|expresión|ohne|sin|Einen Kaffee ohne Milch, bitte.|Un café sin leche, por favor.
u07|negación|nicht|no (negación)|Das Brot ist nicht frisch.|El pan no está fresco.
u07|negación|kein|ningún; no (ante sustantivo)|Ich habe kein Brot.|No tengo pan.
u07|pronombre|nichts|nada|Ich brauche nichts.|No necesito nada.
u07|expresión|alles|todo|Das ist alles, danke.|Eso es todo, gracias.
u07|expresión|pro|por (unidad)|Das kostet zwei Euro pro Kilo.|Cuesta dos euros el kilo.
u08|preposición|auf|en; encima de|Das Buch liegt auf dem Tisch.|El libro está en la mesa.
u08|preposición|unter|debajo de|Die Tasche ist unter dem Tisch.|El bolso está debajo de la mesa.
u08|preposición|zwischen|entre|Die Lampe steht zwischen den Betten.|La lámpara está entre las camas.
u08|adjetivo|sauber|limpio|Das Bad ist sauber.|El baño está limpio.
u08|adjetivo|bequem|cómodo|Das Bett ist bequem.|La cama es cómoda.
u08|adjetivo|offen|abierto|Das Fenster ist offen.|La ventana está abierta.
u09|preposición|mit|con; en (medio)|Ich fahre mit dem Bus.|Voy en autobús.
u09|preposición|nach|a (destino); después de|Ich fahre nach Berlin.|Voy a Berlín.
u09|preposición|zu|a; hacia|Ich gehe zu meiner Mutter.|Voy a casa de mi madre.
u09|preposición|von|de (procedencia/autor)|Das Geschenk ist von Ben.|El regalo es de Ben.
u09|preposición|bei|en casa de; junto a|Ich bin bei meiner Oma.|Estoy en casa de mi abuela.
u09|preposición|durch|a través de; por|Wir gehen durch den Park.|Cruzamos el parque a pie.
u09|preposición|über|por encima de; sobre|Wir gehen über die Brücke.|Cruzamos el puente.
u09|interrogativo|wohin|adónde|Wohin fährst du?|¿Adónde vas?
u10|adjetivo|möglich|posible|Ist das möglich?|¿Es posible?
u10|adjetivo|leicht|fácil; ligero|Die Aufgabe ist leicht.|La tarea es fácil.
u11|expresión|lieber nicht|mejor no|Heute lieber nicht.|Hoy mejor no.
u11|expresión|gute Idee|buena idea|Das ist eine gute Idee.|Es una buena idea.
u12|expresión|am|el; por (día/parte del día)|Am Montag arbeite ich.|El lunes trabajo.
u12|expresión|im|en el (in dem)|Im Winter ist es kalt.|En invierno hace frío.
u12|expresión|ab|a partir de|Ab Dienstag bin ich wieder da.|A partir del martes vuelvo a estar.
u12|expresión|von … bis|de … a; desde … hasta|Ich arbeite von neun bis fünf Uhr.|Trabajo de nueve a cinco.
u12|expresión|viertel vor|menos cuarto|Es ist Viertel vor acht.|Son las ocho menos cuarto.
u12|expresión|viertel nach|y cuarto|Es ist Viertel nach acht.|Son las ocho y cuarto.
u12|expresión|Januar|enero|Im Januar ist es kalt.|En enero hace frío.
u12|expresión|Februar|febrero|Im Februar habe ich Urlaub.|En febrero tengo vacaciones.
u12|expresión|März|marzo|Im März besuche ich Berlin.|En marzo visito Berlín.
u12|expresión|April|abril|Im April komme ich zurück.|En abril vuelvo.
u12|expresión|Mai|mayo|Im Mai ist das Wetter schön.|En mayo hace buen tiempo.
u12|expresión|Juni|junio|Im Juni fahren wir ans Meer.|En junio vamos al mar.
u12|expresión|Juli|julio|Im Juli ist es warm.|En julio hace calor.
u12|expresión|August|agosto|Im August habe ich frei.|En agosto tengo libre.
u12|expresión|September|septiembre|Im September beginnt der Kurs.|El curso empieza en septiembre.
u12|expresión|Oktober|octubre|Im Oktober regnet es oft.|En octubre llueve a menudo.
u12|expresión|November|noviembre|Im November ist es kühl.|En noviembre refresca.
u12|expresión|Dezember|diciembre|Im Dezember besuchen wir Oma.|En diciembre visitamos a la abuela.
u13|expresión|dabei|encima; consigo|Ich habe meinen Ausweis dabei.|Llevo mi documento de identidad.
u13|expresión|direkt|directo; directamente|Der Zug fährt direkt.|El tren es directo.
u14|pronombre|ihm|a él (dativo)|Ich helfe ihm.|Le ayudo a él.
u14|pronombre|ihnen|a ellos (dativo)|Ich helfe ihnen.|Les ayudo.
u15|pronombre|mich|me; a mí (acusativo)|Sie sieht mich.|Ella me ve.
u15|pronombre|euch|os; a vosotros|Ich sehe euch.|Os veo.
u16|expresión|drinnen|dentro|Heute spielen wir drinnen.|Hoy jugamos dentro.
u16|adjetivo|hoch|alto|Der Berg ist hoch.|La montaña es alta.
u17|expresión|vor kurzem|hace poco|Vor kurzem habe ich Ben gesehen.|Hace poco vi a Ben.
u17|expresión|endlich|por fin|Endlich habe ich Zeit.|Por fin tengo tiempo.
u18|expresión|zu früh|demasiado pronto|Ich bin zu früh angekommen.|He llegado demasiado pronto.
u18|expresión|zu Besuch|de visita|Meine Eltern sind zu Besuch.|Mis padres están de visita.
u19|expresión|auf jeden Fall|sin duda|Ich komme auf jeden Fall.|Voy sin duda.
u19|expresión|vielen Dank|muchas gracias|Vielen Dank für deine Nachricht.|Muchas gracias por tu mensaje.
u20|expresión|im Moment|en este momento|Im Moment habe ich keine Zeit.|En este momento no tengo tiempo.
u20|expresión|Schritt für Schritt|paso a paso|Ich lerne Schritt für Schritt.|Aprendo paso a paso.`;
const months: Record<string, string> = {
  Januar: "Januare",
  Februar: "Februare",
  März: "Märze",
  April: "Aprile",
  Mai: "Maie",
  Juni: "Junis",
  Juli: "Julis",
  August: "Auguste",
  September: "September",
  Oktober: "Oktober",
  November: "November",
  Dezember: "Dezember",
};
export const functionalWords: Word[] = raw.split("\n").map((row) => {
  const [unit, pos, de, es, example, translation] = row.split("|");
  return {
    id: `${unit}-f-${de.toLocaleLowerCase("de").replace(/[^\p{L}\p{N}]+/gu, "-")}`,
    unit,
    pos: months[de] ? "sustantivo" : pos,
    de: months[de] ? `der ${de}` : de,
    es,
    article: months[de] ? "der" : undefined,
    gender: months[de] ? "masculino" : undefined,
    plural: months[de]
      ? `${months[de]} (poco habitual; en fechas se usa singular)`
      : undefined,
    example,
    translation,
    level: Number(unit.slice(1)) <= 3 ? "A0" : "A1",
    aliases: [],
    related: [`${unit}-grammar`],
  };
});
