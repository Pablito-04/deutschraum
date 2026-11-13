import type { Reading } from "./types";
const raw = `u01~Ein neuer Name~Dos personas se saludan por primera vez.~Diálogo
Hallo! Ich heiße Anna.~¡Hola! Me llamo Anna.
Hallo, Anna! Ich heiße Ben.~¡Hola, Anna! Me llamo Ben.
Wie bitte?~¿Cómo, perdona?
Ben. B-E-N.~Ben. B-E-N.
?¿Quién deletrea su nombre?~Ben~Anna~Nadie~Ben repite su nombre letra a letra: B-E-N.
?¿Qué necesita Anna?~Oír otra vez el nombre~Una dirección~Un café~Wie bitte? pide que se repita algo.
---
u01~Am Morgen~Un saludo al empezar el día.~Diálogo
Guten Morgen, Anna!~¡Buenos días, Anna!
Guten Morgen, Ben!~¡Buenos días, Ben!
Wie geht es dir?~¿Cómo estás?
Gut, danke. Und dir?~Bien, gracias. ¿Y tú?
Auch gut. Danke!~También bien. ¡Gracias!
?¿Cuándo se saludan?~Por la mañana~Por la noche~Al despedirse~Guten Morgen es el saludo de la mañana.
?¿Cómo se encuentra Anna?~Bien~Mal~No lo dice~Anna responde Gut, danke.
---
u01~Bis morgen!~Una despedida después de clase.~Diálogo
Auf Wiedersehen, Frau Klein!~¡Adiós, señora Klein!
Auf Wiedersehen, Anna!~¡Adiós, Anna!
Tschüss, Ben! Bis morgen!~¡Adiós, Ben! ¡Hasta mañana!
Bis morgen, Anna!~¡Hasta mañana, Anna!
?¿Qué trato recibe Frau Klein?~Formal~Familiar con du~No hay saludo~Se usa Auf Wiedersehen y el apellido con Frau.
?¿Cuándo esperan verse Anna y Ben?~Mañana~Esta noche~El domingo~Bis morgen significa hasta mañana.
---
u02~Neu in Berlin~Anna conoce a un vecino.~Diálogo
Ich bin Anna. Ich komme aus Spanien.~Soy Anna. Vengo de España.
Ich bin Ben. Ich komme aus Deutschland.~Soy Ben. Vengo de Alemania.
Wohnst du in Berlin?~¿Vives en Berlín?
Ja, ich wohne hier. Und du?~Sí, vivo aquí. ¿Y tú?
Ich wohne auch hier.~Yo también vivo aquí.
?¿De dónde viene Anna?~De España~De Alemania~De Berlín~Anna dice Ich komme aus Spanien.
?¿Qué tienen en común?~Viven en Berlín~Son españoles~Se llaman Ben~Ambos dicen que viven aquí, en Berlín.
---
u02~Im Deutschkurs~Dos estudiantes se presentan.~Diálogo
Hallo, ich heiße Sara. Wie heißt du?~Hola, me llamo Sara. ¿Cómo te llamas?
Ich heiße Leo. Ich bin aus Italien.~Me llamo Leo. Soy de Italia.
Sprichst du Deutsch?~¿Hablas alemán?
Ein bisschen. Ich lerne Deutsch.~Un poco. Estoy aprendiendo alemán.
Ich auch!~¡Yo también!
?¿Quién es de Italia?~Leo~Sara~Anna~Leo se presenta con Ich bin aus Italien.
?¿Qué hacen los dos?~Aprenden alemán~Enseñan italiano~Buscan una casa~Leo aprende alemán y Sara responde Ich auch.
---
u02~Ein kurzer Gruß~Una presentación por escrito.~Mensaje
Guten Tag! Mein Name ist Luis.~¡Buenos días! Mi nombre es Luis.
Ich komme aus Spanien.~Soy de España.
Jetzt wohne ich in Hamburg.~Ahora vivo en Hamburgo.
Ich spreche Spanisch und ein bisschen Deutsch.~Hablo español y un poco de alemán.
?¿Dónde vive Luis ahora?~En Hamburgo~En Madrid~En Berlín~Jetzt wohne ich in Hamburg indica su residencia actual.
?¿Qué idioma habla además de algo de alemán?~Español~Italiano~Francés~El texto dice Ich spreche Spanisch.
---
u03~Eine Nummer bitte~Anna da sus datos en clase.~Diálogo
Wie alt bist du, Anna?~¿Cuántos años tienes, Anna?
Ich bin zwanzig Jahre alt.~Tengo veinte años.
Und wie ist deine Telefonnummer?~¿Y cuál es tu número de teléfono?
Null eins sieben sechs, drei zwei vier, fünf sechs acht neun.~Cero uno siete seis, tres dos cuatro, cinco seis ocho nueve.
Danke! Ist das richtig: null eins sieben sechs?~¡Gracias! ¿Es correcto: cero uno siete seis?
Ja, richtig.~Sí, correcto.
?¿Cuántos años tiene Anna?~20~12~30~Dice zwanzig Jahre alt.
?¿Por qué se repiten cuatro números?~Para comprobarlos~Para decir la edad~Para dar un precio~La persona pregunta Ist das richtig? antes de repetir el inicio.
---
u03~Das Formular~Ben rellena una ficha.~Historia
Ben schreibt seinen Namen: Ben Weber.~Ben escribe su nombre: Ben Weber.
Er ist dreiundzwanzig Jahre alt.~Tiene veintitrés años.
Seine Adresse ist Gartenstraße zwölf.~Su dirección es Gartenstraße doce.
Die Postleitzahl ist eins null eins eins fünf.~El código postal es uno cero uno uno cinco.
?¿Qué número tiene la calle?~12~23~15~La dirección dice Gartenstraße zwölf.
?¿Qué representa 10115?~El código postal~La edad~El teléfono~Se introduce con Die Postleitzahl.
---
u03~Noch einmal, bitte~Sara necesita confirmar un dato.~Diálogo
Meine Nummer ist siebzehn.~Mi número es diecisiete.
Wie bitte? Siebzig?~¿Cómo? ¿Setenta?
Nein, siebzehn. Eins, sieben.~No, diecisiete. Uno, siete.
Ah, danke. Jetzt ist es klar.~Ah, gracias. Ahora está claro.
?¿Qué número es correcto?~17~70~7~La persona aclara eins, sieben: 17.
?¿Cómo resuelve la confusión?~Dice las cifras por separado~Cambia de número~Escribe una dirección~Repite Eins, sieben para distinguir siebzehn de siebzig.
---
u04~Ein Foto~Anna muestra una foto familiar.~Diálogo
Das ist meine Familie.~Esta es mi familia.
Ist das dein Bruder?~¿Es tu hermano?
Ja, er heißt Tom. Er ist achtzehn.~Sí, se llama Tom. Tiene dieciocho años.
Und das ist meine Schwester Eva. Sie hat zwei Kinder.~Y esta es mi hermana Eva. Tiene dos hijos.
?¿Cómo se llama el hermano?~Tom~Ben~Eva~Anna dice er heißt Tom.
?¿Quién tiene dos hijos?~Eva~Tom~Anna~La frase sobre Eva termina con Sie hat zwei Kinder.
---
u04~Sonntag bei Oma~Una reunión familiar.~Historia
Heute ist Sonntag. Ben ist bei seiner Oma.~Hoy es domingo. Ben está en casa de su abuela.
Sein Vater und seine Mutter sind auch da.~Su padre y su madre también están allí.
Sein Bruder wohnt in Hamburg. Er ist heute nicht da.~Su hermano vive en Hamburgo. Hoy no está.
Ben telefoniert mit ihm.~Ben habla con él por teléfono.
?¿Quién no está en la reunión?~El hermano~La madre~El padre~El hermano vive en Hamburgo y hoy no está.
?¿Cómo contacta Ben con su hermano?~Por teléfono~Por carta~En persona~Ben telefoniert mit ihm.
---
u04~Zwei Familien~Sara habla de su familia.~Mensaje
Meine Eltern wohnen in Madrid.~Mis padres viven en Madrid.
Ich wohne mit meiner Tochter in Berlin.~Vivo con mi hija en Berlín.
Meine Tochter heißt Mia und ist fünf Jahre alt.~Mi hija se llama Mia y tiene cinco años.
Wir haben auch einen Hund. Er heißt Max.~También tenemos un perro. Se llama Max.
?¿Con quién vive Sara?~Con su hija~Con sus padres~Sola~Dice Ich wohne mit meiner Tochter.
?¿Quién es Max?~El perro~El abuelo~El hermano~El texto presenta einen Hund y después su nombre.
---
u05~Ein ruhiger Morgen~La rutina de Anna.~Historia
Anna trinkt am Morgen Tee.~Anna toma té por la mañana.
Sie liest ein Buch und lernt Deutsch.~Lee un libro y estudia alemán.
Um neun Uhr arbeitet sie.~A las nueve trabaja.
Am Abend kocht sie zu Hause.~Por la tarde/noche cocina en casa.
?¿Qué bebe Anna por la mañana?~Té~Café~Leche~El texto dice trinkt am Morgen Tee.
?¿Cuándo empieza a trabajar?~A las nueve~A las siete~Por la noche~Um neun Uhr arbeitet sie.
---
u05~Jeden Tag?~Ben y Leo comparan rutinas.~Diálogo
Lernst du jeden Tag Deutsch?~¿Estudias alemán todos los días?
Ja, ich lerne am Abend. Und du?~Sí, estudio por la tarde/noche. ¿Y tú?
Ich lerne am Morgen. Am Abend bin ich müde.~Yo estudio por la mañana. Por la tarde/noche estoy cansado.
Am Sonntag lernen wir zusammen!~¡El domingo estudiamos juntos!
?¿Por qué Leo estudia por la mañana?~Por la noche está cansado~Trabaja de mañana~No tiene libro~Dice Am Abend bin ich müde.
?¿Qué planean para el domingo?~Estudiar juntos~Trabajar~Viajar~La última frase propone lernen wir zusammen.
---
u05~Zu Hause~Una tarde tranquila.~Historia
Es ist Samstag. Sara arbeitet heute nicht.~Es sábado. Sara no trabaja hoy.
Mia spielt. Sara hört Musik.~Mia juega. Sara escucha música.
Dann essen sie zusammen.~Después comen juntas.
Am Abend liest Sara. Mia schläft.~Por la noche Sara lee. Mia duerme.
?¿Trabaja Sara hoy?~No~Sí~Solo por la noche~El texto dice arbeitet heute nicht.
?¿Qué hace Mia mientras Sara lee?~Duerme~Escucha música~Cocina~La última frase dice Mia schläft.
---
u06~Im Café~Anna y Ben piden algo.~Diálogo
Guten Tag! Was möchten Sie?~¡Buenos días! ¿Qué desean?
Für mich einen Kaffee, bitte.~Para mí un café, por favor.
Und für mich einen Tee und ein Stück Kuchen.~Y para mí un té y un trozo de tarta.
Gern. Möchten Sie Milch zum Kaffee?~Con mucho gusto. ¿Quiere leche con el café?
Nein, danke.~No, gracias.
?¿Qué acompaña al té?~Un trozo de tarta~Una sopa~Un vaso de leche~La segunda persona pide Tee und ein Stück Kuchen.
?¿Se pide leche para el café?~No~Sí~No se pregunta~La respuesta a Möchten Sie Milch? es Nein, danke.
---
u06~Die kleine Pause~Sara descansa del trabajo.~Historia
Sara hat Hunger. Sie geht in ein Café.~Sara tiene hambre. Va a una cafetería.
Sie bestellt eine Suppe und Wasser.~Pide una sopa y agua.
Die Suppe ist warm. Das Wasser ist kalt.~La sopa está caliente. El agua está fría.
Sara bezahlt acht Euro.~Sara paga ocho euros.
?¿Por qué va Sara a la cafetería?~Tiene hambre~Quiere trabajar~Busca a Ben~Sara hat Hunger explica el motivo.
?¿Qué está frío?~El agua~La sopa~El café~Das Wasser ist kalt.
---
u06~Zusammen oder getrennt?~Llega la cuenta.~Diálogo
Die Rechnung bitte!~¡La cuenta, por favor!
Zusammen oder getrennt?~¿Juntos o por separado?
Getrennt, bitte. Ich habe einen Tee.~Por separado, por favor. Yo he tomado un té.
Drei Euro, bitte.~Tres euros, por favor.
Hier sind vier Euro. Stimmt so.~Aquí tiene cuatro euros. Quédese con el cambio.
?¿Cómo pagan?~Por separado~Todo junto~Con un vale~La respuesta es Getrennt, bitte.
?¿Cuánto deja de propina esta persona?~Un euro~Tres euros~Cuatro euros~El té cuesta tres y entrega cuatro diciendo Stimmt so.
---
u07~Am Gemüsestand~Una compra en el mercado.~Diálogo
Ich hätte gern ein Kilo Tomaten.~Querría un kilo de tomates.
Gern. Sonst noch etwas?~Claro. ¿Algo más?
Ja, zwei Äpfel. Was kostet das zusammen?~Sí, dos manzanas. ¿Cuánto cuesta todo?
Vier Euro fünfzig.~Cuatro euros con cincuenta.
?¿Qué compra por kilos?~Tomates~Manzanas~Patatas~Pide ein Kilo Tomaten y luego dos manzanas.
?¿Cuánto cuesta todo?~4,50 euros~4 euros~5,40 euros~Vier Euro fünfzig es 4,50.
---
u07~Die Einkaufsliste~Ben prepara la compra.~Historia
Ben braucht Brot, Milch und Eier.~Ben necesita pan, leche y huevos.
Im Laden gibt es heute keine Eier.~En la tienda hoy no hay huevos.
Ben kauft Brot und Milch. Er kauft auch Käse.~Ben compra pan y leche. También compra queso.
Er bezahlt mit Karte.~Paga con tarjeta.
?¿Qué no puede comprar Ben?~Huevos~Pan~Leche~Im Laden gibt es heute keine Eier.
?¿Qué añade a la lista inicial?~Queso~Café~Manzanas~Er kauft auch Käse.
---
u07~Zu teuer~Anna compara precios.~Diálogo
Die Äpfel kosten vier Euro pro Kilo.~Las manzanas cuestan cuatro euros el kilo.
Das ist teuer. Was kosten die Bananen?~Eso es caro. ¿Cuánto cuestan los plátanos?
Zwei Euro pro Kilo.~Dos euros el kilo.
Dann nehme ich die Bananen.~Entonces me llevo los plátanos.
?¿Qué fruta elige Anna?~Plátanos~Manzanas~Las dos~La última frase es Dann nehme ich die Bananen.
?¿Por qué cambia de fruta?~Las manzanas le parecen caras~No hay manzanas~No le gustan los plátanos~Dice Das ist teuer después del precio de las manzanas.
---
u08~Ein neues Zimmer~Ben enseña su habitación.~Historia
Mein Zimmer ist klein, aber hell.~Mi habitación es pequeña, pero luminosa.
Es gibt ein Bett, einen Tisch und zwei Stühle.~Hay una cama, una mesa y dos sillas.
Die Küche ist neben dem Zimmer.~La cocina está al lado de la habitación.
Einen Balkon gibt es leider nicht.~Por desgracia no hay balcón.
?¿Cómo es la habitación?~Pequeña y luminosa~Grande y oscura~Grande y luminosa~klein, aber hell.
?¿Qué falta?~Un balcón~Una mesa~Una cama~Einen Balkon gibt es leider nicht.
---
u08~Wo ist der Schlüssel?~Anna busca algo antes de salir.~Diálogo
Wo ist mein Schlüssel?~¿Dónde está mi llave?
Ist er auf dem Tisch?~¿Está en la mesa?
Nein. Hier ist nur ein Buch.~No. Aquí solo hay un libro.
Schau in deine Tasche!~¡Mira en tu bolso!
Ah, da ist er. Danke!~Ah, ahí está. ¡Gracias!
?¿Dónde encuentra Anna la llave?~En el bolso~En la mesa~En la cocina~Mira en la Tasche y responde da ist er.
?¿Qué hay en la mesa?~Un libro~Una llave~Un teléfono~Hier ist nur ein Buch.
---
u08~Wohnung gesucht~Un anuncio de vivienda.~Mensaje
Zwei Zimmer, Küche und Bad in Berlin.~Dos habitaciones, cocina y baño en Berlín.
Die Wohnung ist hell und ruhig.~El piso es luminoso y tranquilo.
Die Miete kostet sechshundert Euro im Monat.~El alquiler cuesta seiscientos euros al mes.
Kein Balkon. Haustiere sind erlaubt.~Sin balcón. Se permiten animales domésticos.
?¿Cuál es el alquiler mensual?~600 euros~200 euros~60 euros~sechshundert Euro im Monat.
?¿Puede vivir allí alguien con un perro?~Sí~No~El anuncio no lo dice~Haustiere sind erlaubt permite animales domésticos.
---
u09~Zum Bahnhof~Ben pregunta por la estación.~Diálogo
Entschuldigung, wie komme ich zum Bahnhof?~Disculpe, ¿cómo llego a la estación?
Gehen Sie geradeaus und dann rechts.~Siga recto y después a la derecha.
Ist das weit?~¿Está lejos?
Nein, nur fünf Minuten zu Fuß.~No, solo cinco minutos a pie.
?¿Hacia dónde gira después de seguir recto?~A la derecha~A la izquierda~No gira~La indicación es dann rechts.
?¿Cuánto se tarda a pie?~Cinco minutos~Quince minutos~Media hora~nur fünf Minuten zu Fuß.
---
u09~Der falsche Bus~Anna comprueba un trayecto.~Diálogo
Fährt dieser Bus zum Museum?~¿Este autobús va al museo?
Nein, dieser Bus fährt zum Flughafen.~No, este autobús va al aeropuerto.
Nehmen Sie den Bus Nummer zehn.~Tome el autobús número diez.
Danke. Wo ist die Haltestelle?~Gracias. ¿Dónde está la parada?
Dort, neben der Apotheke.~Allí, al lado de la farmacia.
?¿Adónde va este autobús?~Al aeropuerto~Al museo~Al mercado~El conductor dice zum Flughafen.
?¿Qué necesita tomar Anna?~El autobús 10~El tren~El autobús 2~La indicación es Bus Nummer zehn.
---
u09~Ein Treffpunkt~Sara explica dónde está.~Mensaje
Ich bin im Park, neben dem Café.~Estoy en el parque, al lado de la cafetería.
Komm bitte nicht mit dem Auto. Hier gibt es keinen Parkplatz.~No vengas en coche, por favor. Aquí no hay aparcamiento.
Mit der Straßenbahn ist es einfach.~En tranvía es fácil.
Die Haltestelle ist direkt vor dem Park.~La parada está justo delante del parque.
?¿Dónde espera Sara?~En el parque~En la estación~En casa~Ich bin im Park.
?¿Por qué aconseja evitar el coche?~No hay aparcamiento~La carretera está cerrada~Es muy caro~Hier gibt es keinen Parkplatz.
---
u10~Im Büro~Anna tiene trabajo pendiente.~Diálogo
Kannst du heute mit ins Café kommen?~¿Puedes venir hoy a la cafetería?
Leider nicht. Ich muss bis sechs Uhr arbeiten.~Por desgracia no. Tengo que trabajar hasta las seis.
Brauchst du Hilfe?~¿Necesitas ayuda?
Ja, bitte. Kannst du diese E-Mail lesen?~Sí, por favor. ¿Puedes leer este correo?
?¿Por qué Anna no puede ir?~Tiene que trabajar~Está de viaje~No le gusta el café~Ich muss bis sechs Uhr arbeiten.
?¿Qué ayuda pide?~Leer un correo~Comprar café~Llamar al médico~Kannst du diese E-Mail lesen?
---
u10~Ein neuer Beruf~Ben habla de su profesión.~Historia
Ben ist Lehrer. Er arbeitet in einer Schule.~Ben es profesor. Trabaja en una escuela.
Er kann Deutsch und Englisch sprechen.~Puede hablar alemán e inglés.
Heute muss er einen Kurs vorbereiten.~Hoy tiene que preparar un curso.
Morgen hat er frei.~Mañana tiene el día libre.
?¿Dónde trabaja Ben?~En una escuela~En una oficina~En una farmacia~Er arbeitet in einer Schule.
?¿Qué ocurre mañana?~Tiene libre~Empieza otro trabajo~Viaja~Morgen hat er frei.
---
u10~Im Kursraum~Normas sencillas de clase.~Mensaje
Der Kurs beginnt um neun Uhr.~El curso empieza a las nueve.
Sie dürfen hier Wasser trinken.~Puede beber agua aquí.
Bitte schalten Sie Ihr Handy aus.~Por favor, apague el móvil.
Sie müssen heute kein Buch mitbringen.~Hoy no tiene que traer un libro.
?¿Está permitido beber agua?~Sí~No~Solo fuera~Sie dürfen hier Wasser trinken.
?¿Es obligatorio traer un libro hoy?~No~Sí~Solo dos libros~müssen … kein Buch mitbringen indica que no hace falta.
---
u11~Kino oder Park?~Dos amigos hacen planes.~Diálogo
Möchtest du heute ins Kino gehen?~¿Te apetece ir hoy al cine?
Lieber nicht. Das Wetter ist schön.~Prefiero que no. Hace buen tiempo.
Dann gehen wir in den Park!~¡Entonces vamos al parque!
Gute Idee. Ich bringe Wasser mit.~Buena idea. Traigo agua.
?¿Qué plan eligen?~Ir al parque~Ir al cine~Quedarse en casa~Aceptan Dann gehen wir in den Park.
?¿Por qué descartan el cine?~Hace buen tiempo~Está cerrado~No hay entradas~Das Wetter ist schön explica la preferencia.
---
u11~Ein freier Abend~Preferencias de Sara.~Historia
Sara liest gern, aber heute möchte sie einen Film sehen.~A Sara le gusta leer, pero hoy quiere ver una película.
Mia schläft schon. Sara bleibt zu Hause.~Mia ya duerme. Sara se queda en casa.
Sie sieht einen Film und trinkt Tee.~Ve una película y toma té.
Danach geht sie ins Bett.~Después se va a la cama.
?¿Qué hace Sara hoy por la noche?~Ve una película~Va al cine~Lee en el parque~Sie sieht einen Film en casa.
?¿Qué hace Mia?~Duerme~Ve la película~Toma té~Mia schläft schon.
---
u11~Fußball am Samstag~Una invitación con una alternativa.~Mensaje
Hallo Ben, wir spielen am Samstag Fußball.~Hola Ben, el sábado jugamos al fútbol.
Möchtest du mitspielen? Wir treffen uns um drei Uhr.~¿Quieres jugar? Quedamos a las tres.
Du kannst auch nur zuschauen.~También puedes venir solo a mirar.
Danach essen wir zusammen.~Después comemos juntos.
?¿A qué hora quedan?~A las tres~A las dos~A las seis~um drei Uhr.
?¿Qué opción tiene Ben si no quiere jugar?~Mirar el partido~Tiene que irse~Cocinar para todos~Du kannst auch nur zuschauen.
---
u12~Zu früh~Una confusión con la hora.~Diálogo
Der Kurs fängt um halb acht an.~El curso empieza a las siete y media.
Also um acht Uhr dreißig?~¿Entonces a las ocho y media?
Nein, um sieben Uhr dreißig.~No, a las siete y media.
Gut, dann stehe ich um sechs Uhr auf.~Bien, entonces me levanto a las seis.
?¿A qué hora empieza el curso?~7:30~8:30~6:00~halb acht es 7:30, como aclara la tercera frase.
?¿A qué hora se levantará la persona?~6:00~7:00~7:30~um sechs Uhr auf.
---
u12~Der volle Samstag~Ben organiza su día.~Historia
Am Samstag steht Ben um acht Uhr auf.~El sábado Ben se levanta a las ocho.
Dann kauft er ein. Er braucht Brot und Obst.~Después hace la compra. Necesita pan y fruta.
Um zwölf Uhr ruft er seine Mutter an.~A las doce llama a su madre.
Am Nachmittag holt er Anna ab.~Por la tarde recoge a Anna.
?¿Qué hace después de levantarse?~La compra~Llama a su madre~Recoge a Anna~Dann kauft er ein.
?¿A quién llama al mediodía?~A su madre~A Anna~A Sara~ruft er seine Mutter an.
---
u12~Ein Termin~Sara propone una hora.~Mensaje
Kannst du morgen um Viertel nach zehn kommen?~¿Puedes venir mañana a las diez y cuarto?
Vorher muss ich Mia zur Schule bringen.~Antes tengo que llevar a Mia al colegio.
Bitte bring dein Buch mit.~Por favor, trae tu libro.
Ich rufe dich heute Abend noch einmal an.~Te vuelvo a llamar esta noche.
?¿Qué hora propone Sara?~10:15~9:45~10:45~Viertel nach zehn significa 10:15.
?¿Qué debe llevar la otra persona?~Su libro~Comida~Un billete~Bitte bring dein Buch mit.
---
u13~Am Schalter~Anna compra un billete.~Diálogo
Ich möchte nach Hamburg fahren.~Querría viajar a Hamburgo.
Einfach oder hin und zurück?~¿Solo ida o ida y vuelta?
Hin und zurück, bitte. Muss ich umsteigen?~Ida y vuelta, por favor. ¿Tengo que hacer transbordo?
Nein, der Zug fährt direkt. Abfahrt ist um neun Uhr.~No, el tren es directo. La salida es a las nueve.
?¿Qué billete compra Anna?~Ida y vuelta~Solo ida~Un abono mensual~Hin und zurück.
?¿Tiene que hacer transbordo?~No~Sí, una vez~Sí, dos veces~El tren fährt direkt.
---
u13~Im Hotel~Ben llega a recepción.~Diálogo
Guten Abend. Ich habe ein Zimmer reserviert.~Buenas noches. Tengo una habitación reservada.
Auf welchen Namen?~¿A qué nombre?
Weber. Für zwei Nächte.~Weber. Para dos noches.
Hier ist Ihr Schlüssel. Das Frühstück ist von sieben bis zehn Uhr.~Aquí tiene su llave. El desayuno es de siete a diez.
?¿Cuántas noches se queda Ben?~Dos~Una~Tres~Für zwei Nächte.
?¿Hasta qué hora hay desayuno?~Hasta las diez~Hasta las siete~Hasta las doce~von sieben bis zehn Uhr.
---
u13~Eine Durchsage~Un anuncio en la estación.~Mensaje
Achtung, der Zug nach Hamburg fährt heute von Gleis vier ab.~Atención, hoy el tren a Hamburgo sale de la vía cuatro.
Die Abfahrt ist um neun Uhr zehn.~La salida es a las nueve y diez.
Der Zug hält nicht in Bremen.~El tren no para en Bremen.
Bitte achten Sie auf Ihr Gepäck.~Por favor, vigile su equipaje.
?¿De qué vía sale el tren?~De la cuatro~De la nueve~De la diez~von Gleis vier.
?¿Para el tren en Bremen?~No~Sí~Solo por la noche~hält nicht in Bremen.
---
u14~Beim Arzt~Anna explica un problema.~Diálogo
Was fehlt Ihnen?~¿Qué le ocurre?
Ich habe Kopfschmerzen und bin müde.~Me duele la cabeza y estoy cansada.
Seit wann?~¿Desde cuándo?
Seit gestern Abend.~Desde ayer por la noche.
Trinken Sie viel Wasser und ruhen Sie sich aus.~Beba mucha agua y descanse.
?¿Desde cuándo se encuentra mal Anna?~Desde ayer por la noche~Desde esta mañana~Desde hace una semana~Seit gestern Abend.
?¿Qué le recomiendan?~Beber agua y descansar~Hacer deporte~Viajar~Trinken Sie viel Wasser und ruhen Sie sich aus.
---
u14~Ein Termin am Telefon~Ben llama a una consulta.~Diálogo
Guten Tag. Ich brauche einen Termin.~Buenos días. Necesito una cita.
Können Sie heute um vier Uhr kommen?~¿Puede venir hoy a las cuatro?
Ja, das geht. Muss ich etwas mitbringen?~Sí, me viene bien. ¿Tengo que traer algo?
Ihre Gesundheitskarte, bitte.~Su tarjeta sanitaria, por favor.
?¿Cuándo es la cita?~Hoy a las cuatro~Mañana a las cuatro~Hoy a las dos~heute um vier Uhr.
?¿Qué debe llevar?~La tarjeta sanitaria~Un libro~Un billete~Ihre Gesundheitskarte.
---
u14~Gute Besserung!~Sara cancela un encuentro.~Mensaje
Hallo Anna, Mia ist heute krank.~Hola Anna, Mia está enferma hoy.
Sie hat Fieber. Ich bleibe mit ihr zu Hause.~Tiene fiebre. Me quedo con ella en casa.
Wir können heute nicht in den Park kommen.~Hoy no podemos ir al parque.
Morgen rufe ich dich an.~Te llamo mañana.
?¿Quién está enferma?~Mia~Sara~Anna~Mia ist heute krank.
?¿Qué hará Sara mañana?~Llamar a Anna~Ir al cine~Viajar~Morgen rufe ich dich an.
---
u15~Die blaue Jacke~Anna se prueba ropa.~Diálogo
Die Jacke gefällt mir. Haben Sie sie in Blau?~Me gusta la chaqueta. ¿La tiene en azul?
Ja. Welche Größe brauchen Sie?~Sí. ¿Qué talla necesita?
Größe achtunddreißig. Kann ich sie anprobieren?~La treinta y ocho. ¿Puedo probármela?
Natürlich. Die Umkleide ist dort.~Claro. El probador está allí.
?¿Qué color busca Anna?~Azul~Rojo~Negro~in Blau.
?¿Qué talla necesita?~38~36~48~achtunddreißig.
---
u15~Zu groß, zu klein~Ben compra un abrigo.~Historia
Ben braucht einen Mantel. Der schwarze Mantel ist zu groß.~Ben necesita un abrigo. El negro es demasiado grande.
Der blaue Mantel passt gut, aber er ist teuer.~El azul le queda bien, pero es caro.
Dann sieht Ben einen grauen Mantel. Er kostet nur vierzig Euro.~Después ve uno gris. Solo cuesta cuarenta euros.
Ben probiert ihn an. Er passt. Ben nimmt ihn.~Se lo prueba. Le queda bien. Ben se lo lleva.
?¿Qué problema tiene el abrigo negro?~Es demasiado grande~Es caro~Es pequeño~ist zu groß.
?¿Cuál compra Ben?~El gris~El negro~El azul~El último abrigo descrito es gris y Ben nimmt ihn.
---
u15~Im Geschäft~Una devolución sencilla.~Diálogo
Guten Tag, diese Schuhe sind zu klein.~Buenos días, estos zapatos son demasiado pequeños.
Haben Sie den Kassenbon?~¿Tiene el tique?
Ja, hier. Kann ich eine Nummer größer bekommen?~Sí, aquí. ¿Puedo cambiarlos por una talla más?
Natürlich. Hier ist Größe vierzig.~Claro. Aquí tiene la cuarenta.
?¿Por qué quiere cambiar los zapatos?~Son pequeños~Están rotos~Son grandes~diese Schuhe sind zu klein.
?¿Qué documento presenta?~El tique~El pasaporte~Una reserva~Responde Ja, hier a la pregunta por el Kassenbon.
---
u16~Regen im Park~Un plan cambia por el tiempo.~Historia
Anna und Ben möchten im Park spazieren gehen.~Anna y Ben quieren pasear por el parque.
Aber es regnet. Es ist auch kalt.~Pero llueve. También hace frío.
Sie gehen lieber ins Café.~Prefieren ir a la cafetería.
Dort trinken sie heißen Tee.~Allí toman té caliente.
?¿Qué cambia el plan?~La lluvia y el frío~El precio~El horario~Aber es regnet. Es ist auch kalt.
?¿Adónde van finalmente?~A la cafetería~Al parque~A la estación~Sie gehen lieber ins Café.
---
u16~Im Sommer~Las vacaciones de Sara.~Mensaje
Im Sommer fahren wir ans Meer.~En verano vamos al mar.
Mia schwimmt gern. Ich lese am Strand.~A Mia le gusta nadar. Yo leo en la playa.
Meistens scheint die Sonne.~Casi siempre brilla el sol.
Abends ist es manchmal kühl. Dann brauchen wir eine Jacke.~Por la noche a veces refresca. Entonces necesitamos una chaqueta.
?¿Qué hace Mia?~Nada~Lee~Trabaja~Mia schwimmt gern.
?¿Cuándo necesitan una chaqueta?~Por la noche si refresca~Siempre al mediodía~Solo cuando nieva~Abends ist es manchmal kühl.
---
u16~Das Wetter morgen~Una previsión sencilla.~Mensaje
Morgen ist es am Vormittag sonnig.~Mañana por la mañana hará sol.
Am Nachmittag gibt es Regen.~Por la tarde habrá lluvia.
Es sind zwölf Grad.~Habrá doce grados.
Nehmen Sie einen Regenschirm mit.~Llévese un paraguas.
?¿Cuándo se espera lluvia?~Por la tarde~Por la mañana~De madrugada~Am Nachmittag gibt es Regen.
?¿Qué recomienda llevar?~Un paraguas~Un bañador~Una maleta~Nehmen Sie einen Regenschirm mit.
---
u17~Ein Abend in der Küche~Anna cuenta lo que hizo.~Historia
Gestern habe ich für Ben und Sara gekocht.~Ayer cociné para Ben y Sara.
Ich habe Gemüse und Reis gekauft.~Compré verdura y arroz.
Ben hat einen Kuchen mitgebracht.~Ben trajo una tarta.
Wir haben zusammen gegessen und viel gesprochen.~Comimos juntos y hablamos mucho.
?¿Quién cocinó?~Anna~Ben~Sara~La narradora Anna dice Ich habe … gekocht.
?¿Qué aportó Ben?~Una tarta~Arroz~Verdura~Ben hat einen Kuchen mitgebracht.
---
u17~Schon fertig?~Leo habla de una tarea.~Diálogo
Hast du die E-Mail schon geschrieben?~¿Has escrito ya el correo?
Ja, und ich habe auch die Übung gemacht.~Sí, y también he hecho el ejercicio.
Hast du das Buch gelesen?~¿Has leído el libro?
Nein, noch nicht. Das mache ich morgen.~No, todavía no. Eso lo hago mañana.
?¿Qué queda pendiente?~Leer el libro~Escribir el correo~Hacer el ejercicio~Responde Nein, noch nicht a la pregunta sobre el libro.
?¿Cuándo lo hará?~Mañana~Ayer~Esta noche~Das mache ich morgen.
---
u17~Ein guter Sonntag~Un pequeño balance del día.~Mensaje
Heute habe ich lange geschlafen.~Hoy he dormido mucho rato.
Dann habe ich meine Schwester angerufen.~Después he llamado a mi hermana.
Am Nachmittag habe ich Musik gehört und Deutsch gelernt.~Por la tarde he escuchado música y he estudiado alemán.
Ich habe nicht gearbeitet. Das war schön.~No he trabajado. Ha estado bien.
?¿Con quién ha hablado por teléfono?~Con su hermana~Con su madre~Con su jefe~meine Schwester angerufen.
?¿Ha trabajado hoy?~No~Sí~Solo por la mañana~Ich habe nicht gearbeitet.
---
u18~Ein Tag in Hamburg~Ben recuerda una excursión.~Historia
Am Samstag bin ich nach Hamburg gefahren.~El sábado fui a Hamburgo.
Anna ist auch mitgekommen.~Anna también vino.
Wir sind durch die Stadt gegangen und haben Fisch gegessen.~Paseamos por la ciudad y comimos pescado.
Am Abend sind wir nach Berlin zurückgefahren.~Por la noche volvimos a Berlín.
?¿Quién acompañó a Ben?~Anna~Sara~Mia~Anna ist auch mitgekommen.
?¿Dónde acabaron el día?~En Berlín~En Hamburgo~En Madrid~Am Abend … nach Berlin zurückgefahren.
---
u18~Zu spät~Un retraso en clase.~Diálogo
Warum bist du gestern nicht gekommen?~¿Por qué no viniste ayer?
Ich war krank und bin zu Hause geblieben.~Estaba enfermo y me quedé en casa.
Hattest du Fieber?~¿Tenías fiebre?
Nein, aber ich war sehr müde.~No, pero estaba muy cansado.
?¿Por qué faltó?~Estaba enfermo~Perdió el tren~Trabajó~Ich war krank.
?¿Tenía fiebre?~No~Sí~No lo sabe~Responde Nein a Hattest du Fieber?
---
u18~Ein langer Tag~Sara cuenta un viaje.~Mensaje
Wir sind um sechs Uhr aufgestanden.~Nos levantamos a las seis.
Der Zug ist pünktlich abgefahren.~El tren salió puntual.
In München haben wir meine Eltern besucht.~En Múnich visitamos a mis padres.
Am Abend waren wir müde, aber glücklich.~Por la noche estábamos cansadas, pero contentas.
?¿El tren salió con retraso?~No~Sí~No salió~pünktlich significa puntual.
?¿A quién visitaron?~A los padres de Sara~A Ben~A una profesora~meine Eltern besucht.
---
u19~Einladung zum Essen~Anna envía una invitación.~Mensaje
Hallo Sara, am Freitag koche ich für uns.~Hola Sara, el viernes cocino para nosotras.
Hast du um sieben Uhr Zeit?~¿Tienes tiempo a las siete?
Du kannst Mia mitbringen.~Puedes traer a Mia.
Bitte sag mir bis morgen Bescheid.~Por favor, avísame antes de mañana.
?¿Cuándo propone cenar Anna?~El viernes a las siete~Mañana a las seis~El sábado a las siete~am Freitag y um sieben Uhr.
?¿Puede ir Mia?~Sí~No~Solo después de cenar~Du kannst Mia mitbringen.
---
u19~Eine kleine Änderung~Ben cambia la hora de un encuentro.~Diálogo
Wir treffen uns um sechs, oder?~Quedamos a las seis, ¿verdad?
Kannst du etwas später kommen? Ich muss länger arbeiten.~¿Puedes venir un poco más tarde? Tengo que trabajar más tiempo.
Natürlich. Um halb sieben?~Claro. ¿A las seis y media?
Ja, das passt. Danke!~Sí, me viene bien. ¡Gracias!
?¿Qué hora acuerdan finalmente?~18:30~18:00~19:30~halb sieben equivale a las seis y media.
?¿Por qué cambian la hora?~Una persona tiene que trabajar más~El café cierra~Llueve~Ich muss länger arbeiten.
---
u19~Leider nicht~Una respuesta a una invitación.~Mensaje
Vielen Dank für die Einladung!~¡Muchas gracias por la invitación!
Leider kann ich nicht kommen, denn Mia ist krank.~Por desgracia no puedo ir porque Mia está enferma.
Ich bleibe bei ihr zu Hause.~Me quedo con ella en casa.
Vielleicht können wir uns nächste Woche treffen.~Quizá podamos quedar la semana que viene.
?¿Se acepta la invitación?~No~Sí~Solo para Mia~Leider kann ich nicht kommen.
?¿Qué alternativa propone?~Quedar la próxima semana~Quedar esta noche~Llamar a un taxi~nächste Woche treffen.
---
u20~Ein verlorener Schlüssel~Anna necesita ayuda.~Diálogo
Entschuldigung, ich habe meinen Schlüssel verloren.~Disculpe, he perdido mi llave.
Wo waren Sie heute?~¿Dónde ha estado hoy?
Im Café neben dem Bahnhof.~En la cafetería junto a la estación.
Fragen Sie dort. Vielleicht ist der Schlüssel noch da.~Pregunte allí. Quizá la llave siga allí.
?¿Qué ha perdido Anna?~La llave~El billete~El bolso~meinen Schlüssel verloren.
?¿Qué le aconsejan?~Preguntar en la cafetería~Comprar otra maleta~Ir al médico~Fragen Sie dort se refiere a la cafetería.
---
u20~Eine Nachricht verstehen~Un aviso práctico.~Mensaje
Unser Büro ist am Montag geschlossen.~Nuestra oficina está cerrada el lunes.
Ab Dienstag sind wir wieder für Sie da.~A partir del martes volvemos a atenderle.
Sie können uns eine E-Mail schreiben.~Puede escribirnos un correo.
In dringenden Fällen rufen Sie bitte die Nummer auf unserer Website an.~En casos urgentes llame al número de nuestra web, por favor.
?¿Cuándo vuelve a abrir la oficina?~El martes~El lunes~El domingo~Ab Dienstag sind wir wieder für Sie da.
?¿Qué opción ofrece para casos urgentes?~Llamar al teléfono de la web~Esperar al mes siguiente~Ir a la estación~In dringenden Fällen … die Nummer auf unserer Website.
---
u20~Ein neuer Anfang~Anna mira lo que ha aprendido.~Historia
Vor drei Monaten habe ich nur wenige Wörter verstanden.~Hace tres meses solo entendía unas pocas palabras.
Jetzt kann ich im Café bestellen und nach dem Weg fragen.~Ahora puedo pedir en la cafetería y preguntar por el camino.
Gestern habe ich mit meiner Nachbarin Deutsch gesprochen.~Ayer hablé alemán con mi vecina.
Ich verstehe noch nicht alles. Aber ich lerne jeden Tag weiter.~Todavía no lo entiendo todo. Pero sigo aprendiendo cada día.
?¿Qué puede hacer Anna ahora?~Pedir y preguntar por el camino~Entender cualquier película~Traducir novelas~Enumera im Café bestellen y nach dem Weg fragen.
?¿Cómo ve su aprendizaje?~Como un proceso que continúa~Como algo terminado~Como una competición~No entiende todo y dice ich lerne … weiter.`;
export const readings: Reading[] = raw.split("\n---\n").map((chunk, index) => {
  const [head, ...rows] = chunk.split("\n");
  const [unit, title, context, kind] = head.split("~");
  const lines = rows
    .filter((r) => !r.startsWith("?"))
    .map((r) => {
      const [de, es] = r.split("~");
      return { de, es };
    });
  const questions = rows
    .filter((r) => r.startsWith("?"))
    .map((r, j) => {
      const [prompt, correct, a, b, explanation] = r.slice(1).split("~");
      const choices = [correct, a, b];
      const answer = (index + j) % 3;
      for (let k = 0; k < answer; k++) choices.unshift(choices.pop()!);
      return { prompt, choices, answer, explanation };
    });
  return {
    id: `${unit}-r${(index % 3) + 1}`,
    unit,
    title,
    context,
    kind: kind as Reading["kind"],
    lines,
    questions,
    level: Number(unit.slice(1)) <= 3 ? "A0" : "A1",
    targetVocabulary: [],
    knownVocabulary: [],
    grammar: [`${unit}-grammar`],
    minutes: Math.max(2, Math.ceil(lines.length * 0.6)),
  };
});
