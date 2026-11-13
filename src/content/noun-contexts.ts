// Ejemplos propios para los sustantivos concretos; no se generan frases aleatorias.
const raw = `das Buch|Ich lese ein Buch.|Leo un libro.
die Zeitung|Mein Vater liest die Zeitung.|Mi padre lee el periódico.
die Speisekarte|Haben Sie eine Speisekarte?|¿Tiene una carta?
der Tisch|Der Tisch ist für zwei Personen.|La mesa es para dos personas.
das Glas|Das Glas ist leer.|El vaso está vacío.
die Tasse|Meine Tasse ist weiß.|Mi taza es blanca.
der Teller|Die Suppe ist auf dem Teller.|La sopa está en el plato.
der Löffel|Ich brauche einen Löffel für die Suppe.|Necesito una cuchara para la sopa.
die Gabel|Die Gabel liegt neben dem Teller.|El tenedor está al lado del plato.
das Messer|Das Messer liegt auf dem Tisch.|El cuchillo está en la mesa.
das Restaurant|Das Restaurant ist heute geschlossen.|El restaurante está cerrado hoy.
das Café|Wir treffen uns im Café.|Quedamos en la cafetería.
der Markt|Am Samstag gehe ich auf den Markt.|El sábado voy al mercado.
der Supermarkt|Der Supermarkt öffnet um acht Uhr.|El supermercado abre a las ocho.
der Laden|Der Laden ist klein.|La tienda es pequeña.
die Kasse|Ich bezahle an der Kasse.|Pago en la caja.
die Flasche|Ich kaufe eine Flasche Wasser.|Compro una botella de agua.
die Tüte|Brauchen Sie eine Tüte?|¿Necesita una bolsa?
die Wohnung|Meine Wohnung hat zwei Zimmer.|Mi piso tiene dos habitaciones.
das Haus|Das Haus hat einen Garten.|La casa tiene un jardín.
das Zimmer|Das Zimmer ist hell.|La habitación es luminosa.
die Küche|Wir kochen in der Küche.|Cocinamos en la cocina.
das Bad|Das Bad ist neben der Küche.|El baño está junto a la cocina.
das Wohnzimmer|Im Wohnzimmer steht ein Sofa.|En el salón hay un sofá.
das Schlafzimmer|Das Schlafzimmer ist ruhig.|El dormitorio es tranquilo.
das Kinderzimmer|Mia spielt im Kinderzimmer.|Mia juega en la habitación infantil.
der Flur|Die Schuhe stehen im Flur.|Los zapatos están en el pasillo.
der Balkon|Wir frühstücken auf dem Balkon.|Desayunamos en el balcón.
der Garten|Die Kinder spielen im Garten.|Los niños juegan en el jardín.
die Tür|Bitte schließen Sie die Tür.|Cierre la puerta, por favor.
das Fenster|Das Fenster ist offen.|La ventana está abierta.
die Wand|Die Wand ist weiß.|La pared es blanca.
der Boden|Der Boden ist sauber.|El suelo está limpio.
das Dach|Das Dach ist rot.|El tejado es rojo.
die Treppe|Ich nehme die Treppe.|Voy por la escalera.
der Aufzug|Der Aufzug ist kaputt.|El ascensor está estropeado.
das Bett|Das Bett ist sehr bequem.|La cama es muy cómoda.
der Stuhl|Der Stuhl steht am Tisch.|La silla está junto a la mesa.
das Sofa|Wir sitzen auf dem Sofa.|Estamos sentados en el sofá.
der Schrank|Meine Kleidung ist im Schrank.|Mi ropa está en el armario.
das Regal|Die Bücher stehen im Regal.|Los libros están en la estantería.
die Lampe|Die Lampe ist an.|La lámpara está encendida.
der Schlüssel|Mein Schlüssel ist in der Tasche.|Mi llave está en el bolso.
die Dusche|Die Dusche ist im Bad.|La ducha está en el baño.
die Toilette|Entschuldigung, wo ist die Toilette?|Disculpe, ¿dónde está el aseo?
der Kühlschrank|Die Milch ist im Kühlschrank.|La leche está en el frigorífico.
die Waschmaschine|Die Waschmaschine steht im Bad.|La lavadora está en el baño.
der Bahnhof|Der Bahnhof ist nicht weit.|La estación no está lejos.
die Haltestelle|An der Haltestelle warten viele Leute.|En la parada espera mucha gente.
der Bus|Der Bus fährt alle zehn Minuten.|El autobús pasa cada diez minutos.
die Straßenbahn|Wir fahren mit der Straßenbahn.|Vamos en tranvía.
die U-Bahn|Die U-Bahn fährt zum Bahnhof.|El metro va a la estación.
die S-Bahn|Ich nehme die S-Bahn zum Flughafen.|Voy al aeropuerto en cercanías.
der Zug|Der Zug kommt pünktlich an.|El tren llega puntual.
das Auto|Unser Auto ist blau.|Nuestro coche es azul.
das Fahrrad|Ich fahre mit dem Fahrrad zur Arbeit.|Voy al trabajo en bicicleta.
die Straße|Die Straße ist sehr lang.|La calle es muy larga.
der Weg|Können Sie mir den Weg zeigen?|¿Puede indicarme el camino?
die Kreuzung|Biegen Sie an der Kreuzung rechts ab.|Gire a la derecha en el cruce.
die Ampel|Die Ampel ist rot.|El semáforo está en rojo.
die Brücke|Wir gehen über die Brücke.|Cruzamos el puente a pie.
der Platz|Ist dieser Platz noch frei?|¿Sigue libre este sitio?
der Park|Im Park spielen Kinder.|En el parque juegan niños.
das Museum|Das Museum ist am Montag geschlossen.|El museo está cerrado el lunes.
die Apotheke|Die Apotheke ist neben dem Supermarkt.|La farmacia está junto al supermercado.
das Rathaus|Das Rathaus ist am Marktplatz.|El ayuntamiento está en la plaza del mercado.
der Parkplatz|Hier gibt es keinen Parkplatz.|Aquí no hay aparcamiento.
der Eingang|Der Eingang ist auf der linken Seite.|La entrada está en el lado izquierdo.
der Ausgang|Der Ausgang ist dort rechts.|La salida está allí a la derecha.
der Arbeitsplatz|Mein Arbeitsplatz ist im Büro.|Mi puesto de trabajo está en la oficina.
das Büro|Das Büro ist im zweiten Stock.|La oficina está en la segunda planta.
die Firma|Die Firma hat zwanzig Mitarbeiter.|La empresa tiene veinte empleados.
der Chef|Mein Chef kommt um neun Uhr.|Mi jefe llega a las nueve.
die Chefin|Meine Chefin spricht Deutsch und Englisch.|Mi jefa habla alemán e inglés.
der Kollege|Mein Kollege hilft mir.|Mi compañero de trabajo me ayuda.
die Kollegin|Meine Kollegin arbeitet heute nicht.|Mi compañera no trabaja hoy.
der Lehrer|Der Lehrer erklärt die Aufgabe.|El profesor explica la tarea.
die Lehrerin|Meine Lehrerin heißt Frau Klein.|Mi profesora se llama señora Klein.
der Arzt|Ich habe einen Termin beim Arzt.|Tengo una cita con el médico.
die Ärztin|Die Ärztin ist sehr freundlich.|La médica es muy amable.
der Verkäufer|Der Verkäufer zeigt mir die Jacke.|El vendedor me enseña la chaqueta.
die Verkäuferin|Die Verkäuferin arbeitet an der Kasse.|La vendedora trabaja en la caja.
der Student|Leo ist Student.|Leo es estudiante universitario.
die Studentin|Anna ist Studentin.|Anna es estudiante universitaria.
die Schule|Mia geht in die Schule.|Mia va al colegio.
die Universität|Die Universität ist in der Stadt.|La universidad está en la ciudad.
der Kurs|Mein Kurs beginnt um neun Uhr.|Mi curso empieza a las nueve.
die Aufgabe|Diese Aufgabe ist einfach.|Esta tarea es sencilla.
die Übung|Wir machen eine Übung zusammen.|Hacemos un ejercicio juntos.
der Computer|Mein Computer funktioniert nicht.|Mi ordenador no funciona.
das Handy|Bitte schalten Sie Ihr Handy aus.|Apague el móvil, por favor.
der Stift|Kannst du mir einen Stift geben?|¿Puedes darme un bolígrafo?
das Kino|Heute gehen wir ins Kino.|Hoy vamos al cine.
der Film|Der Film beginnt um acht Uhr.|La película empieza a las ocho.
das Theater|Das Theater ist neben dem Museum.|El teatro está junto al museo.
das Konzert|Das Konzert war sehr schön.|El concierto estuvo muy bien.
die Gitarre|Ben spielt Gitarre.|Ben toca la guitarra.
das Klavier|Sara spielt gern Klavier.|A Sara le gusta tocar el piano.
das Spiel|Das Spiel fängt um drei Uhr an.|El partido empieza a las tres.
die Mannschaft|Unsere Mannschaft spielt heute.|Nuestro equipo juega hoy.
das Fest|Das Fest ist am Samstag.|La fiesta es el sábado.
die Party|Kommst du zu meiner Party?|¿Vienes a mi fiesta?
der Kalender|Der Termin steht im Kalender.|La cita está apuntada en el calendario.
der Wecker|Mein Wecker klingelt um sechs Uhr.|Mi despertador suena a las seis.
die Fahrkarte|Ich brauche eine Fahrkarte nach Hamburg.|Necesito un billete a Hamburgo.
das Ticket|Das Ticket kostet zwanzig Euro.|El billete cuesta veinte euros.
der Fahrplan|Die Zeiten stehen im Fahrplan.|Las horas aparecen en el horario.
der Bahnsteig|Wir warten auf dem Bahnsteig.|Esperamos en el andén.
der Flughafen|Der Flughafen ist außerhalb der Stadt.|El aeropuerto está fuera de la ciudad.
das Flugzeug|Das Flugzeug startet um zehn Uhr.|El avión despega a las diez.
der Koffer|Mein Koffer ist schwer.|Mi maleta pesa mucho.
der Reisepass|Hier ist mein Reisepass.|Aquí está mi pasaporte.
der Ausweis|Zeigen Sie bitte Ihren Ausweis.|Muestre su documento de identidad, por favor.
das Hotel|Unser Hotel ist direkt am Meer.|Nuestro hotel está junto al mar.
die Rezeption|Fragen Sie an der Rezeption.|Pregunte en recepción.
das Einzelzimmer|Ich möchte ein Einzelzimmer reservieren.|Querría reservar una habitación individual.
das Doppelzimmer|Wir brauchen ein Doppelzimmer für zwei Nächte.|Necesitamos una habitación doble para dos noches.
die Praxis|Die Praxis öffnet um acht Uhr.|La consulta abre a las ocho.
das Krankenhaus|Meine Mutter arbeitet im Krankenhaus.|Mi madre trabaja en el hospital.
die Gesundheitskarte|Bringen Sie bitte Ihre Gesundheitskarte mit.|Traiga su tarjeta sanitaria, por favor.
die Jacke|Die Jacke gefällt mir.|Me gusta la chaqueta.
der Mantel|Der Mantel ist warm.|El abrigo abriga.
die Hose|Die Hose ist zu groß.|El pantalón es demasiado grande.
das Kleid|Das Kleid ist blau.|El vestido es azul.
der Rock|Ich suche einen schwarzen Rock.|Busco una falda negra.
das Hemd|Das Hemd passt gut.|La camisa queda bien.
die Bluse|Die Bluse kostet dreißig Euro.|La blusa cuesta treinta euros.
das T-Shirt|Ich trage heute ein weißes T-Shirt.|Hoy llevo una camiseta blanca.
der Pullover|Der Pullover ist zu klein.|El jersey es demasiado pequeño.
der Schuh|Dieser Schuh passt nicht.|Este zapato no queda bien.
die Socke|Eine Socke fehlt.|Falta un calcetín.
der Hut|Der Hut ist braun.|El sombrero es marrón.
die Mütze|Im Winter trage ich eine Mütze.|En invierno llevo gorro.
der Schal|Mein Schal ist rot.|Mi bufanda es roja.
die Tasche|Meine Tasche liegt auf dem Stuhl.|Mi bolso está en la silla.
die Umkleide|Die Umkleide ist dort hinten.|El probador está allí al fondo.
die Weste|Die Weste ist warm und leicht.|El chaleco es cálido y ligero.
der Strand|Wir gehen am Strand spazieren.|Paseamos por la playa.
der Wald|Am Sonntag gehen wir in den Wald.|El domingo vamos al bosque.
der Baum|Der Baum steht im Garten.|El árbol está en el jardín.
die Blume|Die Blume ist gelb.|La flor es amarilla.
der Regenschirm|Nimm deinen Regenschirm mit!|¡Llévate tu paraguas!
das Foto|Auf dem Foto ist meine Familie.|En la foto está mi familia.
das Bild|Das Bild hängt an der Wand.|El cuadro está colgado en la pared.
das Geschenk|Das Geschenk ist für dich.|El regalo es para ti.
der Hafen|Wir sind zum Hafen gegangen.|Fuimos al puerto.
die Altstadt|Die Altstadt ist sehr schön.|El casco antiguo es muy bonito.
die Kirche|Die Kirche steht neben dem Rathaus.|La iglesia está junto al ayuntamiento.
das Schloss|Wir haben ein Schloss besucht.|Visitamos un castillo.
die Insel|Wir fahren mit dem Schiff zur Insel.|Vamos a la isla en barco.
das Dorf|Meine Oma wohnt in einem Dorf.|Mi abuela vive en un pueblo.
der Fluss|Der Fluss fließt durch die Stadt.|El río atraviesa la ciudad.
der Briefkasten|Der Briefkasten ist neben der Tür.|El buzón está al lado de la puerta.
die Briefmarke|Ich brauche eine Briefmarke für den Brief.|Necesito un sello para la carta.
der Umschlag|Die Adresse steht auf dem Umschlag.|La dirección está en el sobre.
das Telefon|Das Telefon klingelt.|El teléfono suena.
der Treffpunkt|Unser Treffpunkt ist vor dem Kino.|Nuestro punto de encuentro es delante del cine.
das Formular|Bitte füllen Sie das Formular aus.|Rellene el formulario, por favor.
das Amt|Das Amt ist heute geschlossen.|La oficina pública está cerrada hoy.
der Schalter|Die Fahrkarten gibt es am Schalter.|Los billetes se venden en la ventanilla.
das Fundbüro|Fragen Sie im Fundbüro nach Ihrem Schlüssel.|Pregunte por su llave en objetos perdidos.
die Kreditkarte|Kann ich mit Kreditkarte bezahlen?|¿Puedo pagar con tarjeta de crédito?`;
export const nounContexts: Record<
  string,
  { example: string; translation: string }
> = Object.fromEntries(
  raw.split("\n").map((row) => {
    const [de, example, translation] = row.split("|");
    return [de, { example, translation }];
  }),
);
